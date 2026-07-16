"use client";
import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

type Theme = "light" | "dark";
const STORAGE_KEY = "businux-theme";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}
const ThemeContext = createContext<ThemeContextValue>({ theme: "light", setTheme: () => {} });

// Reading from localStorage is a subscription to an external store, which is
// exactly what useSyncExternalStore is designed for — this avoids the
// setState-in-effect anti-pattern (cascading renders, hydration mismatches)
// that a naive `useEffect(() => setTheme(localStorage.getItem(...)))` causes.
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): Theme {
  return (window.localStorage.getItem(STORAGE_KEY) as Theme | null) ?? "light";
}

// The server has no localStorage, so it always renders the deterministic
// default. The tiny inline script in RootLayout applies the real class to
// <html> before paint, so there's no visible flash even though React's own
// snapshot briefly reports "light" until it re-syncs on the client.
function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.classList.toggle("dark", next === "dark");
    // useSyncExternalStore only re-renders on the "storage" event (which fires
    // in *other* tabs, not the current one), so dispatch it locally too.
    window.dispatchEvent(new StorageEvent("storage"));
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
