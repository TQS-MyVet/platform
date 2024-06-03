import { createRoute, redirect } from "@tanstack/react-router";
import HomePage from "./pages/HomePage";
import { RootRoute } from "./layout/Layout";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";
import AllAccountsPage from "./pages/AllAccountsPage";
import BookingPage from "./pages/BookingPage";
import QueuePage from "./pages/QueuePage";
import { useUserStore } from "./stores/useUserStore";

const indexRoute = createRoute({
    beforeLoad: () => {
        if (!useUserStore.getState().token) {
            throw redirect({
                to: "/login",
            });
        }
    },
    getParentRoute: () => RootRoute,
    path: "/",
    component: HomePage,
});

const loginRoute = createRoute({
    beforeLoad: () => {
        if (useUserStore.getState().token) {
            throw redirect({
                to: "/",
            });
        }
    },
    getParentRoute: () => RootRoute,
    path: "/login",
    component: LoginPage,
});

const accountRoute = createRoute({
    beforeLoad: () => {
        if (!useUserStore.getState().token) {
            throw redirect({
                to: "/login",
            });
        }
    },
    getParentRoute: () => RootRoute,
    path: "/account",
    component: AccountPage,
});

const allAccountsRoute = createRoute({
    beforeLoad: () => {
        if (!useUserStore.getState().token) {
            throw redirect({
                to: "/login",
            });
        }
    },
    getParentRoute: () => RootRoute,
    path: "/accounts",
    component: AllAccountsPage,
});

const bookingRoute = createRoute({
    beforeLoad: () => {
        if (!useUserStore.getState().token) {
            throw redirect({
                to: "/login",
            });
        }
    },
    getParentRoute: () => RootRoute,
    path: "/booking",
    component: BookingPage,
});

const queueRoute = createRoute({
    beforeLoad: () => {
        if (!useUserStore.getState().token) {
            throw redirect({
                to: "/login",
            });
        }
    },
    getParentRoute: () => RootRoute,
    path: "/queue",
    component: QueuePage,
});


export const routeTree = RootRoute.addChildren([indexRoute, loginRoute, accountRoute, allAccountsRoute, bookingRoute, queueRoute]);

