import "./App.css";
import { Outlet } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { RetryLink } from 'apollo-link-retry';
import auth from "./utils/auth";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true
  },
  attempts: {
    max: 5,
    retryIf: (error) => !!error
  }
});

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
  link: retryLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          <Outlet className="bg-gray-50" />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
