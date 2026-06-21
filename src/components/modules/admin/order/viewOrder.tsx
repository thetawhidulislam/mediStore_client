"use client";

import { SingleOrder } from "@/constants/OrdarData";
import Image from "next/image";

type Props = {
  data: SingleOrder;
};

export default function ViewOrder({ data }: Props) {
  const order = data?.data;
  if (!order) {
    return null;
  }
  const totalQuantity = order?.orderItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Order Details</h1>
          <p className="text-sm text-muted-foreground break-all">
            Order ID: {order?.id}
          </p>
        </div>

        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-700 w-fit">
          {order?.paymentStatus}
        </span>
      </div>

      {/* Customer + Order Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer */}
        <div className="border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-lg">Customer Info</h2>

          <div className="flex items-center gap-4">
            <Image
              src={order.customer.image}
              alt={order.customer.name}
              width={56}
              height={56}
              className="rounded-full object-cover"
            />

            <div>
              <p className="font-medium">{order.customer.name}</p>
              <p className="text-sm text-muted-foreground">
                {order?.customer.email}
              </p>
            </div>
          </div>
        </div>

        {/* Order Info */}
        <div className="border rounded-xl p-6 space-y-3 lg:col-span-2">
          <h2 className="font-semibold text-lg">Order Summary</h2>

          <Info label="Payment Gateway" value={order.paymentGateway} />
          <Info label="Total Price" value={`৳ ${order.totalPrice}`} />
          <Info label="Total Quantity" value={totalQuantity.toString()} />
          <Info
            label="Order Date"
            value={new Date(order?.orderDate).toLocaleString()}
          />
          <Info
            label="Updated At"
            value={new Date(order?.updatedAt).toLocaleString()}
          />
          <Info label="Shipping Address" value={order.shippingAddress} />
        </div>
      </div>

      {/* Items */}
      <div className="border rounded-xl overflow-hidden">
        <h2 className="p-6 font-semibold text-lg border-b">
          Ordered Medicines
        </h2>

        <div className="divide-y">
          {order.orderItems.map((item) => (
            <div
              key={item.id}
              className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <p className="font-medium">{item.medicines.name}</p>
                <p className="text-sm text-muted-foreground">
                  Manufacturer: {item.medicines.manufacturer}
                </p>
              </div>

              <div className="flex gap-6 text-sm">
                <span>Qty: {item.quantity}</span>
                <span>৳ {item.price}</span>
                <span className="font-medium">
                  ৳ {item.price * item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
