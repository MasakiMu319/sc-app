import {
  Links,
  Meta,
  Outlet,
  Scripts,
} from "@remix-run/react";

import {NextUIProvider} from "@nextui-org/react";
import appStylesHref from "./tailwind.css"
export const links: LinksFunction=()=>[
    {rel:"stylesheet", href:appStylesHref}
];

export default function App() {
  return (
      <html>
      <head>
        <link
            rel="icon"
            href="data:image/x-icon;base64,AA"
        />
        <Meta />
        <Links />
      </head>
      <body>
      <NextUIProvider>
          <div className="w-screen h-screen p-5 flex items-center justify-center">
              <Outlet />
              <Scripts />
          </div>
      </NextUIProvider>
      </body>
      </html>
  );
}
