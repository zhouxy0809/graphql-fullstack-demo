import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutesComponent } from './routes.component';
import { UsersComponent } from './users/list/users.component';

export const pagesRoutes: Routes = [
  {
    path: 'routes',
    component: RoutesComponent,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'users',
        component: UsersComponent
      }
    ]
  }
];

export const pagesRouting: ModuleWithProviders = RouterModule.forChild(pagesRoutes);
