import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PipesModule } from '../pipes/pipes.module';
import { CommonModule } from '../common/common.module';
import { BooksModule } from '../books/books.module';
import { ComposerPageComponent } from './containers/composer-page/composer-page';
import { ComposedComponent } from './components/composed/composed.component';
import { RdPanelMenuModule } from './components/panel-menu/panel-menu.component';
import { RdSortableModule } from '../common/rd-sortable/rd-sortable.module';


export const COMPONENTS = [
  ComposerPageComponent,
  ComposedComponent
];

@NgModule({
  imports: [
    NgCommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule,
    CommonModule,
    RdPanelMenuModule,
    RdSortableModule.forRoot({ animation: 150 })
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComposerModule { }
