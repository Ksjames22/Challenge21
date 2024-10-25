import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'; // Import Apollo components
import Navbar from './components/Navbar';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: '/graphql', // Your GraphQL endpoint
  cache: new InMemoryCache(),           // Set up cache
});

function App() {
  return (
    <ApolloProvider client={client}>  {/* Wrap your app with ApolloProvider */}
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;

