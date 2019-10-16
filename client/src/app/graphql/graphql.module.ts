import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloLink, from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { NzMessageService } from 'ng-zorro-antd';

import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { environment } from '../../environments/environment';
import fragmentTypes from './fragmentTypes.json';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ApolloModule,
    HttpLinkModule
  ],
  declarations: []
})
export class GraphqlModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    private _msg: NzMessageService,
  ) {

    const http = httpLink.create({
      uri: environment.graphql.http
    });

    // set graphql headers
    const authMiddleware = new ApolloLink((operation, forward) => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYTQ4Yzc3OGYyMzllODRlNzJhMGM4MSIsInVzZXJuYW1lIjoiemhvdXhpYW5neXUiLCJlbWFpbCI6Inpob3V4aWFuZ3l1QGNtc3MuY2hpbmFtb2JpbGUuY29tIiwiaWF0IjoxNTcxMTM2MTQ2LCJleHAiOjE1NzExNTQxNDZ9.zDnFbaCdHFU2v1QyVwAhQiAVM4bU7WQVUSXkzKyQShc";

      if (token) {
        operation.setContext({
          headers: new HttpHeaders().set('token', `${token}` || null)
        });
      }

      return forward(operation);
    });

    const errorHandlingAfterWare = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
          this._msg.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        });
      }

      if (networkError) {
        if (networkError['status'] === 401) {
          // this._router.navigate(['/login']);
        } else {
          console.log('network error');
          this._msg.error(`[NetWork error]: Message: ${networkError.message}`);
        }
      }
    });

    apollo.create({
      link: from([
        errorHandlingAfterWare,
        authMiddleware,
        http
      ]),
      cache: new InMemoryCache({
        addTypename: true,
        fragmentMatcher: new IntrospectionFragmentMatcher(fragmentTypes)
      }),
      defaultOptions: {
        query: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all'
        }
      }
    });
  }
}
