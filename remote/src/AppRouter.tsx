import {
  Link,
  Outlet,
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from "@tanstack/react-router";
import React from "react";

import "./main.css";
import { cn } from "./utils";

// Create a root route
const rootRoute = new RootRoute({
  component: Root,
});

function Root() {
  return (
    <>
      <div className={cn("flex flex-row gap-4")}>
        <Link
          to="/"
          className={cn("text-2xl")}
          activeProps={{
            className: cn("font-bold text-green-500"),
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={cn("text-2xl")}
          activeProps={{
            className: cn("font-bold"),
          }}
        >
          About
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  );
}

// Create an index route
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
});

function Index() {
  return (
    <div>
      <h3>Welcome Home! AAA</h3>
    </div>
  );
}

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

function About() {
  return <div>Hello from About!</div>;
}

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

// Create the router using your route tree
export const router = new Router({ routeTree });

const AppRouter: React.FC<{
  title: string;
  basepath: string;
}> = ({ title, basepath }) => {
  return (
    <>
      <h1>{title}</h1>
      <RouterProvider router={router.update({ basepath })} />
    </>
  );
};

export default AppRouter;
