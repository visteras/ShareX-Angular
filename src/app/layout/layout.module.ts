import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LineChartComponent, NgxChartsModule} from '@swimlane/ngx-charts';
import {InputPlaceholderComponent} from '../components/input-placeholder/input-placeholder.component';
import {MenuBlockModule} from '../components/menu-block/menu-block.module';
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
    MenuBlockModule,
    NgbModule,
  ],
  exports: [
    MainLayoutComponent,
    DashboardLayoutComponent,
    SignInOutLayoutComponent,
    InputPlaceholderComponent,
    LineChartComponent,
    RouterModule,
    NgbModule,
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
