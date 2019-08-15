import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {SelectPlaceholderComponent} from '../components/select-placeholder/select-placeholder.component';
import {LayoutModule} from '../layout/layout.module';
import {DashboardFilesComponent} from './dashboard-files/dashboard-files.component';
import {DashboardImagesComponent} from './dashboard-images/dashboard-images.component';
import {DashboardIndexComponent} from './dashboard-index/dashboard-index.component';
import {DashboardLinksComponent} from './dashboard-links/dashboard-links.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardTextComponent} from './dashboard-text/dashboard-text.component';
import {DashboardTokensComponent} from './dashboard-tokens/dashboard-tokens.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutModule,
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
  ],
  declarations: [
    DashboardIndexComponent,
    DashboardTokensComponent,
    DashboardImagesComponent,
    DashboardFilesComponent,
    DashboardLinksComponent,
    DashboardTextComponent,
    SelectPlaceholderComponent,
  ],
  exports: [],
})
export class DashboardModule {
}
