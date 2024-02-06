import "./App.css";
import { Outlet } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import auth from "./utils/auth";
import Header from "./components/Header/Header"

const httpLink = createHttpLink({ uri: "/graphql " });

const authLink = setContext((_, { headers }) => {
  const token = auth.getToken();
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Outlet className="bg-gray-50" />
    </ApolloProvider>
  );
}

export default App;
