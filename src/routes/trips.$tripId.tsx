import { SingleTrip } from "@/components/trip/SingleTrip";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/trips/$tripId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { tripId } = Route.useParams();
  return <SingleTrip id={tripId} />;
}
