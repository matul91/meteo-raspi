import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "apollo-boost";
import {GRAPHQL_API_TOKEN} from "../config/constants/localStorage";

const httpLink = new HttpLink({ uri: "/graphql" });

const authenticatedLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem(GRAPHQL_API_TOKEN);
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : "",
        },
    });
    return forward(operation);
});

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: authenticatedLink.concat(httpLink),
});

export default apolloClient;
