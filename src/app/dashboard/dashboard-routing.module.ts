import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../_helper/auth.guard';
import {AdminIndexComponent} from '../admin/admin-index/admin-index.component';
import {DashboardLayoutComponent} from '../layout/dashboard-layout/dashboard-layout.component';
import {DashboardFilesComponent} from './dashboard-files/dashboard-files.component';
import {DashboardImagesComponent} from './dashboard-images/dashboard-images.component';
import {DashboardIndexComponent} from './dashboard-index/dashboard-index.component';
import {DashboardLinksComponent} from './dashboard-links/dashboard-links.component';
import {DashboardTextComponent} from './dashboard-text/dashboard-text.component';
import {DashboardTokensComponent} from './dashboard-tokens/dashboard-tokens.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {path: '', component: DashboardIndexComponent, canActivate: [AuthGuard]},
      {path: 'tokens', component: DashboardTokensComponent, canActivate: [AuthGuard]},
      {path: 'images', component: DashboardImagesComponent, canActivate: [AuthGuard]},
      {path: 'links', component: DashboardLinksComponent, canActivate: [AuthGuard]},
      {path: 'files', component: DashboardFilesComponent, canActivate: [AuthGuard]},
      {path: 'text', component: DashboardTextComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
