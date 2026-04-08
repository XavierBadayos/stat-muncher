import { createContext, useContext, useEffect, useState } from "react"
import { ScriptOnce } from "@tanstack/react-router"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: "system",
  setTheme: () => null,
})

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  // Inline script that runs BEFORE React hydrates → no flash
  const themeScript = `
    (function() {
      const saved = localStorage.getItem("${storageKey}");
      const defaultTheme = "${defaultTheme}";
      let theme = saved || defaultTheme;
      
      if (theme === "system") {
        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    })();
  `

  // Sync the React state with localStorage on mount (client only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem(storageKey) as Theme | null;
    if (saved) {
      setTheme(saved);
    }
  }, [storageKey])

  // Apply theme changes (for when user toggles)
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme])

  const handleSetTheme = (newTheme: Theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, newTheme);
    }
    setTheme(newTheme);
  }

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      <ScriptOnce>{themeScript}</ScriptOnce>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};