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
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { deleteUser, updateUserByAdmin } from "@/action/user.action";
import { useState } from "react";

/* ================= TYPES ================= */

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

/* ================= COMPONENT ================= */

export default function UserTable({ data }: Props) {
  const [users, setUsers] = useState<User[]>(data?.data || []);

  /* ================= DELETE ================= */

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

  /* ================= ROLE UPDATE ================= */

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

  /* ================= STATUS UPDATE ================= */

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
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Total Records: {users.length}
          </p>
        </div>
      </div>

      {/* Table */}
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
              {users.length ? (
                users.map((user, index) => (
                  <TableRow
                    key={user.id || index}
                    className="group h-16 hover:bg-muted/20"
                  >
                    <TableCell className="text-center">{index + 1}</TableCell>

                    <TableCell>
                      {/* <Image
                        src={user.image || "/placeholder.png"}
                        alt={user.name || "User"}
                        width={40}
                        height={40}
                        className="rounded-full border"
                      /> */}
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
                            ? "bg-secondary/10 text-secondary"
                            : "bg-destructive/10 text-destructive"
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
    </div>
  );
}
