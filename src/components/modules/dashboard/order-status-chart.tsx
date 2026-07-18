"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  data: { status: string; count: number }[];
};

// Same semantic mapping we used for badges elsewhere — primary for
// in-progress states, secondary(green) for completed, destructive(red)
// for cancelled/rejected, accent(amber) for pending.
const STATUS_COLORS: Record<string, string> = {
  PENDING: "var(--accent)",
  APPROVED: "var(--primary)",
  PROCESSING: "var(--primary)",
  SHIPPED: "var(--secondary)",
  REJECTED: "var(--destructive)",
  CANCEL: "var(--destructive)",
};

export function OrderStatusChart({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Order Status Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground py-10 text-center">
            No order data yet
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={(entry) => `${entry.name}: ${entry.value}`}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.status}
                    fill={
                      STATUS_COLORS[entry.status] ?? "var(--muted-foreground)"
                    }
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
