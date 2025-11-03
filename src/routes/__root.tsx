// src/routes/__root.tsx
import { createRootRoute, Outlet } from "@tanstack/react-router";
import Navbar from "@/components/common/Navbar";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <Outlet />
    </>
  ),
});
