import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <div className="grid min-h-svh grid-cols-1">
      <h1 className="text-xl">Big Mac</h1>
    </div>
  )
}
