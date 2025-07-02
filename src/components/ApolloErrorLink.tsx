import React, { useContext, useMemo } from 'react';
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ErrorContext } from '../context/ErrorContext';

export const ApolloErrorLink = ({ children }: { children: React.ReactNode }) => {
  const errorContext = useContext(ErrorContext);

  if (!errorContext) {
    throw new Error('ApolloErrorLink must be used within an ErrorProvider');
  }

  const { setError } = errorContext;

  const client = useMemo(() => {
    const httpLink = new HttpLink({
      uri: 'http://localhost:4000/graphql',
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach((error) => {
          setError(new Error(error.message));
          console.error(
            `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`,
          );
        });
      }

      if (networkError) {
        setError(networkError);
        console.error(`[Network error]: ${networkError}`);
      }
    });

    return new ApolloClient({
      link: ApolloLink.from([errorLink, httpLink]),
      cache: new InMemoryCache(),
    });
  }, [setError]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};