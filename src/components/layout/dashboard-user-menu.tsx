"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { LogOut, User as UserIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  user: { name?: string; image?: string | null; role?: string } | null;
};

// Role-er upor base kore thik profile route-e niye jai
const profileRouteFor = (role?: string) => {
  if (role === "ADMIN") return "/admin-dashboard/profile";
  if (role === "SELLER") return "/seller-dashboard/profile";
  return "/customer-dashboard/profile";
};

export function DashboardUserMenu({ user }: Props) {
  if (!user) return null;

  const handleLogout = async () => {
    await authClient.signOut();
    // Full reload — same reason as login/signup: guarantees the server
    // layout re-fetches the (now logged-out) session, no stale cache.
    window.location.href = "/";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <img
          src={user.image || "/default-avatar.png"}
          alt={user.name || "User"}
          className="h-9 w-9 rounded-full border border-border object-cover"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="truncate">
          {user.name || "My Account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={profileRouteFor(user.role)} className="cursor-pointer">
            <UserIcon className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
