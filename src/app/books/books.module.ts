import { NgModule } from '@angular/core';
import { CommonModule  as NgCommonModule} from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BookAuthorsComponent } from './components/book-authors';
import { BookDetailComponent } from './components/book-detail';
import { BookPreviewComponent } from './components/book-preview';
import { BookPreviewListComponent } from './components/book-preview-list';
import { BookSearchComponent } from './components/book-search';

import { FindBookPageComponent } from './containers/find-book-page';
import { SelectedBookPageComponent } from './containers/selected-book-page';
import { ViewBookPageComponent } from './containers/view-book-page';
import { CollectionPageComponent } from './containers/collection-page';

import { PipesModule } from '../pipes/pipes.module';
import { CommonModule } from '../common/common.module';


export const COMPONENTS = [
  BookAuthorsComponent,
  BookDetailComponent,
  BookPreviewComponent,
  BookPreviewListComponent,
  BookSearchComponent,
  FindBookPageComponent,
  SelectedBookPageComponent,
  ViewBookPageComponent,
  CollectionPageComponent,

];


@NgModule({
  imports: [
    NgCommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule,
    CommonModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class BooksModule { }
