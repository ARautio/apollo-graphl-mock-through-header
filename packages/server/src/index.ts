import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: (root, arg, context, info) => {
      console.log(root, arg, context, info);
      return [];
    },
  },
};

const mocks = {
  Book: (root, arg, context, info) => {
    return {
      title: context.mockType === "FIRST" ? "First title" : "Second title",
      author: "Test author",
    };
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks,
  context: ({ req }) => {
    return {
      mockType: req.headers.mocktype,
    };
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
