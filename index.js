const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const path = require('path');

const connectDB = require('./config/db');
const resolvers = require('./resolvers/resolvers');

connectDB();

const typeDefs = loadSchemaSync(path.join(__dirname, 'schema/schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}/graphql`);
});
