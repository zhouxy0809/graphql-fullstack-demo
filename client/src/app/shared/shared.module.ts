import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { DataTableModule } from './data-table/data-table.module';


const SHARED_COMPONENTS = [];
const SHARED_MODULES = [
  NgZorroAntdModule,
  DataTableModule
];
const SHARED_DIRECTIVES = [];
const SHARED_SERVICES = [];
const SHARED_PIPES = [];
const SHARED_GUARDS = [];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ...SHARED_MODULES,
  ],
  declarations: [
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES,
    ...SHARED_PIPES,
  ],
  exports: [
    ...SHARED_COMPONENTS,
    ...SHARED_MODULES,
    ...SHARED_DIRECTIVES,
    ...SHARED_PIPES,
  ],
  entryComponents: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SharedModule,
      providers: [
        ...SHARED_SERVICES,
        ...SHARED_GUARDS
      ]
    };
  }
}
