import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import {
  DataTableComponent,
  DataTableHeaderComponent,
  DataTableBodyComponent,
  DataTableBodyActionComponent,
  DataTableBodyCellComponent,
  DataTableFooterComponent,
  DataTableBodyEmptyInfoComponent
} from './components';

import { DataTableRowDirective, DTRowSource } from './directives/row.directive';

const COMPONENTS = [
  DataTableComponent,
  DataTableHeaderComponent,
  DataTableBodyComponent,
  DataTableBodyActionComponent,
  DataTableBodyCellComponent,
  DataTableFooterComponent,
  DataTableBodyEmptyInfoComponent
];

const DIRECTIVES = [
  DataTableRowDirective
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  providers: [
    // DTRowSource
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class DataTableModule {}
