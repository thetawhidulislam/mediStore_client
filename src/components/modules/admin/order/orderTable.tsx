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

// ✅ Change 1: naam "paymentStatus" theke "OrderStatusEnum" korlam
// (karon eta order-er lifecycle status, payment status na), ar "PAID" shorai disi
// (PAID ekta payment concept, order status na)
enum OrderStatusEnum {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  REJECTED = "REJECTED",
  CANCEL = "CANCEL",
}

export default function OrderTable({ data, userRole }: Props) {
  const orders = data ?? [];
  const [loadingId, setLoadingId] = useState<string | null>(null);
  // ✅ Change 2: console.log(data) shore disi — production code e debug log rakha thik na

  const handleStatusChange = async (
    orderId: string,
    status: OrderStatusEnum,
  ) => {
    // ✅ Change 3: ${paymentStatus} → ${status} (enum-er naam na, actual value dekhabe)
    if (!confirm(`Change status to ${status}?`)) return;

    setLoadingId(orderId);
    const toastId = toast.loading("Updating status...");

    try {
      // ✅ Change 4: { paymentStatus: status } → { status }
      // backend ekhon "status" key khoje, "paymentStatus" na
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
            {orders.length ? (
              orders.map((order, i) => {
                const qty = order?.orderItems?.reduce(
                  (a, b) => a + b.quantity,
                  0,
                );

                // ✅ Change 5: order.paymentStatus → order.status (order lifecycle status alada field)
                const isDelivered = order.status === OrderStatusEnum.SHIPPED;
                // ✅ Change 6: PAID ekhon order.paymentStatus theke check hoy (payment field-e-i thake)
                const isPaid = order.paymentStatus === "PAID";
                const isCanceled = order.status === OrderStatusEnum.CANCEL;

                return (
                  <TableRow key={order.id}>
                    <TableCell>{i + 1}</TableCell>

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

                    {/* ✅ Change 7: Payment column e ekhon gateway naam + PAID/UNPAID badge, duitai dekhay */}
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

                    {/* ✅ Change 8: order.paymentStatus → order.status */}
                    <TableCell className="flex items-center gap-2">
                      <Store size={16} />
                      <span className="capitalize font-medium">
                        {order.status}
                      </span>
                    </TableCell>

                    <TableCell className="text-right space-x-2">
                      {/* CUSTOMER */}
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
                                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                              >
                                <Star size={16} className="mr-1" />
                                Review
                              </Button>
                            </Link>
                          )}
                        </>
                      )}

                      {/* SELLER — cancel korte parbe na, tai CANCEL filter kore bad deya */}
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

                      {/* ✅ Change 9: ADMIN er jonno notun dropdown — age eta chilo-i na, 
                          admin sudhu "Eye" button pেto, status change korte partona */}
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
                          {/* admin CANCEL soho shob option pay, filter nai */}
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
    </div>
  );
}