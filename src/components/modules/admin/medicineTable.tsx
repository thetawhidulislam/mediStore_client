"use client";

import { Eye, Trash2, Store, Package, Plus, Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { deleteMedicine } from "@/action/medicine.action";
import { getMedicineData } from "@/constants/MedicineData";

interface MedicineTableProps {
  data: { data: getMedicineData[] } | null;
  userRole: "SELLER" | "ADMIN";
}

const ITEMS_PER_PAGE = 8;

export default function MedicineTable({ data, userRole }: MedicineTableProps) {
  const medicines = data?.data ?? [];

  // ---- Filter state (notun) ----
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  // ---- Filtered list (notun) ----
  const filteredMedicines = useMemo(() => {
    return medicines.filter((medicine) => {
      const searchLower = search.toLowerCase();
      const searchMatch =
        search === "" ||
        medicine.name.toLowerCase().includes(searchLower) ||
        medicine.manufacturer.toLowerCase().includes(searchLower) ||
        medicine.category?.name?.toLowerCase().includes(searchLower);

      const statusMatch =
        statusFilter === "all" || medicine.status === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [medicines, search, statusFilter]);

  // ---- Pagination (notun) ----
  const totalPages = Math.max(
    1,
    Math.ceil(filteredMedicines.length / ITEMS_PER_PAGE),
  );
  const paginatedMedicines = filteredMedicines.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const resetToFirstPage = () => setPage(1);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this medicine?")) return;

    const toastId = toast.loading("Deleting medicine...");

    try {
      const res = await deleteMedicine(id);

      if (res.error) {
        toast.error("Something went wrong", { id: toastId });
      } else {
        toast.success("Medicine deleted successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong while deleting the medicine.", {
        id: toastId,
      });
    }
  };

  const getRoute = (medicineId?: string, action: "view" | "add" = "view") => {
    if (userRole === "SELLER") {
      return action === "add"
        ? "/seller-dashboard/medicine/add-medicine"
        : `/seller-dashboard/medicine/view/${medicineId}`;
    } else {
      return action === "add"
        ? "/admin-dashboard/medicine/add-medicine"
        : `/admin-dashboard/medicine/view/${medicineId}`;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      {/* Header Section */}
      <div className="mb-6 flex flex-col gap-4 px-1 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Medicine Management
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Total Records: {medicines.length}
          </p>
        </div>

        <Link href={getRoute(undefined, "add")} className="w-full sm:w-auto">
          <Button size="lg" className="w-full px-6 font-semibold shadow-md sm:w-auto">
            <Plus className="mr-2 h-5 w-5" /> Add Medicine
          </Button>
        </Link>
      </div>

      {/* ---- Filter bar (notun) ---- */}
      <div className="mb-4 px-1 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search by name, manufacturer, category..."
          className="border rounded px-3 py-1.5 text-sm w-full sm:w-72"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            resetToFirstPage();
          }}
        />

        <Select
          onValueChange={(value) => {
            setStatusFilter(value);
            resetToFirstPage();
          }}
          defaultValue="all"
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <p className="text-sm text-muted-foreground sm:ml-auto">
          Showing {paginatedMedicines.length} of {filteredMedicines.length}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm sm:shadow-lg">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-215 w-full border-collapse">
            <TableHeader className="bg-muted/40">
              <TableRow className="h-14 sm:h-16">
                <TableHead className="w-[4%] text-center font-semibold">
                  #
                </TableHead>
                <TableHead className="w-[24%] font-semibold">
                  Medicine Name
                </TableHead>
                <TableHead className="hidden w-[16%] font-semibold md:table-cell">
                  Manufacturer
                </TableHead>
                <TableHead className="w-[14%] font-semibold">
                  Category
                </TableHead>
                <TableHead className="hidden w-[12%] font-semibold lg:table-cell">
                  Seller Details
                </TableHead>
                <TableHead className="w-[10%] font-semibold">Status</TableHead>
                <TableHead className="hidden w-[16%] font-semibold lg:table-cell">
                  Inventory Status
                </TableHead>
                <TableHead className="w-[14%] pr-3 text-right font-semibold sm:pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedMedicines.length ? (
                paginatedMedicines.map((medicine, index) => (
                  <TableRow
                    key={medicine.id}
                    className="group h-16 border-b transition-all hover:bg-muted/30"
                  >
                    <TableCell className="text-center text-muted-foreground">
                      {(page - 1) * ITEMS_PER_PAGE + index + 1}
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <span className="font-semibold text-foreground">
                          {medicine.name}
                        </span>
                        <div className="text-sm text-muted-foreground md:hidden">
                          {medicine?.manufacturer?.split(" ").slice(0, 2).join(" ")}
                          {medicine?.manufacturer?.split(" ").length > 2 ? "…" : ""}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      <span className="text-sm font-medium text-foreground">
                        {medicine.manufacturer.split(" ").slice(0, 3).join(" ")}
                        {medicine.manufacturer.split(" ").length > 3 ? "…" : ""}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-secondary-foreground sm:text-xs">
                        {medicine?.category?.name}
                      </span>
                    </TableCell>

                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-2 font-medium">
                        <Store className="h-4 w-4 text-muted-foreground" />
                        {medicine?.seller?.name}
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="text-sm font-semibold">
                        {medicine?.status}
                      </span>
                    </TableCell>

                    <TableCell className="hidden lg:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-semibold">
                            {medicine.stock} pcs
                          </span>
                        </div>
                        <div className="h-1.5 w-28 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full ${medicine.stock > 20 ? "bg-secondary" : "bg-accent"}`}
                            style={{
                              width: `${Math.min(medicine.stock, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="pr-3 text-right sm:pr-6">
                      <div className="flex justify-end gap-2 sm:gap-3">
                        <Link href={getRoute(medicine.id)}>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-9 w-9 border-2 hover:border-primary sm:h-10 sm:w-10"
                          >
                            <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                          </Button>
                        </Link>
                        {userRole === "SELLER" && (
                          <Link href={`/seller-dashboard/medicine/${medicine.id}`}>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-9 w-9 border-2 hover:border-destructive sm:h-10 sm:w-10"
                            >
                              <Pencil className="h-4 w-4 sm:h-5 sm:w-5" />
                            </Button>
                          </Link>
                        )}
                        <Button
                          onClick={() => handleDelete(medicine.id)}
                          size="icon"
                          variant="outline"
                          className="h-9 w-9 border-2 hover:border-destructive sm:h-10 sm:w-10"
                        >
                          <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-64 text-center text-muted-foreground"
                  >
                    No Data Available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ---- Pagination controls (notun) ---- */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}