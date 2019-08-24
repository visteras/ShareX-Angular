import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../_helper/auth.guard';
import {Role} from '../_models';
import {DashboardLayoutComponent} from '../layout/dashboard-layout/dashboard-layout.component';
import {AdminIndexComponent} from './admin-index/admin-index.component';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardLayoutComponent,
    children: [
      {path: '', component: AdminIndexComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
