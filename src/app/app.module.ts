import {HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ApolloModule} from 'apollo-angular';
import {HttpLinkModule} from 'apollo-angular-link-http';
import {AuthService, ConfigService} from './_services';
import {ToastService} from './_services/toast.service';
import {AdminModule} from './admin/admin.module';

import {AppComponent} from './app.component';
import {ToastsContainer} from './components/toasts-container/toasts-container.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {GraphQLModule} from './graphql.module';
import {httpInterceptorProviders} from './http-interceptors';
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
    HttpClientModule,
    RouterModule.forRoot(routes, {enableTracing: false}),
    ApolloModule,
    HttpLinkModule,
    LayoutModule,
    SignInModule,
    SignOutModule,
    IndexModule,
    DashboardModule,
    AdminModule,
    SignUpModule,
    GraphQLModule,
  ],
  providers: [
    AuthService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService], multi: true
    },
    ToastService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeToasts,
      deps: [ToastService], multi: true
    },
    httpInterceptorProviders
  ],
  exports: [
    AppComponent,
    RouterModule,
    NgbModule,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {


  constructor() {

    // apollo.create({
    //   link: httpLink.create({uri: this.config.config.urlGraphQL}),
    //   cache: new InMemoryCache()
    // });
  }
}

export function initializeApp(appConfig: ConfigService) {
  return () => appConfig.Load().then(r => {
    appConfig.config.urlGraphQL = r.urlGraphQL;
    appConfig.config.urlSignUp = r.urlSignUp;
    appConfig.config.urlJwtAccess = r.urlJwtAccess;
    appConfig.config.urlJwtRefresh = r.urlJwtRefresh;
    appConfig.config.domain = r.domain;
  });
}

export function initializeToasts(appToast: ToastService) {
  return () => appToast.toasts = [];
}
