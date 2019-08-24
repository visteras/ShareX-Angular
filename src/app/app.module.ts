import {HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {AuthService, ConfigService} from './_services';
import {AdminModule} from './admin/admin.module';

import {AppComponent} from './app.component';
import {DashboardModule} from './dashboard/dashboard.module';
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
  ],
  providers: [
    AuthService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService], multi: true
    },
    httpInterceptorProviders
  ],
  exports: [
    AppComponent,
    RouterModule,
    NgbModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule {


  constructor(apollo: Apollo,
              httpLink: HttpLink, private config: ConfigService) {

    apollo.create({
      link: httpLink.create({uri: this.config.config.urlGraphQL}),
      cache: new InMemoryCache()
    });
  }
}

export function initializeApp(appConfig: ConfigService) {
  return () => appConfig.Load();
}
