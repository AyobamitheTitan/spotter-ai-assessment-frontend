import { createFileRoute } from "@tanstack/react-router";
import NewTripEntry from "@/components/trip/NewTripEntry";

export const Route = createFileRoute("/trip")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen w-screen">
      <NewTripEntry />
    </div>
  );
}
