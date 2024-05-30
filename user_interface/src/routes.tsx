import { createRoute } from "@tanstack/react-router";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import QueuePage from "./pages/QueuePage";
import BookingHistoryPage from "./pages/BookingHistoryPage";
import { RootRoute } from "./layout/Layout";

const indexRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: "/",
    component: HomePage,
});

const bookingRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: "/booking",
    component: BookingPage,
});

const loginRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: "/login",
    component: LoginPage,
});

const queueRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: "/queue",
    component: QueuePage,
});

const bookingHistoryRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: "/history",
    component: BookingHistoryPage,
});

export const routeTree = RootRoute.addChildren([indexRoute, bookingRoute, loginRoute, queueRoute, bookingHistoryRoute]);