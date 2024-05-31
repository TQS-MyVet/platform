import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function RootComponent() {
    return (
        <>
            <Outlet />
            <TanStackRouterDevtools />
            <ReactQueryDevtools />
        </>
    );
}

export const RootRoute = createRootRoute<{}>({
    component: RootComponent,
})
