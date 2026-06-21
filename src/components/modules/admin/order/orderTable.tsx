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
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { Order } from "@/constants/OrdarData";
import { updateOrder } from "@/action/order.action";

type Props = {
  data: Order[];
  userRole: "CUSTOMER" | "SELLER" | "ADMIN";
};

enum paymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  APPROVED = "APPROVED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  REJECTED = "REJECTED",
  CANCEL = "CANCEL",
}

export default function OrderTable({ data, userRole }: Props) {
  const orders = data ?? [];
  const [loadingId, setLoadingId] = useState<string | null>(null);
  console.log(data);
  const handleStatusChange = async (orderId: string, status: paymentStatus) => {
    if (!confirm(`Change status to ${paymentStatus}?`)) return;

    setLoadingId(orderId);
    const toastId = toast.loading("Updating status...");

    try {
      const res = await updateOrder(orderId, { paymentStatus: status });
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

      <div className="overflow-x-auto rounded-xl border">
        <Table className="min-w-[1000px]">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>

              {/* CUSTOMER NAME → ONLY SELLER & ADMIN */}
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
            {orders.length ? (
              orders.map((order, i) => {
                const qty = order?.orderItems?.reduce(
                  (a, b) => a + b.quantity,
                  0,
                );

                const isDelivered =
                  order.paymentStatus === paymentStatus.SHIPPED;
                const isPaid = order.paymentStatus === paymentStatus.PAID;
                const isCanceled = order.paymentStatus === paymentStatus.CANCEL;

                return (
                  <TableRow key={order.id}>
                    <TableCell>{i + 1}</TableCell>

                    {/* CUSTOMER NAME */}
                    {userRole !== "CUSTOMER" && (
                      <TableCell>{order.customer?.name ?? "N/A"}</TableCell>
                    )}

                    {/* MEDICINE NAMES */}
                    <TableCell className="max-w-55">
                      <ul className="space-y-1 text-sm">
                        {order?.orderItems?.map((item) => (
                          <li key={item.id} className="truncate">
                            • {item?.medicines?.name}
                          </li>
                        ))}
                      </ul>
                    </TableCell>

                    <TableCell>{order.paymentGateway}</TableCell>
                    <TableCell>৳ {order.totalPrice}</TableCell>
                    <TableCell>{qty}</TableCell>

                    {/* STATUS */}
                    <TableCell className="flex items-center gap-2">
                      <Store size={16} />
                      <span className="capitalize font-medium">
                        {order.paymentStatus}
                      </span>
                    </TableCell>

                    {/* ACTIONS */}
                    <TableCell className="text-right space-x-2">
                      {/* CUSTOMER */}
                      {userRole === "CUSTOMER" && (
                        <>
                          {!isCanceled && !isDelivered && !isPaid && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              disabled={loadingId === order.id}
                              onClick={() =>
                                handleStatusChange(
                                  order.id as string,
                                  paymentStatus.CANCEL,
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
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <Star size={16} className="mr-1" />
                                Review
                              </Button>
                            </Link>
                          )}
                        </>
                      )}

                      {/* SELLER */}
                      {userRole === "SELLER" && (
                        <select
                          className="border rounded px-2 py-1 text-sm capitalize"
                          value={order.paymentStatus}
                          disabled={loadingId === order.id}
                          onChange={(e) =>
                            handleStatusChange(
                              order.id as string,
                              e.target.value as paymentStatus,
                            )
                          }
                        >
                          {Object.values(paymentStatus)
                            .filter((s) => s !== paymentStatus.CANCEL)
                            .map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                        </select>
                      )}

                      {/* VIEW */}
                      <Link href={getViewLink(order.id as string)}>
                        <Button size="icon" variant="outline">
                          <Eye className="text-blue-600" size={16} />
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
    </div>
  );
}
