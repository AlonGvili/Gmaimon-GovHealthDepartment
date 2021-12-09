import {
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import type { LoaderFunction, LinksFunction } from "remix";
import styles from "./styles/app.css";
import { useRemixI18Next } from "remix-i18next";
import { i18n } from "./utils/i18n.server";
import { getUser, isAuthenticated } from "./utils/session.server";
import { MantineProvider } from "@mantine/core";
import stylisRTLPlugin from "stylis-plugin-rtl";
export { CatchBoundary, ErrorBoundary } from "~/utils";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export let loader: LoaderFunction = async ({ request }) => {
  let locale = await i18n.getLocale(request);
  return json({ locale });
};

export default function App() {
  let { locale } = useLoaderData<{ locale: string }>();
  useRemixI18Next(locale);
  return (
      <Document>
        <Outlet />
      </Document>
  );
}

export function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html dir="rtl" lang="he-IL">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
