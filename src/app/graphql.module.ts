import {NgModule} from '@angular/core';
import {Apollo, APOLLO_OPTIONS} from 'apollo-angular';
import {InMemoryCache, ApolloLink, split } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import {HttpLink} from 'apollo-angular/http';
import {getMainDefinition} from '@apollo/client/utilities';
import {WebSocketLink} from '@apollo/client/link/ws';
import { environment } from 'src/environments/environment';

@NgModule({
})
export class GraphQLModule {
  constructor(private apollo: Apollo, httpLink: HttpLink) {
    // const ws = new WebSocketLink({
    //   uri: environment.web_socket_url,
    //   options: {
    //     reconnect: true,
    //     timeout: 60000
    //   },
    // });

    // const http = httpLink.create({
    //   uri: environment.graphql_url,
    // });
    // const link = split(({ query }) => {
    //   const { kind, operation }: any = getMainDefinition(query);
    //   return kind === 'OperationDefinition' && operation === 'subscription';
    // },  ws,  http);

    apollo.createDefault({
      link: httpLink.create({uri: "http://localhost:8080/graphql"}),
      cache: new InMemoryCache({
        addTypename: false
      }),
      defaultOptions: {
        query: {
          fetchPolicy: 'no-cache'
        }
      }
    });
    
  }
}

