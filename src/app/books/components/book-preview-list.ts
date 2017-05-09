import { Component, Input } from '@angular/core';
import { Book } from '../models/book';

@Component({
  selector: 'rd-book-preview-list',
  template: `
    <rd-book-preview *ngFor="let book of books" [book]="book"></rd-book-preview>
  `,
  styles: [`
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `]
})
export class BookPreviewListComponent {
  @Input() books: Book[];
}
