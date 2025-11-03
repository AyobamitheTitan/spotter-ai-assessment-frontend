import {
  tripStore,
  type TripDetailsData,
  type TripResponseData,
} from "@/store/tripStore";
import { useStore } from "@tanstack/react-store";
import { useEffect, useState } from "react";
import TripELDMap from "./TripELDMap";
import { themeStore } from "@/store/themeStore";

interface SingleTripProps {
  id: string;
}

export function SingleTrip({ id }: SingleTripProps) {
  const { theme } = useStore(themeStore);

  const [data, setData] = useState<TripResponseData>({} as TripResponseData);
  const [tripDetails, setTripDetails] = useState<TripDetailsData>(
    {} as TripDetailsData
  );

  const { getTripById, getTripDetailsByTripId } = useStore(tripStore);
  useEffect(() => {
    getTripById(id).then((dta) => setData(dta));
    getTripDetailsByTripId(id).then((dta) =>
      setTripDetails(dta || ({} as TripDetailsData))
    );
  }, []);
  return (
    <div
      className={`min-h-screen flex flex-col items-center px-4 py-10 ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
    >
      {/* === Trip Details Card === */}
      <div
        className={`w-full max-w-md p-6 rounded-xl shadow-md space-y-4
      ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
      >
        <h2 className="text-xl font-bold">Trip Details</h2>

        <div className="flex justify-between">
          <span
            className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}
          >
            Trip ID:
          </span>
          <span>{data.id?.substring(0, 7)}</span>
        </div>

        <div className="flex justify-between">
          <span
            className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}
          >
            Current Location:
          </span>
          <span>{data.current_location}</span>
        </div>

        <div className="flex justify-between">
          <span
            className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}
          >
            Pickup Location:
          </span>
          <span>{data.pickup_location}</span>
        </div>

        <div className="flex justify-between">
          <span
            className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}
          >
            Dropoff Location:
          </span>
          <span>{data.dropoff_location}</span>
        </div>

        <div className="flex justify-between">
          <span
            className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}
          >
            Used Hours:
          </span>
          <span>{data.current_cycle_used_hrs} hrs</span>
        </div>
      </div>

      {/* === Trip ELD Map Component === */}
      <div className="w-full max-w-3xl mt-6">
        <TripELDMap details={tripDetails} />
      </div>
    </div>
  );
}
