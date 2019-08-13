import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
      {path: '', component: DashboardIndexComponent},
      {path: 'tokens', component: DashboardTokensComponent},
      {path: 'images', component: DashboardImagesComponent},
      {path: 'links', component: DashboardLinksComponent},
      {path: 'files', component: DashboardFilesComponent},
      {path: 'text', component: DashboardTextComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
