import Trips from "@/components/trip/trip-details/Trips";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Trips />
    </>
  );
}
