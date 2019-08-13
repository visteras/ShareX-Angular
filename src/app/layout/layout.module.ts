import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {LineChartComponent, NgxChartsModule} from '@swimlane/ngx-charts';
import {InputPlaceholderComponent} from '../components/input-placeholder/input-placeholder.component';
import {DashboardLayoutComponent} from './dashboard-layout/dashboard-layout.component';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {SignInOutLayoutComponent} from './sign-in-out-layout/sign-in-out-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    FontAwesomeModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  exports: [
    MainLayoutComponent,
    DashboardLayoutComponent,
    SignInOutLayoutComponent,
    InputPlaceholderComponent,
    LineChartComponent,
    RouterModule
  ],
  declarations: [
    MainLayoutComponent,
    DashboardLayoutComponent,
    SignInOutLayoutComponent,
    InputPlaceholderComponent,
  ],
})
export class LayoutModule {
}
