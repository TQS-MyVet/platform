import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Sidebar2 from './Sidebar';
import useIsCollapsed from '@/hooks/use-is-collapsed'
import { createRootRouteWithContext } from '@tanstack/react-router';
import { useUserStore } from '@/stores/useUserStore';

type RouterContext = {
    token: string;
};

function RootComponent() {
    const [isCollapsed, setIsCollapsed] = useIsCollapsed();

    return (
        <div className='relative h-full overflow-hidden bg-background'>
            <Sidebar2 isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <main
                id='content'
                className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
            >
                <Outlet />
            </main>
            <TanStackRouterDevtools position="bottom-right" />
            <ReactQueryDevtools buttonPosition="bottom-left" />
        </div>
    );
}

export const RootRoute = createRootRouteWithContext<RouterContext>()({
    component: RootComponent,
});