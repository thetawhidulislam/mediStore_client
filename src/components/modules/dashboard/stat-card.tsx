import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  value: string | number;
  icon: LucideIcon;
};

export function StatCard({ label, value, icon: Icon }: Props) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="text-primary" size={20} />
        </div>
      </CardContent>
    </Card>
  );
}
