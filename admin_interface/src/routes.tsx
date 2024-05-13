import { NotFoundRoute, createRoute } from "@tanstack/react-router";
import HomePage from "./pages/HomePage";
import { RootRoute } from "./layout/Layout";

const indexRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: "/",
    component: HomePage,
});

export const routeTree = RootRoute.addChildren([indexRoute]);

