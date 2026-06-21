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

export type Order = {
  id?: string;
  customer?: Customer;
  paymentGateway?: string;
  totalPrice?: number;
  paymentStatus?:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "CANCEL"
    | "PROCESSING"
    | "PAID"
    | "SHIPPED";

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
  paymentStatus:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "CANCEL"
    | "PROCESSING"
    | "SHIPPED"
    | "PAID";
  orderItems: OrderItemDetails[];
  shippingAddress: string;
  orderDate: string;
  updatedAt: string;
  data?: {
    id: string;
    customer: CustomerDetails;
    paymentGateway: string;
    totalPrice: number;
    paymentStatus:
      | "PENDING"
      | "APPROVED"
      | "REJECTED"
      | "CANCEL"
      | "PROCESSING"
      | "SHIPPED"
      | "PAID";
    orderItems: OrderItemDetails[];
    shippingAddress: string;
    orderDate: string;
    updatedAt: string;
  };
};
