import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  Shield,
  Calendar,
  ShoppingBag,
  Pill,
  Star,
} from "lucide-react";

type User = {
  id?: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
  status?: "ACTIVE" | "INACTIVE" | string;
  emailVerified?: boolean | null;
  phone?: string | null;
  _count?: {
    orders?: number;
    medicines?: number;
    reviews?: number;
  };
  createdAt: string;
  updatedAt: string;
};

export default async function UserDetailsPage({ user }: { user: User }) {

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-6">
        {user.image ? (
          <Image
            src={user.image || "/placeholder.png"}
            alt={user.name}
            width={96}
            height={96}
            className="rounded-full border object-cover"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full border bg-muted text-lg font-semibold text-muted-foreground">
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>

          <div className="flex gap-2 mt-2">
            <Badge variant="secondary">{user.role}</Badge>
            <Badge
              className={
                user.status === "ACTIVE"
                  ? "bg-secondary/10 text-secondary"
                  : "bg-destructive/10 text-destructive"
              }
            >
              {user.status}
            </Badge>
          </div>
        </div>
      </div>

      <Separator />

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoRow icon={<Mail />} label="Email" value={user.email} />
            <InfoRow
              icon={<Shield />}
              label="Email Verified"
              value={user.emailVerified ? "Yes" : "No"}
            />
            <InfoRow
              icon={<Phone />}
              label="Phone"
              value={user.phone || "Not Provided"}
            />
          </CardContent>
        </Card>

        {/* Activity Info */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoRow
              icon={<ShoppingBag />}
              label="Orders"
              value={user._count?.orders ?? 0}
            />
            <InfoRow
              icon={<Pill />}
              label="Medicines"
              value={user._count?.medicines ?? 0}
            />
            <InfoRow
              icon={<Star />}
              label="Reviews"
              value={user._count?.reviews ?? 0}
            />
          </CardContent>
        </Card>
      </div>

      {/* Dates */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoRow
            icon={<Calendar />}
            label="Created At"
            value={new Date(user.createdAt).toLocaleString()}
          />
          <InfoRow
            icon={<Calendar />}
            label="Last Updated"
            value={new Date(user.updatedAt).toLocaleString()}
          />
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------------- Helper Component ---------------- */

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="h-4 w-4">{icon}</span>
        <span>{label}</span>
      </div>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
