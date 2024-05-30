import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NavBar from './components/NavBar';


function RootComponent() {
    return (
        <>
            <NavBar/>
            <div className='-mt-16'>
                <Outlet />
            </div>
            <TanStackRouterDevtools />
            <ReactQueryDevtools />
        </>
    );
}

export const RootRoute = createRootRoute<{}>({
    component: RootComponent,
})
