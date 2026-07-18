"use client";

import { Eye, Trash2, Store } from "lucide-react";
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
import Image from "next/image";
import { deleteUser, updateUserByAdmin } from "@/action/user.action";
import { useMemo, useState } from "react";

type UserRole = "ADMIN" | "CUSTOMER" | "SELLER";
type UserStatus = "ACTIVE" | "INACTIVE";

type User = {
  id?: string;
  name?: string;
  image?: string;
  role?: UserRole;
  phone?: string;
  status?: UserStatus;
};

type Props = {
  data: { data: User[] } | null;
};

const ITEMS_PER_PAGE = 8;

export default function UserTable({ data }: Props) {
  const [users, setUsers] = useState<User[]>(data?.data || []);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchLower = search.toLowerCase();
      const searchMatch =
        search === "" ||
        user.name?.toLowerCase().includes(searchLower) ||
        user.phone?.toLowerCase().includes(searchLower);

      const roleMatch = roleFilter === "all" || user.role === roleFilter;

      return searchMatch && roleMatch;
    });
  }, [users, search, roleFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const resetToFirstPage = () => setPage(1);

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this user?")) return;

    const toastId = toast.loading("Deleting user...");

    try {
      const res = await deleteUser(id);

      if (res?.error) {
        toast.error("Something went wrong", { id: toastId });
      } else {
        setUsers((prev) => prev.filter((u) => u.id !== id));
        toast.success("User deleted successfully", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user", { id: toastId });
    }
  };

  const handleRoleUpdate = async (id: string, role: UserRole) => {
    if (
      !confirm(`Are you sure you want to change this user's role to ${role}?`)
    )
      return;

    const toastId = toast.loading("Updating user role...");

    try {
      const res = await updateUserByAdmin(id, role);

      if (res?.error) {
        toast.error("Something went wrong", { id: toastId });
      } else {
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
        toast.success("User role updated successfully", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user role", { id: toastId });
    }
  };

  const handleStatusUpdate = async (id: string, status: UserStatus) => {
    if (
      !confirm(`Are you sure you want to set this user's status to ${status}?`)
    )
      return;

    const toastId = toast.loading("Updating user status...");

    try {
      const res = await updateUserByAdmin(id, undefined, status);

      if (res?.error) {
        toast.error("Something went wrong", { id: toastId });
      } else {
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, status } : u)),
        );
        toast.success("User status updated successfully", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user status", { id: toastId });
    }
  };

  return (
    <div className="w-full mx-auto px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Total Records: {users.length}
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search by name or phone..."
          className="border rounded px-3 py-1.5 text-sm w-64"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            resetToFirstPage();
          }}
        />

        <Select
          onValueChange={(value) => {
            setRoleFilter(value);
            resetToFirstPage();
          }}
          defaultValue="all"
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="SELLER">Seller</SelectItem>
            <SelectItem value="CUSTOMER">Customer</SelectItem>
          </SelectContent>
        </Select>

        <p className="text-sm text-muted-foreground ml-auto">
          Showing {paginatedUsers.length} of {filteredUsers.length}
        </p>
      </div>

      <div className="rounded-2xl border shadow-md bg-card overflow-hidden">
        <div className="overflow-x-auto w-full">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="h-16">
                <TableHead className="w-[5%] text-center">#</TableHead>
                <TableHead className="w-[10%]">Image</TableHead>
                <TableHead className="w-[15%]">Name</TableHead>
                <TableHead className="w-[15%]">Role</TableHead>
                <TableHead className="w-[20%]">Phone</TableHead>
                <TableHead className="w-[20%]">Status</TableHead>
                <TableHead className="w-[15%] text-right pr-10">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedUsers.length ? (
                paginatedUsers.map((user, index) => (
                  <TableRow
                    key={user.id || index}
                    className="group h-16 hover:bg-muted/20"
                  >
                    <TableCell className="text-center">
                      {(page - 1) * ITEMS_PER_PAGE + index + 1}
                    </TableCell>

                    <TableCell>
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name || "User"}
                          width={40}
                          height={40}
                          className="rounded-full border object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                          {user.name?.[0] ?? "?"}
                        </div>
                      )}
                    </TableCell>

                    <TableCell className="font-medium">
                      {user.name || "N/A"}
                    </TableCell>

                    <TableCell>
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleUpdate(user.id!, e.target.value as UserRole)
                        }
                        className="px-3 py-1 rounded-md border text-xs font-semibold uppercase"
                        disabled={user.role === "ADMIN"}
                      >
                        <option value="ADMIN">ADMIN</option>
                        <option value="SELLER">SELLER</option>
                        <option value="CUSTOMER">CUSTOMER</option>
                      </select>
                    </TableCell>

                    <TableCell className="text-muted-foreground flex items-center gap-2">
                      <Store className="h-4 w-4" />
                      {user.phone || "N/A"}
                    </TableCell>

                    <TableCell>
                      <select
                        value={user.status}
                        onChange={(e) =>
                          handleStatusUpdate(
                            user.id!,
                            e.target.value as UserStatus,
                          )
                        }
                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                          user.status === "ACTIVE"
                            ? "bg-secondary/20 text-secondary"
                            : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                      </select>
                    </TableCell>

                    <TableCell className="text-right pr-8">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin-dashboard/user/${user.id}`}>
                          <Button size="icon" variant="outline">
                            <Eye className="h-5 w-5" />
                          </Button>
                        </Link>
                        <Button
                          size="icon"
                          variant="outline"
                          disabled={user.role === "ADMIN"}
                          onClick={() => handleDelete(user.id)}
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
                    colSpan={7}
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

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
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