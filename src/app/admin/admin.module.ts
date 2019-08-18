import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {SelectPlaceholderComponent} from '../components/select-placeholder/select-placeholder.component';
import {LayoutModule} from '../layout/layout.module';
import {AdminIndexComponent} from './admin-index/admin-index.component';
import {AdminRoutingModule} from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
  ],
  declarations: [
    AdminIndexComponent,
    SelectPlaceholderComponent,
  ],
  exports: [],
})
export class AdminModule {
}
