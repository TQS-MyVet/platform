import { StrictMode } from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { routeTree } from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "@/components/theme-provider"
import NotFoundPage from "@/pages/NotFoundPage"
import { Toaster } from './components/ui/toaster';
import { useUserStore } from './stores/useUserStore';

const router = createRouter({ 
    routeTree,
    defaultNotFoundComponent: () => <NotFoundPage />,
    context: { token : useUserStore.getState().token }
 });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const App = () => {
    const queryClient = new QueryClient();
    const token = useUserStore.getState().token;

    return (
        <StrictMode>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
              <QueryClientProvider client={queryClient}>
                  <RouterProvider basepath='/admin' router={router} context={{ token: token }}/>
                  <Toaster />
              </QueryClientProvider>
            </ThemeProvider>
        </StrictMode>
    );
};

export default App;