import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '../shared/shared.module';
import { RoutesComponent } from './routes.component';
import { UsersComponent } from './users/list/users.component';
import { UserOperateModalComponent } from './users/user-operate-modal/user-operate-modal.component';
import { pagesRouting } from './routes.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule.forRoot(),
    SharedModule,
    pagesRouting
  ],
  declarations: [
    RoutesComponent,
    UsersComponent,
    UserOperateModalComponent
  ],
  entryComponents: [
    UserOperateModalComponent
  ]
})
export class RoutesModule { }
