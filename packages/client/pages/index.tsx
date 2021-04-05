import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import React from "react";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
  headers: {
    mockType: "FIRST",
  },
});

const BOOKS = gql`
  query Books {
    books {
      author
      title
    }
  }
`;

const Books = ({ children }) => {
  const { loading, error, data } = useQuery(BOOKS);
  return children({ data: data?.books || [], loading });
};

const HomePage = () => {
  return (
    <ApolloProvider client={client}>
      <Books>
        {({ data, loading }) => (
          <React.Fragment>
            <h2>My first Apollo app 🚀</h2>
            {loading === true ? "LOADING" : null}
            {data.map((item) => (
              <div>
                {item.title} - {item.author}
              </div>
            ))}
          </React.Fragment>
        )}
      </Books>
    </ApolloProvider>
  );
};

export default HomePage;
