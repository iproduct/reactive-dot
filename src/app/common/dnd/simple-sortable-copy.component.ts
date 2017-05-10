import { Component } from '@angular/core';

@Component({
    selector: 'simple-sortable-copy',
    template: `
<h4>Simple sortable With Drop into something, without delete it</h4>
<div class="ui-g">
    <div class="ui-grid-col-3 ui-widget-content">
        <p-panel header="Source List" >
            <ul class="list-group">
                <li *ngFor="let source of sourceList" class="list-group-item"
                    dnd-draggable [dragEnabled]="true" 
                    [dragData]="source">{{source.name}}</li>
            </ul>
        </p-panel>
    </div>
    <div class="ui-grid-col-6 ui-widget-content">
        <p-panel header="Target List" dnd-droppable (onDropSuccess)="addTo($event)">
            <ul class="list-group" dnd-sortable-container [sortableData]="targetList">
                <li *ngFor="let target of targetList; let x = index" dnd-sortable [sortableIndex]="x" [dragEnabled]="true" 
                    class="list-group-item" [dragData]="target">
                    {{target.name}}
                </li>
            </ul>
        </p-panel>
</div>`
})
export class SimpleSortableCopyComponent {

    sourceList: Widget[] = [
        new Widget('1'), new Widget('2'),
        new Widget('3'), new Widget('4'),
        new Widget('5'), new Widget('6')
    ];

    targetList: Widget[] = [];
    addTo($event: any) {
        this.targetList.push($event.dragData);
    }
}

class Widget {
    constructor(public name: string) { }
}
