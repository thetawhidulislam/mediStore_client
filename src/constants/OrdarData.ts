export type OrderItem = {
  id: string;
  medicines: {
    name: string;
  };
  quantity: number;
};

export type Customer = {
  id: string;
  name: string;
};

// ✅ Notun: OrderStatus ke ekta separate reusable type banaia dilam,
// jate Order ar SingleOrder duitatei baar baar likha na lage
export type OrderStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "PROCESSING"
  | "SHIPPED"
  | "CANCEL";

export type Order = {
  id?: string;
  customer?: Customer;
  paymentGateway?: string;
  totalPrice?: number;

  // ✅ Change 1: order lifecycle status — notun field, "PAID" ekhane nai
  status?: OrderStatus;

  // ✅ Change 2: payment status ekhon nijer alada, shudhu PAID/UNPAID
  paymentStatus?: "PAID" | "UNPAID";

  orderItems?: OrderItem[];
  shippingAddress?: string;
};

export type OrderItemDetails = {
  id: string;
  quantity: number;
  price: number;
  medicines: {
    name: string;
    manufacturer: string;
  };
};

export type CustomerDetails = {
  id: string;
  name: string;
  email: string;
  image: string;
  phone?: string | null;
};

export type SingleOrder = {
  id: string;
  customer: CustomerDetails;
  paymentGateway: string;
  totalPrice: number;

  // ✅ Change 3: same fix — status (lifecycle) + paymentStatus (PAID/UNPAID) alada
  status: OrderStatus;
  paymentStatus: "PAID" | "UNPAID";

  orderItems: OrderItemDetails[];
  shippingAddress: string;
  orderDate: string;
  updatedAt: string;
  data?: {
    id: string;
    customer: CustomerDetails;
    paymentGateway: string;
    totalPrice: number;
    status: OrderStatus;
    paymentStatus: "PAID" | "UNPAID";
    orderItems: OrderItemDetails[];
    shippingAddress: string;
    orderDate: string;
    updatedAt: string;
  };
};
