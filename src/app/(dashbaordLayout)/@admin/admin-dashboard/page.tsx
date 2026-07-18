import { getDashboardStats } from "@/action/analytics.action";
import { StatCard } from "@/components/modules/dashboard/stat-card";
import { MonthlyOrdersChart } from "@/components/modules/dashboard/monthly-orders-chart";
import { OrderStatusChart } from "@/components/modules/dashboard/order-status-chart";
import { Package, ShoppingCart, Users, Tags, Wallet } from "lucide-react";

export default async function AdminDashboard() {
  const { data } = await getDashboardStats();
  const stats = data?.data;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Overview</h2>

      {/* Overview cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Total Orders" value={stats?.orderCount ?? 0} icon={ShoppingCart} />
        <StatCard label="Total Medicines" value={stats?.medicineCount ?? 0} icon={Package} />
        <StatCard label="Total Users" value={stats?.userCount ?? 0} icon={Users} />
        <StatCard label="Categories" value={stats?.categoryCount ?? 0} icon={Tags} />
        <StatCard
          label="Total Revenue"
          value={`৳ ${stats?.totalRevenue ?? 0}`}
          icon={Wallet}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <MonthlyOrdersChart data={stats?.barChartData ?? []} />
        <OrderStatusChart data={stats?.pieChartData ?? []} />
      </div>
    </div>
  );
}