const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const path = require('path');
const resolvers = require('./resolvers');

const schema = loadSchemaSync(path.join(__dirname, 'schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: executableSchema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Server działa na http://localhost:4000/graphql');
});
