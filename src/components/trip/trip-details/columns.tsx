import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Link } from "@tanstack/react-router";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export type Trip = {
  id: string;
  current_location: string;
  pickup_location: string;
  dropoff_location: string;
  current_cycle_used_hrs: number;
  // actions: any;
};

export const columns: ColumnDef<Trip>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{Number(row.id) + 1}</div>,
  },
  { accessorKey: "current_location", header: "Origin" },

  { accessorKey: "pickup_location", header: "Pickup Location" },
  { accessorKey: "dropoff_location", header: "Dropoff location" },
  { accessorKey: "current_cycle_used_hrs", header: "Current cycle used" },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="cursor-pointer">
            <div className="bg-white border rounded p-2">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <hr className="py-2" />
              <DropdownMenuItem className="hover:outline-0 hover:border-0 hover:bg-slate-50">
                <Link
                  to={
                    `/trips/${row.original.id}` as
                      | "."
                      | ".."
                      | "/trip"
                      | "/"
                      | "/trips/$tripId"
                  }
                >
                  View More
                </Link>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
