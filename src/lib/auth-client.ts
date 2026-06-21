import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // baseURL: typeof window !== "undefined" ? window.location.origin : "",
  baseURL: process.env.AUTH_URL ?? "http://localhost:5000",
  fetchOptions: {
    credentials: "include",
  },
});
