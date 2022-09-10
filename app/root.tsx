import type { PropsWithChildren } from "react";
import type { MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import globalsStylesUrl from "./styles/globals.css";

export const links = () => [{ rel: "stylesheet", href: globalsStylesUrl }];

export const meta: MetaFunction = () => {
  const title = "Home page";
  const description =
    "Description for home page of new blog posts app made with REMIX";

  const keywords = "remix, react, javascript, typescript, new";

  return {
    title,
    description,
    keywords,
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
  };
};

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Document({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
}

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          Blog
        </Link>
        <ul className="nav">
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </nav>
      <div className="container">{children}</div>
    </>
  );
}

export function ErrorBoundary({ error }) {
  console.log(error);

  return (
    <Document>
      <Layout>
        <div>
          <h1>Error</h1>
          <pre>{error.message}</pre>
        </div>
      </Layout>
    </Document>
  );
}
