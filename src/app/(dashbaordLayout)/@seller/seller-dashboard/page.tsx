import { getDashboardStats } from "@/action/analytics.action";
import { StatCard } from "@/components/modules/dashboard/stat-card";
import { MonthlyOrdersChart } from "@/components/modules/dashboard/monthly-orders-chart";
import { OrderStatusChart } from "@/components/modules/dashboard/order-status-chart";
import { Package, ShoppingCart, Wallet } from "lucide-react";

export default async function SellerDashboard() {
  const { data } = await getDashboardStats();
  const stats = data?.data;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Seller Overview</h2>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="My Medicines" value={stats?.medicineCount ?? 0} icon={Package} />
        <StatCard label="Total Orders" value={stats?.orderCount ?? 0} icon={ShoppingCart} />
        <StatCard
          label="Total Revenue"
          value={`৳ ${stats?.totalRevenue ?? 0}`}
          icon={Wallet}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <MonthlyOrdersChart data={stats?.barChartData ?? []} />
        <OrderStatusChart data={stats?.pieChartData ?? []} />
      </div>
    </div>
  );
}