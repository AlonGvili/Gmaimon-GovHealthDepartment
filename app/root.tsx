import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "remix";
import type { LoaderFunction, LinksFunction } from "remix";

import globalStylesUrl from "~/styles/global.css";
import darkStylesUrl from "~/styles/dark.css";
import styles from "./styles/app.css";

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: globalStylesUrl },
    {
      rel: "stylesheet",
      href: darkStylesUrl,
      media: "(prefers-color-scheme: dark)",
    },
  ];
};



export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
      <footer className="h-14 fixed bottom-0 bg-white w-full text-center text-sm py-4">
        2021 &copy; meditav
      </footer>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
}

export function CatchBoundary() {
  let caught = useCatch();
  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
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
    <html lang="en">
      <head>
        <meta charSet="" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body className="bg-blue-500 h-screen text-gray-700">
        {children}

        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  let data = useLoaderData();
  return (
    <div dir="rtl" className="flex-col">
      {children}
    </div>
  );
}

{
  /* <nav className="bg-white p-8  ">
          <ul className="space-y-4">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-purple-700" : "text-gray-400"
                }
                to={`members/${data?.idNumber}/me`}
              >
                פרופיל
              </NavLink>
            </li>
            {data?.role === "TEAMLEADER" && (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-purple-700" : "text-gray-400"
                  }
                  to={`members/${data.idNumber}/dashboard/tasks`}
                >
                  התקנות
                </NavLink>
              </li>
            )}
            {data?.role === "SUPERVISOR" && (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-purple-700" : "text-gray-400"
                  }
                  to={`members/${data.idNumber}/dashboard/schools`}
                >
                  מוסדות
                </NavLink>
              </li>
            )}
            {data?.role === "TEAMLEADER" && (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-purple-700" : "text-gray-400"
                  }
                  to={`members/${data.idNumber}/dashboard/schools`}
                >
                  מוסדות
                </NavLink>
              </li>
            )}
            {data?.role === "TEAMLEADER" && (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-purple-700" : "text-gray-400"
                  }
                  to={`members/${data.idNumber}/dashboard/teams`}
                >
                  צוות
                </NavLink>
              </li>
            )}
            {data?.role === "ADMIN" && (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-purple-700" : "text-gray-400"
                  }
                  to={`members/${data.idNumber}/dashboard/console`}
                >
                  ניהול
                </NavLink>
              </li>
            )}
            {data?.role === "ADMIN" && (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-purple-700" : "text-gray-400"
                  }
                  to={`members/${data.idNumber}/dashboard/teams`}
                >
                  צוות
                </NavLink>
              </li>
            )}
            {data?.role === "ADMIN" && (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-purple-700" : "text-gray-400"
                  }
                  to={`members/${data.idNumber}/dashboard/tasks`}
                >
                  התקנות
                </NavLink>
              </li>
            )}
            {data?.role === "ADMIN" && (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-purple-700" : "text-gray-400"
                  }
                  to={`members/${data.idNumber}/dashboard/schools`}
                >
                  מוסדות
                </NavLink>
              </li>
            )}
            {data?.role === "ADMIN" && (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-purple-700" : "text-gray-400"
                  }
                  to={`members/${data.idNumber}/dashboard/orders`}
                >
                  הזמנות
                </NavLink>
              </li>
            )}
          </ul>
        </nav> */
}
