import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as book from '../../actions/book';
import { Book } from '../models/book';


@Component({
  selector: 'rd-find-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rd-book-search [query]="searchQuery$ | async" [searching]="loading$ | async" (search)="search($event)"></rd-book-search>
    <rd-book-preview-list [books]="books$ | async"></rd-book-preview-list>
    <rd-drag-drop [availableItems]="books$ | async"></rd-drag-drop>
  `
})
export class FindBookPageComponent {
  searchQuery$: Observable<string>;
  books$: Observable<Book[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.searchQuery$ = store.select(fromRoot.getSearchQuery).take(1);
    this.books$ = store.select(fromRoot.getSearchResults);
    this.loading$ = store.select(fromRoot.getSearchLoading);
  }

  search(query: string) {
    this.store.dispatch(new book.SearchAction(query));
  }
}
