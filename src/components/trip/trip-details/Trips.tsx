import { tripStore, type TripResponseData } from "@/store/tripStore";
import { useStore } from "@tanstack/react-store";
import { columns, type Trip } from "./columns";
import { DataTable } from "../../common/data-table";
import { useEffect, useState } from "react";

export default function Trips() {
  const { getAllTrips } = useStore(tripStore);
  const [data, setData] = useState<TripResponseData[]>([]);

  useEffect(() => {
    getAllTrips().then((dta) => setData(dta ?? []));
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data as unknown as Trip[]} />
    </div>
  );
}
