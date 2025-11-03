// src/components/Navbar.tsx
import { useStore } from "@tanstack/react-store";
import { Moon, Sun, PlusCircle } from "lucide-react";
import { themeStore } from "../../store/themeStore";
import { Link } from "@tanstack/react-router";

export default function Navbar() {
  const { theme, toggleTheme } = useStore(themeStore);

  return (
    <nav
      className={`flex items-center justify-between px-6 py-3 shadow-md transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-blue-500" />
        <h1 className="text-lg font-semibold tracking-wide">
          <Link to="/"> Routes and Logs</Link>
        </h1>
      </div>

      <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
        <li className="cursor-pointer hover:text-blue-500 transition-colors">
          <Link to="/">Dashboard</Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <Link
          to="/trip"
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
        >
          <PlusCircle size={16} />
          New Entry
        </Link>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-transparent hover:border-gray-400 transition-colors"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}
