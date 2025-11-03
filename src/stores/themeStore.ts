// src/store/themeStore.ts
import { Store } from "@tanstack/react-store";

type Theme = "light" | "dark";

export const themeStore = new Store<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: (localStorage.getItem("theme") as Theme) || "light",
  toggleTheme: () => {},
});

themeStore.setState({
  ...themeStore.state,
  toggleTheme: () => {
    const newTheme = themeStore.state.theme === "light" ? "dark" : "light"
    themeStore.setState({
      ...themeStore.state,
      theme: newTheme,
    });
    localStorage.setItem("theme", newTheme)
  },
});
