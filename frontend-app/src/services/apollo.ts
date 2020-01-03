import ApolloClient, { InMemoryCache } from 'apollo-boost';

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://raspi.jiri-matula.cz/graphql',
});
