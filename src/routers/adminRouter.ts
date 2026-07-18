import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Routers",
    items: [
      {
        title: "Dashboard",
        url: "/admin-dashboard",
      },
      {
        title: "Medicine Management",
        url: "/admin-dashboard/medicine",
      },
      {
        title: "User",
        url: "/admin-dashboard/user",
      },
      {
        title: "Category Management",
        url: "/admin-dashboard/category",
      },
      {
        title: "Order Management",
        url: "/admin-dashboard/order",
      },
      {
        title: "Home",
        url: "/",
      },
    ],
  },
];
