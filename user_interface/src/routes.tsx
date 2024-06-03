import { createRoute, redirect } from "@tanstack/react-router";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import QueuePage from "./pages/QueuePage";
import BookingHistoryPage from "./pages/BookingHistoryPage";
import ProfilePage from "./pages/ProfilePage";
import { RootRoute } from "./layout/Layout";
import { useUserStore } from "./stores/useUserStore";

const indexRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: "/",
    component: HomePage,
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

const bookingHistoryRoute = createRoute({
    beforeLoad: () => {
        if (!useUserStore.getState().token) {
            throw redirect({
                to: "/login",
            });
        }
    },
    getParentRoute: () => RootRoute,
    path: "/history",
    component: BookingHistoryPage,
});

const profileRoute = createRoute({
    beforeLoad: () => {
        if (!useUserStore.getState().token) {
            throw redirect({
                to: "/login",
            });
        }
    },
    getParentRoute: () => RootRoute,
    path: "/profile",
    component: ProfilePage,
});

export const routeTree = RootRoute.addChildren([indexRoute, bookingRoute, loginRoute, queueRoute, bookingHistoryRoute, profileRoute]);