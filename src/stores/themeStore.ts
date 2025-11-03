// src/store/themeStore.ts
import { Store } from "@tanstack/react-store";

type Theme = "light" | "dark";

export const themeStore = new Store<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: "light",
  toggleTheme: () => {},
});

themeStore.setState({
  ...themeStore.state,
  toggleTheme: () =>
    themeStore.setState({
      ...themeStore.state,
      theme: themeStore.state.theme === "light" ? "dark" : "light",
    }),
});
