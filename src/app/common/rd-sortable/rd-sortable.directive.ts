import { Directive, ElementRef, Input, OnInit, OnChanges, OnDestroy, NgZone, SimpleChanges, SimpleChange } from '@angular/core';
import { RdSortableOptions } from './rd-sortable-options';
import { GLOBALS } from './globals';
import { RdSortableService } from './rd-sortable.service';

import * as Sortable from 'sortablejs/Sortable.min';

@Directive({
  selector: '[rdSortable]'
})
export class RdSortableDirective implements OnInit, OnChanges, OnDestroy {

  @Input('rdSortable')
  items: any[] | any; // array or a FormArray

  @Input('rdSortableOptions')
  inputOptions: RdSortableOptions;

  private _sortable: any;

  @Input() runInsideAngular = false;

  constructor(private sortablejsService: RdSortableService,
              private element: ElementRef,
              private zone: NgZone) {}

  public ngOnInit() {
    if (this.runInsideAngular) {
      this._sortable = Sortable.create(this.element.nativeElement, this.options);
    } else {
      this.zone.runOutsideAngular(() => {
        this._sortable = Sortable.create(this.element.nativeElement, this.options);
      });
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    const optionsChange: SimpleChange = changes['inputOptions'];
    if (optionsChange && !optionsChange.isFirstChange()) {
      const previousOptions: RdSortableOptions = optionsChange.previousValue;
      const currentOptions: RdSortableOptions = optionsChange.currentValue;
      Object.keys(currentOptions).forEach(optionName => {
        if (currentOptions[optionName] !== previousOptions[optionName]) {
          // use low-level option setter
          this._sortable.option(optionName, currentOptions[optionName]);
        }
      });
    }
  }

  public ngOnDestroy() {
    this._sortable.destroy();
  }

  private get options() {
    return Object.assign({}, GLOBALS.options, this.inputOptions, this.overridenOptions);
  }

  private proxyEvent(eventName: string, event: SortableEvent) {
    if (this.inputOptions && this.inputOptions[eventName]) {
      this.inputOptions[eventName](event);
    }
  }

  // returns whether the items are currently set
  private get bindingEnabled() {
    return !!this.items;
  }

  // we need this to identify that the input is a FormArray
  // we don't want to have a dependency on @angular/forms just for that
  private get isItemsFormArray() {
    // just checking for random FormArray methods not available on a standard array
    return !!this.items.at && !!this.items.insert && !!this.items.reset;
  }

  private get overridenOptions(): RdSortableOptions {
    // always intercept standard events but act only in case items are set (bindingEnabled)
    // allows to forget about tracking this.items changes
    return {
      onAdd: (event: SortableEvent) => {
        if (this.bindingEnabled) {
          this.sortablejsService.onremove = (item: any) => {
            if (this.isItemsFormArray) {
                this.items.insert(event.newIndex, item);
            } else {
                this.items.splice(event.newIndex, 0, item);
            }
          };
        }

        this.proxyEvent('onAdd', event);
      },
      onRemove: (event: SortableEvent) => {
        if (this.bindingEnabled) {
          let item: any;

          if (this.isItemsFormArray) {
              item = this.items.at(event.oldIndex);
              this.items.removeAt(event.oldIndex);
          } else {
              // item = this.items.splice(event.oldIndex, 1)[0];
              item = this.items[event.oldIndex];
          }

          this.sortablejsService.onremove(item);
          this.sortablejsService.onremove = null;
        }

        this.proxyEvent('onRemove', event);
      },
      onUpdate: (event: SortableEvent) => {
        if (this.bindingEnabled) {
          if (this.isItemsFormArray) {
            let relocated = this.items.at(event.oldIndex);

            this.items.removeAt(event.oldIndex);
            this.items.insert(event.newIndex, relocated);
          } else {
            this.items.splice(event.newIndex, 0, this.items.splice(event.oldIndex, 1)[0]);
          }
        }

        this.proxyEvent('onUpdate', event);
      }
    };
  }

}

interface SortableEvent { oldIndex: number; newIndex: number; }
