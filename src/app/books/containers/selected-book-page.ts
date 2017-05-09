import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as collection from '../../actions/collection';
import { Book } from '../models/book';


@Component({
  selector: 'rd-selected-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rd-book-detail
      [book]="book$ | async"
      [inCollection]="isSelectedBookInCollection$ | async"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)">
    </rd-book-detail>
  `
})
export class SelectedBookPageComponent {
  book$: Observable<Book>;
  isSelectedBookInCollection$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.book$ = store.select(fromRoot.getSelectedBook);
    this.isSelectedBookInCollection$ = store.select(fromRoot.isSelectedBookInCollection);
  }

  addToCollection(book: Book) {
    this.store.dispatch(new collection.AddBookAction(book));
  }

  removeFromCollection(book: Book) {
    this.store.dispatch(new collection.RemoveBookAction(book));
  }
}
