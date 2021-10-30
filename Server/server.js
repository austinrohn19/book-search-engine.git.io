const express = require('express');
const { ApolloServer } = require("apollo-server-express");
const path = require('path');
const { typeDefs, resolvers } = require("./schemas");
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
    console.log(`GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });