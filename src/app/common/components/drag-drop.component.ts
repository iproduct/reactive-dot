import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Book } from '../../books/models/book';
import { SortablejsModule, SortablejsDirective } from 'angular-sortablejs';


@Component({
    selector: 'rd-drag-drop',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './drag-drop.component.html'
})
export class DragDropComponent {
    @Input() availableItems: Book[];

    selectedItems: Book[] = [];

    draggedItem: Book;


    dragStart(event, item: Book) {
        this.draggedItem = item;
    }

    drop(event) {
        if (this.draggedItem) {
            const draggedItemIndex = this.findIndex(this.draggedItem);
            this.selectedItems = [...this.selectedItems, this.draggedItem];
            this.availableItems = this.availableItems.filter((val, i) => i !== draggedItemIndex);
            this.draggedItem = null;
        }
    }

    dragEnd(event) {
        this.draggedItem = null;
    }

    findIndex(item: Book) {
        let index = -1;
        for (let i = 0; i < this.availableItems.length; i++) {
            if (item.id === this.availableItems[i].id) {
                index = i;
                break;
            }
        }
        return index;
    }

}
