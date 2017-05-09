import { Routes } from '@angular/router';

import { BookExistsGuard } from './guards/book-exists';
import { FindBookPageComponent } from './books/containers/find-book-page';
import { ViewBookPageComponent } from './books/containers/view-book-page';
import { CollectionPageComponent } from './books/containers/collection-page';
import { NotFoundPageComponent } from './common/containers/not-found-page';
import { DashboardComponent } from './features/dashboard.component';
import { NotFound404Component } from './not-found404.component';

export const routes: Routes = [
  {
    path: '',
    component: CollectionPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'book/find',
    component: FindBookPageComponent,
  },
  {
    path: 'book/:id',
    canActivate: [BookExistsGuard],
    component: ViewBookPageComponent
  },
  {
    path: 'lazy',
    loadChildren: './features/lazy/index#LazyModule'
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
