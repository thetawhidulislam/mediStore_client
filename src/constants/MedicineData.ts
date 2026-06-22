export interface MedicineData {
  id?: string | undefined;
  sellerId?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string;
  expiryDate: Date;
  image: string;
  categoryId: number;
  medicineData?: {
    id: string;
  };
}

export interface getMedicineData {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: string;
  manufacturer: string;
  reviews?: {
    customer: {
      name: string;
    };
    id: number;
    comment: string;
    rating: number;
    createdAt: number;
  }[];
  seller: {
    name: string;
    email: string;
    id: string;
  };
  category: {
    name: string;
  };
  expiryDate: string;
  image: string;
  categoryId: number;
  sellerId: string;
}

export type Seller = {
  id: string;
  name: string;
  image?: string | null;
  email: string;
  role: string;
};

export type Review = {
  id: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  comment: string;
  createdAt: string;
};

export type Medicine = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: "ACTIVE" | "INACTIVE";
  manufacturer: string;
  expiryDate: string;
  image: string;
  categoryId: number;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
  reviews?: Review[];
  seller: Seller;
  _count: {
    reviews: number;
    orderItems: number;
  };
};
