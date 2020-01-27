import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
/**
 * Create a new apollo client and export as default
 */
//"https://rickandmortyapi.com/graphql"
const typeDefs = gql`
  extend type User {
    age: Int
  }
  extend type Pet{
      vaccinated:Boolean!
  }
`;
const resolvers = {
  User: {
    age() {
      return 35;
    }
  },
  Pet: {
    vaccinated(){
        return true
    }
  }
};
const http = new HttpLink({
  uri: "http://localhost:5000/"
});

const delay = setContext(
  request =>
    new Promise((success, fail) => {
      setTimeout(() => {
        success();
      }, 800);
    })
);
const link = ApolloLink.from([delay, http]);
const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache,
  resolvers,
  typeDefs
});
export default client;
