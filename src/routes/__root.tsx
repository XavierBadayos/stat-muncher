import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"
import appCss from "../styles.css?url"
import { ThemeProvider } from "@/components/theme/theme-provider"
import type { QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({head: () => ({
  meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({}: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Outlet />
          <TanStackDevtools
              config={{
                position: "bottom-right",
              }}
              plugins={[
                {
                  name: "Tanstack Router",
                  render: <TanStackRouterDevtoolsPanel />,
                },
              ]}
            />
            <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}