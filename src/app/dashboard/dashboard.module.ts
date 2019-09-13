import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ImageConfirmModalComponent} from '../components/confirm-modals';
import {ImageOpenModalComponent} from '../components/confirm-modals/image-open-modal.component';
import {LinkConfirmModalComponent} from '../components/confirm-modals/link-confirm-modal.component';
import {TokenConfirmModalComponent} from '../components/confirm-modals/token-confirm-modal.component';

import {SelectPlaceholderComponent} from '../components/select-placeholder/select-placeholder.component';
import {LayoutModule} from '../layout/layout.module';
import {DashboardFilesComponent} from './dashboard-files/dashboard-files.component';
import {DashboardImagesComponent} from './dashboard-images/dashboard-images.component';
import {DashboardIndexComponent} from './dashboard-index/dashboard-index.component';
import {DashboardLinksComponent} from './dashboard-links/dashboard-links.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardTextComponent} from './dashboard-text/dashboard-text.component';
import {DashboardTokensComponent} from './dashboard-tokens/dashboard-tokens.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutModule,
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    DashboardIndexComponent,
    DashboardTokensComponent,
    DashboardImagesComponent,
    DashboardFilesComponent,
    DashboardLinksComponent,
    DashboardTextComponent,
    SelectPlaceholderComponent,
    TokenConfirmModalComponent,
    ImageConfirmModalComponent,
    ImageOpenModalComponent,
    LinkConfirmModalComponent,
  ],
  exports: [
    NgbModule,
  ],
  entryComponents: [
    TokenConfirmModalComponent,
    ImageConfirmModalComponent,
    ImageOpenModalComponent,
    LinkConfirmModalComponent,
  ]
})
export class DashboardModule {
}
