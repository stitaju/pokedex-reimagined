import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { Auth0Provider } from '@auth0/auth0-react';
import AppRoutes from './routes/routes';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

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
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <AppRoutes />
      </Auth0Provider>
    </QueryClientProvider>
  );
}

export default App;
