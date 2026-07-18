import { StatCard } from "@/components/modules/dashboard/stat-card";
import { OrderStatusChart } from "@/components/modules/dashboard/order-status-chart";
import { ShoppingCart, Wallet } from "lucide-react";
import { getDashboardStats } from "@/action/analytics.action";

export default async function CustomerDashboard() {
  const { data } = await getDashboardStats();
  const stats = data?.data;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Overview</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          label="My Orders"
          value={stats?.orderCount ?? 0}
          icon={ShoppingCart}
        />
        <StatCard
          label="Total Spent"
          value={`৳ ${stats?.totalSpent ?? 0}`}
          icon={Wallet}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <OrderStatusChart data={stats?.pieChartData ?? []} />
      </div>
    </div>
  );
}
