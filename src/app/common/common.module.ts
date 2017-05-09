import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { LayoutComponent } from './components/layout';
import { NavItemComponent } from './components/nav-item';
import { SidenavComponent } from './components/sidenav';
import { ToolbarComponent } from './components/toolbar';
import { DragDropComponent } from './components/drag-drop.component';
import { DataTableModule, SharedModule, PanelModule, DragDropModule } from 'primeng/primeng';
import { PipesModule } from '../pipes/pipes.module';
import { SortablejsModule } from 'angular-sortablejs';

export const COMPONENTS = [
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
  DragDropComponent
];


@NgModule({
  imports: [
    NgCommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    DragDropModule,
    SortablejsModule.forRoot({ animation: 150 })
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CommonModule { }
