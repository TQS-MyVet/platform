import { StrictMode } from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { routeTree } from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "@/components/theme-provider"
import NotFoundPage from "@/pages/NotFoundPage"
import { Toaster } from './components/ui/toaster';

const router = createRouter({ 
    routeTree,
    defaultNotFoundComponent: () => <NotFoundPage />
 });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const App = () => {
    const queryClient = new QueryClient();

    return (
        <StrictMode>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
              <QueryClientProvider client={queryClient}>
                  <RouterProvider basepath='/admin' router={router} />
                  <Toaster />
              </QueryClientProvider>
            </ThemeProvider>
        </StrictMode>
    );
};

export default App;