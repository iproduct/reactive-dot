import { Component, ChangeDetectionStrategy, Input, NgZone, ChangeDetectorRef } from '@angular/core';
import { RdMenuItem } from '../../../common/models/rd-menu-item';
import { group } from '@angular/animations';
import { RdSortableOptions } from '../../../common/rd-sortable/rd-sortable-options';
import { EffectsRunner } from '@ngrx/effects/testing';

@Component({
  selector: 'rd-composed',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './composed.component.html'
})
export class ComposedComponent {
  @Input() items: RdMenuItem[];

  currentItems: RdMenuItem[] = [{ label: 'test' }, { label: 'testAgain' }];

  options: RdSortableOptions = {
    group: 'composer',
    onAdd: (event: any) => {

      const text = event.item.querySelector('.ui-menuitem-text').textContent;
      const newIndex = event.to.querySelector('.ui-menuitem')
      console.log('Added:', text, event.oldIndex, event.newIndex, event.to, event);


      const parent = event.item.parentNode;
      const index = Array.prototype.indexOf.call(parent.children, event.item);
      console.log('index', index);

      let newItems = this.currentItems.slice();
      newItems.splice(index, 0, { label: text });

      const clone = event.clone;
      const item = event.item;
      if (clone && item) {
        // Swap clone with original item
        clone.parentNode.replaceChild(item, clone);
      }

      this.zone.run(() => {
        this.currentItems = newItems;
      });
      console.log(newItems);
      // this.chgRef.detectChanges();
      // event.from[event.oldIndex] = event.item;
      // this.zone.run( () => { this.chgRef.detectChanges(); } );
      // console.log('From:', JSON.stringify(event.from));
      // this.zone.run(() => this.tooltipDisabled = false);
    },

    onUpdate: (event: any) => {

      let origEl = event.item;
      // event.from[event.oldIndex] = event.item;
      console.log('Updated:', this.currentItems);
      // let newItems = this.currentItems.slice();
      // newItems.splice(event.newIndex, 0, { label: text });
      // event.item.parentNode.removeChild(event.item);
      // this.zone.run(() => {
      //   this.currentItems = newItems;
      // });
      // console.log(newItems);
      this.zone.run(() => { this.chgRef.detectChanges(); });
      // console.log('From:', JSON.stringify(event.from));
      // this.zone.run(() => this.tooltipDisabled = false);
    },
  };

  constructor(private zone: NgZone, private chgRef: ChangeDetectorRef) { }
}
