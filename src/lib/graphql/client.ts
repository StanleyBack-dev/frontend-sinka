import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const graphqlUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_GRAPHQL_DEV_URL
    : process.env.NEXT_PUBLIC_GRAPHQL_URL;

export const client = new ApolloClient({
  link: new HttpLink({
    uri: graphqlUrl as string,
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});