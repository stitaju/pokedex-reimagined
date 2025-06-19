import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Layout from './components/Layout';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import SearchPage from './pages/SearchPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route
              path="/search"
              element={<SearchPage />}
            />
            <Route
              path="/pokemon/:id"
              element={<PokemonDetail />}
            />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
