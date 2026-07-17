import { AppSidebar } from "@/components/layout/app-sidebar";
import { DashboardUserMenu } from "@/components/layout/dashboard-user-menu";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.services";

export const dynamic = "force-dynamic";
export default async function dashboardLayout({
  admin,
  seller,
  customer,
}: {
  admin: React.ReactNode;
  seller: React.ReactNode;
  customer: React.ReactNode;
}) {
  let userInfo = null;
  try {
    const res = await userService.getSession();
    userInfo = res?.data?.user ?? null;
  } catch (err) {
    console.error("Error fetching session:", err);
    userInfo = null;
  }

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          <DashboardUserMenu user={userInfo} />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo ? (
            userInfo.role === Roles.admin ? (
              admin
            ) : userInfo.role === Roles.seller ? (
              seller
            ) : (
              customer
            )
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">User not logged in</p>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
