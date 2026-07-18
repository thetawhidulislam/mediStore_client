"use client";

import { Store, Eye, XCircle, Star } from "lucide-react";
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
import { Order } from "@/constants/OrdarData";
import { updateOrder } from "@/action/order.action";

type Props = {
  data: Order[];
  userRole: "CUSTOMER" | "SELLER" | "ADMIN";
};

enum OrderStatusEnum {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  REJECTED = "REJECTED",
  CANCEL = "CANCEL",
}

const ITEMS_PER_PAGE = 8;

export default function OrderTable({ data, userRole }: Props) {
  const orders = data ?? [];
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // ---- Filter state (notun) ----
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  // ---- Filtered list (notun) ----
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchLower = search.toLowerCase();

      // Customer naam OR medicine-er naam-e match korle dekhabo
      const searchMatch =
        search === "" ||
        order.customer?.name?.toLowerCase().includes(searchLower) ||
        order.orderItems?.some((item) =>
          item.medicines?.name?.toLowerCase().includes(searchLower),
        );

      const statusMatch = statusFilter === "all" || order.status === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [orders, search, statusFilter]);

  // ---- Pagination (notun) ----
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / ITEMS_PER_PAGE));
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const resetToFirstPage = () => setPage(1);

  const handleStatusChange = async (
    orderId: string,
    status: OrderStatusEnum,
  ) => {
    if (!confirm(`Change status to ${status}?`)) return;

    setLoadingId(orderId);
    const toastId = toast.loading("Updating status...");

    try {
      const res = await updateOrder(orderId, { status });
      res?.error
        ? toast.error("Update failed", { id: toastId })
        : toast.success("Status updated", { id: toastId });
    } catch {
      toast.error("Server error", { id: toastId });
    } finally {
      setLoadingId(null);
    }
  };

  const getViewLink = (id: string) => {
    if (userRole === "CUSTOMER") return `/customer-dashboard/order/${id}`;
    if (userRole === "SELLER") return `/seller-dashboard/order/${id}`;
    return `/admin-dashboard/order/${id}`;
  };

  return (
    <div className="w-full px-4 py-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Orders</h2>
        <p className="text-sm text-muted-foreground">
          Total Orders: {orders.length}
        </p>
      </div>

      {/* ---- Filter bar (notun) ---- */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder={
            userRole === "CUSTOMER"
              ? "Search by medicine..."
              : "Search by customer or medicine..."
          }
          className="border rounded px-3 py-1.5 text-sm w-64"
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
            {Object.values(OrderStatusEnum).map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <p className="text-sm text-muted-foreground ml-auto">
          Showing {paginatedOrders.length} of {filteredOrders.length}
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <Table className="min-w-[1000px]">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>

              {userRole !== "CUSTOMER" && <TableHead>Customer</TableHead>}

              <TableHead>Medicines</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedOrders.length ? (
              paginatedOrders.map((order, i) => {
                const qty = order?.orderItems?.reduce(
                  (a, b) => a + b.quantity,
                  0,
                );

                const isDelivered = order.status === OrderStatusEnum.SHIPPED;
                const isPaid = order.paymentStatus === "PAID";
                const isCanceled = order.status === OrderStatusEnum.CANCEL;

                return (
                  <TableRow key={order.id}>
                    <TableCell>{(page - 1) * ITEMS_PER_PAGE + i + 1}</TableCell>

                    {userRole !== "CUSTOMER" && (
                      <TableCell>{order.customer?.name ?? "N/A"}</TableCell>
                    )}

                    <TableCell className="max-w-55">
                      <ul className="space-y-1 text-sm">
                        {order?.orderItems?.map((item) => (
                          <li key={item.id} className="truncate">
                            • {item?.medicines?.name}
                          </li>
                        ))}
                      </ul>
                    </TableCell>

                    <TableCell>
                      {order.paymentGateway}{" "}
                      <span
                        className={`ml-1 text-xs rounded-full px-2 py-0.5 ${
                          isPaid
                            ? "bg-secondary/10 text-secondary"
                            : "bg-accent/10 text-accent"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </TableCell>
                    <TableCell>৳ {order.totalPrice}</TableCell>
                    <TableCell>{qty}</TableCell>

                    <TableCell className="flex items-center gap-2">
                      <Store size={16} />
                      <span className="capitalize font-medium">
                        {order.status}
                      </span>
                    </TableCell>

                    <TableCell className="text-right space-x-2">
                      {userRole === "CUSTOMER" && (
                        <>
                          {!isCanceled && !isDelivered && !isPaid && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive border-destructive/20 hover:bg-destructive/10"
                              disabled={loadingId === order.id}
                              onClick={() =>
                                handleStatusChange(
                                  order.id as string,
                                  OrderStatusEnum.CANCEL,
                                )
                              }
                            >
                              <XCircle size={16} className="mr-1" />
                              Cancel
                            </Button>
                          )}

                          {isDelivered && (
                            <Link
                              href={`/customer-dashboard/review/${order.id}`}
                            >
                              <Button
                                size="sm"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                              >
                                <Star size={16} className="mr-1" />
                                Review
                              </Button>
                            </Link>
                          )}
                        </>
                      )}

                      {userRole === "SELLER" && (
                        <select
                          className="border rounded px-2 py-1 text-sm capitalize"
                          value={order.status}
                          disabled={loadingId === order.id}
                          onChange={(e) =>
                            handleStatusChange(
                              order.id as string,
                              e.target.value as OrderStatusEnum,
                            )
                          }
                        >
                          {Object.values(OrderStatusEnum)
                            .filter((s) => s !== OrderStatusEnum.CANCEL)
                            .map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                        </select>
                      )}

                      {userRole === "ADMIN" && (
                        <select
                          className="border rounded px-2 py-1 text-sm capitalize"
                          value={order.status}
                          disabled={loadingId === order.id}
                          onChange={(e) =>
                            handleStatusChange(
                              order.id as string,
                              e.target.value as OrderStatusEnum,
                            )
                          }
                        >
                          {Object.values(OrderStatusEnum).map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      )}

                      <Link href={getViewLink(order.id as string)}>
                        <Button size="icon" variant="outline">
                          <Eye className="text-primary" size={16} />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10">
                  No Orders Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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