import {HttpHeaders} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {concat} from 'apollo-link';
import {setContext} from 'apollo-link-context';
import {AuthService, ConfigService} from './_services';
import {Prefix} from './_services/prefix';

export function createApollo(httpLink: HttpLink, configService: ConfigService, auth: AuthService) {
  const uri = configService.config.domain+configService.config.urlGraphQL;
  const http = httpLink.create({uri});

  const asyncAuthLink = setContext(async _ => {
    let token = localStorage.getItem(Prefix.Access + '_jwt');

    if (token == null || auth.IsExpired(Prefix.Access)) {
      await auth.updateAccessToken().toPromise();
      token = localStorage.getItem(Prefix.Access + '_jwt');
    }

    return {
      headers: new HttpHeaders().set('Authorization', (auth.IsLoggedIn() ? `Bearer ${token}` : ''))
    };
  });

  return {
    link: concat(asyncAuthLink, http),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, ConfigService, AuthService],
    },
  ],
})
export class GraphQLModule {
}
