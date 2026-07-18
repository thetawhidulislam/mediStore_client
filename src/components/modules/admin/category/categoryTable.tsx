"use client";

import { Pencil, Trash2, Store, Plus } from "lucide-react";
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
import { useMemo, useState } from "react";
import { deleteCategory } from "@/action/category.action";
import { categoryOption } from "@/constants/categoryData";

type Props = {
  data: { data: categoryOption[] } | null;
};

const ITEMS_PER_PAGE = 8;

export default function CategoryTable({ data }: Props) {
  const allCategories = data?.data ?? [];

  // ---- Filter state (notun) ----
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // ---- Filtered list (notun) ----
  const filteredCategories = useMemo(() => {
    const searchLower = search.toLowerCase();
    return allCategories.filter(
      (category) =>
        search === "" ||
        category.name?.toLowerCase().includes(searchLower) ||
        category.description?.toLowerCase().includes(searchLower),
    );
  }, [allCategories, search]);

  // ---- Pagination (notun) ----
  const totalPages = Math.max(
    1,
    Math.ceil(filteredCategories.length / ITEMS_PER_PAGE),
  );
  const paginatedCategories = filteredCategories.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this category?")) return;

    const toastId = toast.loading("Deleting category...");

    try {
      const res = await deleteCategory(id);

      if (res?.error) {
        toast.error("Something went wrong", { id: toastId });
      } else {
        toast.success("Category deleted successfully", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category", { id: toastId });
    }
  };

  return (
    <div className="w-full mx-auto px-6 py-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Total Records: {allCategories.length}
          </p>
        </div>

        <Link href="/admin-dashboard/category/add-category">
          <Button variant="default" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Category
          </Button>
        </Link>
      </div>

      {/* ---- Filter bar (notun) ---- */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search by name or description..."
          className="border rounded px-3 py-1.5 text-sm w-72"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <p className="text-sm text-muted-foreground ml-auto">
          Showing {paginatedCategories.length} of {filteredCategories.length}
        </p>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border shadow-lg bg-card overflow-hidden">
        <div className="overflow-x-auto w-full">
          <Table className="w-full border-collapse">
            <TableHeader className="bg-muted/40">
              <TableRow className="h-16">
                <TableHead className="w-[5%] text-center font-medium">
                  #
                </TableHead>
                <TableHead className="w-[25%] font-medium">Name</TableHead>
                <TableHead className="w-[35%] font-medium">
                  Description
                </TableHead>
                <TableHead className="w-[15%] font-medium">
                  Total Products
                </TableHead>
                <TableHead className="w-[20%] text-right pr-10 font-medium">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedCategories.length ? (
                paginatedCategories.map((category, index) => (
                  <TableRow
                    key={category.id || index}
                    className="group h-16 hover:bg-muted/20 transition-colors rounded-lg"
                  >
                    {/* Index */}
                    <TableCell className="text-center text-muted-foreground">
                      {(page - 1) * ITEMS_PER_PAGE + index + 1}
                    </TableCell>

                    {/* Name */}
                    <TableCell className="font-medium text-foreground">
                      {category.name || "N/A"}
                    </TableCell>

                    {/* Description */}
                    <TableCell className="text-muted-foreground">
                      {category.description || "N/A"}
                    </TableCell>

                    {/* Total Products */}
                    <TableCell className="text-muted-foreground flex items-center gap-2">
                      <Store className="h-4 w-4" />{" "}
                      {category._count?.Medicines ?? 0}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right pr-8">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin-dashboard/category/update/${category.id}`}
                        >
                          <Button
                            size="icon"
                            variant="outline"
                            className="hover:border-blue-500"
                          >
                            <Pencil className="h-5 w-5 text-blue-500" />
                          </Button>
                        </Link>

                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleDelete(category.id)}
                          className="hover:border-destructive"
                        >
                          <Trash2 className="h-5 w-5 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-64 text-center text-muted-foreground"
                  >
                    No Categories Available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ---- Pagination controls (notun) ---- */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
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
