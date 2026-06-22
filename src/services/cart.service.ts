import { CartData } from "@/constants/CartData";
import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL || env.API_URL;
interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export const CartService = {
  createCart: async (data: CartData) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/cartItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      if (response.error) {
        return {
          data: null,
          error: { error: response.error },
        };
      }

      return { data: response.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "something went wrong", error },
      };
    }
  },
  getCart: async function (id: string, options?: ServiceOptions) {
    try {
      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config.next, tags: ["Cart"] };

      const res = await fetch(`${API_URL}/cart/${id}`, config);
      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "something went wrongs", error },
      };
    }
  },
  getMyCart: async function (options?: ServiceOptions) {
    try {
      const config: RequestInit = {};
      const cookieStore = await cookies();
      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config.next, tags: ["Cart"] };
      config.headers = {
        Cookie: cookieStore.toString(),
      };
      const res = await fetch(`${API_URL}/cart/myCart`, config);
      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "something went wrong", error },
      };
    }
  },

  deleteCartItem: async (id: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/cartItem/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });

      const response = await res.json();

      if (!res.ok || response.error) {
        return {
          data: null,
          error: { message: response.error || "Failed to delete medicine" },
        };
      }

      return { data: response.data || null, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "Something went wrong", error },
      };
    }
  },
  updateCartItem: async (id: string, quantity: number) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/cartItem/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ quantity }),
      });

      const response = await res.json();

      if (!res.ok || response.error) {
        return {
          data: null,
          error: { message: response.error || "Failed to update medicine" },
        };
      }

      return { data: response.data || null, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "Something went wrong", error },
      };
    }
  },
};
