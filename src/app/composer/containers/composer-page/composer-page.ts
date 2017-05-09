import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../reducers';
import * as book from '../../../actions/book';
import { Book } from '../../../books/models/book';
import { RdMenuItem } from '../../../common/models/rd-menu-item';
import { RdSortableOptions } from '../../../common/rd-sortable/rd-sortable-options';

@Component({
  selector: 'rd-composer-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './composer-page.html'
})
export class ComposerPageComponent implements OnInit {
  items: RdMenuItem[];

  searchQuery$: Observable<string>;
  books$: Observable<Book[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.searchQuery$ = store.select(fromRoot.getSearchQuery).take(1);
    this.books$ = store.select(fromRoot.getSearchResults);
    this.loading$ = store.select(fromRoot.getSearchLoading);
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Publishers',
        icon: 'fa-sign-out',
        items:
        [{
          label: 'interval(period: number)',
          icon: 'fa-clock-o',
          hint: 'Creates an Observable that emits sequential numbers every specified interval of time'
        },
        {
          label: 'New',
          icon: 'fa-plus',
          items: [
            { label: 'Project' },
            { label: 'Other' },
          ]
        },
        { label: 'Open' },
        { label: 'Quit' }
        ]
      },
      {
        label: 'Subscribers',
        icon: 'fa-sign-in',
        items: [
          { label: 'Undo', icon: 'fa-mail-forward' },
          { label: 'Redo', icon: 'fa-mail-reply' }
        ]
      },
      {
        label: 'Processors',
        icon: 'fa-random',
        items: [
          { label: 'Undo', icon: 'fa-mail-forward' },
          { label: 'Redo', icon: 'fa-mail-reply' }
        ]
      },
      {
        label: 'Edit',
        icon: 'fa-edit',
        items: [
          { label: 'Undo', icon: 'fa-mail-forward' },
          { label: 'Redo', icon: 'fa-mail-reply' }
        ]
      },
      {
        label: 'Help',
        icon: 'fa-question',
        items: [
          {
            label: 'Contents'
          },
          {
            label: 'Search',
            icon: 'fa-search',
            items: [
              {
                label: 'Text',
                items: [
                  {
                    label: 'Workspace'
                  }
                ]
              },
              {
                label: 'File'
              }
            ]
          }
        ]
      },
      {
        label: 'Actions',
        icon: 'fa-gear',
        items: [
          {
            label: 'Edit',
            icon: 'fa-refresh',
            items: [
              { label: 'Save', icon: 'fa-save' },
              { label: 'Update', icon: 'fa-save' },
            ]
          },
          {
            label: 'Other',
            icon: 'fa-phone',
            items: [
              { label: 'Delete', icon: 'fa-minus' }
            ]
          }
        ]
      }
    ];
  }

  search(query: string) {
    this.store.dispatch(new book.SearchAction(query));
  }
}
