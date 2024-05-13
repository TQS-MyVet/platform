import { createRoute } from "@tanstack/react-router";
import HomePage from "./pages/HomePage";
import { RootRoute } from "./layout/Layout";
import LoginPage from "./pages/LoginPage";

const indexRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: "/",
    component: HomePage,
});

const loginRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: "/login",
    component: LoginPage,
});

export const routeTree = RootRoute.addChildren([indexRoute, loginRoute]);

