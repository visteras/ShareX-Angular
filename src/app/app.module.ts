import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {IndexComponent} from './index/index.component';
import {IndexModule} from './index/index.module';
import {LayoutModule} from './layout/layout.module';
import {SignFooterComponent} from './sign/sign-footer/sign-footer.component';
import {SignInModule} from './sign/sign-in/sign-in.module';
import {SignOutModule} from './sign/sign-out/sign-out.module';
import {SignUpModule} from './sign/sign-up/sign-up.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {path: '**', component: IndexComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    SignFooterComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    RouterModule.forRoot(routes, { enableTracing: true }),
    LayoutModule,
    SignInModule,
    SignOutModule,
    IndexModule,
    DashboardModule,
    SignUpModule,

  ],
  providers: [],
  exports: [
    AppComponent,
    RouterModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
