import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { RdMenuItem } from '../../../common/models/rd-menu-item';
import {group} from '@angular/animations';
import { RdSortableOptions } from '../../../common/rd-sortable/rd-sortable-options';

@Component({
  selector: 'rd-composed',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './composed.component.html'
})
export class ComposedComponent {
  @Input() items: RdMenuItem[];

  options: RdSortableOptions = {
    group: 'composer',
    onAdd: (event: any) => {
            let origEl = event.item;
            // event.from[event.oldIndex] = event.item;
            console.log('To list:', JSON.stringify(origEl));
            // console.log('From:', JSON.stringify(event.from));
            // this.zone.run(() => this.tooltipDisabled = false);
        },
  };
}
