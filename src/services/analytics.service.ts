import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL || env.API_URL;

export const analyticsService = {
  getDashboardStats: async function () {
    try {
      const cookieStore = await cookies();
      const config: RequestInit = {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store", // stats shob somoy fresh lagbe, cache kora thik na
      };

      const res = await fetch(`${API_URL}/api/analytics/dashboard`, config);
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "something went wrong", error },
      };
    }
  },
};