import Trips from "@/components/trip/trip-details/Trips";
import { themeStore } from "@/store/themeStore";
import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { theme } = useStore(themeStore);

  return (
    <div className={`${theme === "dark" ? "bg-slate-900" : "bg-white"}`}>
      <Trips />
    </div>
  );
}
