import { createRoute } from "@tanstack/react-router";
import HomePage from "./pages/HomePage";
import { RootRoute } from "./layout/Layout";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";
import AllAccountsPage from "./pages/AllAccountsPage";

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

const allAccountsRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: "/accounts",
    component: AllAccountsPage,
});


export const routeTree = RootRoute.addChildren([indexRoute, loginRoute, accountRoute, allAccountsRoute]);

