import { Button } from "@/components/ui/button";
import { themeStore } from "@/store/themeStore";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Link } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
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

export function useTripColumns(): ColumnDef<Trip>[] {
  const { theme } = useStore(themeStore);
  const isDark = theme === "dark";

  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className={isDark ? "text-slate-200" : "text-slate-800"}>
          {Number(row.id) + 1}
        </div>
      ),
    },
    { accessorKey: "current_location", header: "Origin" },
    { accessorKey: "pickup_location", header: "Pickup Location" },
    { accessorKey: "dropoff_location", header: "Dropoff location" },
    { accessorKey: "current_cycle_used_hrs", header: "Current cycle used" },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`h-8 w-8 p-0 ${
                isDark
                  ? "hover:bg-slate-800 text-slate-100"
                  : "hover:bg-slate-100 text-slate-700"
              }`}
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className={`cursor-pointer border p-2 ${
              isDark
                ? "bg-slate-900 border-slate-700 text-slate-200"
                : "bg-white border-slate-200 text-slate-800"
            }`}
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <hr className="my-2 border-slate-400" />
            <DropdownMenuItem
              className={`hover:outline-0 hover:border-0 ${
                isDark ? "hover:bg-slate-800" : "hover:bg-slate-50"
              }`}
            >
              <Link to={`/trips/${row.original.id}`}>View More</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
}
