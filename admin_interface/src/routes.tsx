import { createRoute } from "@tanstack/react-router";
import HomePage from "./pages/HomePage";
import { RootRoute } from "./layout/Layout";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";

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

const accountRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: "/account",
    component: AccountPage,
});

export const routeTree = RootRoute.addChildren([indexRoute, loginRoute, accountRoute]);

