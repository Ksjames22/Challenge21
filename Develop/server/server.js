// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express'); // Import ApolloServer
const { typeDefs, resolvers } = require('./schemas'); // Adjust this path as needed
const routes = require('./routes');
const { authMiddleware } = require('./utils/auth'); // Import your auth middleware if you have one

const app = express();
const PORT = process.env.PORT || 3001;

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,         // Your GraphQL type definitions
  resolvers,        // Your GraphQL resolvers
  context: ({ req }) => {
    const user = authMiddleware({ req }); // Get user from token
    return { user }; // Pass the user to the context
  },
});

// Middleware for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Apply Apollo middleware
server.applyMiddleware({ app });

// Use existing routes
app.use(routes);

// Start the database connection and server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}${server.graphqlPath}`); // Include the GraphQL endpoint
  });
});


