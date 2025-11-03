import type { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@tanstack/react-store";
import { themeStore } from "@/store/themeStore";
interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}
export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const { theme } = useStore(themeStore);
  const isDark = theme === "dark";

  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-2 transition-colors duration-300 ${
        isDark ? "text-slate-300" : "text-slate-700"
      }`}
    >
      {/* Selected Rows Info */}
      <div
        className={`text-sm text-center sm:text-left ${
          isDark ? "text-slate-400" : "text-muted-foreground"
        }`}
      >
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 lg:space-x-8 w-full sm:w-auto gap-3 sm:gap-0 justify-between">
        {/* Rows per page selector */}
        <div className="flex items-center justify-center sm:justify-start space-x-2">
          <p
            className={`text-sm font-medium ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Rows per page
          </p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger
              className={`h-8 w-[70px] transition-colors duration-300 ${
                isDark
                  ? "border-slate-700 bg-slate-900 text-slate-200"
                  : "border-slate-300 bg-white text-slate-800"
              }`}
            >
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent
              side="top"
              className={`transition-colors duration-300 ${
                isDark
                  ? "bg-slate-800 text-slate-200"
                  : "bg-white text-slate-800"
              }`}
            >
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page Info */}
        <div
          className={`flex items-center justify-center text-sm font-medium ${
            isDark ? "text-slate-300" : "text-slate-700"
          }`}
        >
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center space-x-1 sm:space-x-2">
          <Button
            variant="outline"
            size="icon"
            className={`size-8 transition-colors duration-300 ${
              isDark
                ? "border-slate-600 hover:bg-slate-800"
                : "border-slate-300 hover:bg-slate-100"
            }`}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="size-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={`size-8 transition-colors duration-300 ${
              isDark
                ? "border-slate-600 hover:bg-slate-800"
                : "border-slate-300 hover:bg-slate-100"
            }`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="size-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={`size-8 transition-colors duration-300 ${
              isDark
                ? "border-slate-600 hover:bg-slate-800"
                : "border-slate-300 hover:bg-slate-100"
            }`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="size-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={`size-8 transition-colors duration-300 ${
              isDark
                ? "border-slate-600 hover:bg-slate-800"
                : "border-slate-300 hover:bg-slate-100"
            }`}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
