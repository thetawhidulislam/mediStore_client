import { Route } from "@/types";

export const customerRoutes: Route[] = [
  {
    title: "Customer Routers",
    items: [
      {
        title: "Dashboard",
        url: "/customer-dashboard",
      },
      {
        title: "My Orders",
        url: "/customer-dashboard/order",
      },
      {
        title: "Profile",
        url: "/customer-dashboard/profile",
      },
    ],
  },
];
