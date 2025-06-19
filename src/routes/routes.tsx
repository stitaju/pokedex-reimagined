import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import Layout from '../components/Layout/index';
import PokemonListPage from '../pages/PokemonList';
import PokemonDetailPage from '../pages/PokemonDetail';
import FavoritesPage from '../pages/FavoritesPage';
import { PageNotFound } from '../pages/PageNotFound';
import { LoginPage } from '../pages/LoginPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<PokemonListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/favourites"
            element={<FavoritesPage />}
          />
          <Route
            path="/pokemon/:id"
            element={<PokemonDetailPage />}
          />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRoutes;
