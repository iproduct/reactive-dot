import { NgModule, Component, ModuleWithProviders } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { LayoutComponent } from './components/layout';
import { NavItemComponent } from './components/nav-item';
import { SidenavComponent } from './components/sidenav';
import { ToolbarComponent } from './components/toolbar';
import { DragDropComponent } from './components/drag-drop.component';
import { DataTableModule, SharedModule, PanelModule, DragDropModule, MenuModule } from 'primeng/primeng';
import { PipesModule } from '../pipes/pipes.module';
import { RdSortableModule } from './rd-sortable/rd-sortable.module';

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
    RdSortableModule.forRoot({ animation: 150 })
  ],
  declarations: COMPONENTS,
  exports: [ ...COMPONENTS, RdSortableModule ]
})
export class CommonModule { }
