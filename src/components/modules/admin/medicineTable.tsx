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
import Link from "next/link";
import { toast } from "sonner";
import { deleteMedicine } from "@/action/medicine.action";
import { getMedicineData } from "@/constants/MedicineData";

interface MedicineTableProps {
  data: { data: getMedicineData[] } | null;
  userRole: "SELLER" | "ADMIN";
}

export default function MedicineTable({ data, userRole }: MedicineTableProps) {
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
    <div className="w-full mx-auto px-8 py-10">
      {/* Header Section */}
      <div className="mb-8 flex items-center justify-between px-2">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Medicine Management
          </h2>
          <p className="text-muted-foreground text-base">
            Total Records: {data?.data.length || 0}
          </p>
        </div>

        <Link href={getRoute(undefined, "add")}>
          <Button size="lg" className="px-6 font-semibold shadow-md">
            <Plus className="mr-2 h-5 w-5" /> Add Medicine
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-xl border shadow-lg bg-card overflow-hidden">
        <div className="overflow-x-auto w-full">
          <Table className="w-full border-collapse">
            <TableHeader className="bg-muted/40">
              <TableRow className="h-16">
                <TableHead className="w-[5%] text-center font-semibold">
                  #
                </TableHead>
                <TableHead className="w-[15%] font-semibold">
                  Medicine Name
                </TableHead>
                <TableHead className="w-[15%] font-semibold">
                  Manufacturer
                </TableHead>
                <TableHead className="w-[15%] font-semibold">
                  Category
                </TableHead>
                <TableHead className="w-[10%] font-semibold">
                  Seller Details
                </TableHead>
                <TableHead className="w-[10%] font-semibold">Status</TableHead>
                <TableHead className="w-[15%] font-semibold">
                  Inventory Status
                </TableHead>
                <TableHead className="w-[15%] text-right pr-10 font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.data.length ? (
                data.data.map((medicine, index) => (
                  <TableRow
                    key={medicine.id}
                    className="group h-16 transition-all hover:bg-muted/30 border-b"
                  >
                    <TableCell className="text-center text-muted-foreground">
                      {index + 1}
                    </TableCell>

                    <TableCell>
                      <span className="font-semibold text-md text-foreground">
                        {medicine.name}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className="font-semibold text-md text-foreground">
                        {medicine.manufacturer.split(" ").slice(0, 3).join(" ")}
                        {medicine.manufacturer.split(" ").length > 3 ? "…" : ""}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-wide">
                        {medicine?.category?.name}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2 font-semibold">
                        <Store className="h-4 w-4 text-muted-foreground" />
                        {medicine?.seller?.name}
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="font-semibold">{medicine?.status}</span>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-semibold">
                            {medicine.stock} pcs
                          </span>
                        </div>
                        <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${medicine.stock > 20 ? "bg-secondary" : "bg-accent"}`}
                            style={{
                              width: `${Math.min(medicine.stock, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-right pr-8">
                      <div className="flex justify-end gap-3">
                        <Link href={getRoute(medicine.id)}>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-10 w-10 border-2 hover:border-primary"
                          >
                            <Eye className="h-5 w-5" />
                          </Button>
                        </Link>
                        {userRole === "SELLER" && (
                          <Link
                            href={`/seller-dashboard/medicine/${medicine.id}`}
                          >
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-10 w-10 border-2 hover:border-destructive"
                            >
                              <Pencil className="h-5 w-5" />
                            </Button>
                          </Link>
                        )}
                        <Button
                          onClick={() => handleDelete(medicine.id)}
                          size="icon"
                          variant="outline"
                          className="h-10 w-10 border-2 hover:border-destructive"
                        >
                          <Trash2 className="h-5 w-5" />
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
    </div>
  );
}
