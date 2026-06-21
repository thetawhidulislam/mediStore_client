import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.services";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  let isAuthenticated = false;
  let isAdmin = false;
  let isSeller = false;
  let isCustomer = false;
  const pathname = request.nextUrl.pathname;

  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.admin;
    isSeller = data.user.role === Roles.seller;
    isCustomer = data.user.role === Roles.customer;
  }
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (!isCustomer && pathname.startsWith("/cart")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (!isCustomer && pathname.startsWith("/order")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isCustomer && pathname.startsWith("/dashobard")) {
    return NextResponse.redirect(
      new URL("/customer-dashboard/profile", request.url),
    );
  }
  if (isCustomer && pathname.startsWith("/profile")) {
    return NextResponse.redirect(
      new URL("/customer-dashboard/profile", request.url),
    );
  }
  if (isSeller && pathname.startsWith("/profile")) {
    return NextResponse.redirect(
      new URL("/seller-dashboard/profile", request.url),
    );
  }
  if (isAdmin && pathname.startsWith("/profile")) {
    return NextResponse.redirect(
      new URL("/admin-dashboard/profile", request.url),
    );
  }
  if (isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }
  if (isSeller && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/seller-dashboard", request.url));
  }
  if (!isSeller && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/customer-dashboard", request.url));
  }
  if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart",
    "/cart/:path*",
    "/order",
    "/order/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/profile",
    "/profile/:path*",
    "/seller-dashboard",
    "/seller-dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
