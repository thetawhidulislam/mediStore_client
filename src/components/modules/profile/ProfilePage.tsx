"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Mail,
  Phone,
  Calendar,
  Shield,
  Edit,
  Package,
  ShoppingBag,
  Star,
  CheckCircle,
  CreditCard,
} from "lucide-react";
type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  role?: string;
  status: string;
  phone?: string | null;
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
  _count?: {
    orders: number;
    reviews: number;
    medicines?: number;
  };
  cartItems?: CartItem[];
};

export default function ProfilePageData({ user }: { user: User }) {
  console.log(user);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-secondary/10 text-secondary";
      case "inactive":
        return "bg-destructive/10 text-destructive";
      case "pending":
        return "bg-accent/10 text-accent";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 text-foreground">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">Welcome back to your dashboard</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden border border-border/70 bg-card shadow-lg">
              <div className="h-24 bg-linear-to-r from-primary via-primary/90 to-secondary/80"></div>
              <CardContent className="pt-0">
                {/* Profile Image */}
                <div className="relative -mt-12 mb-4">
                  <div className="w-24 h-24 mx-auto relative">
                    <Image
                      src={user.image}
                      alt={user.name}
                      fill
                      className="rounded-full border-4 border-background object-cover shadow-lg"
                    />
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center mb-6">
                  <h2 className="mb-1 text-xl font-bold text-foreground">
                    {user.name}
                  </h2>
                  <div className="mb-3 flex flex-wrap justify-center gap-2">
                    <Badge variant="secondary">{user?.role || ""}</Badge>
                    <Badge className={getStatusColor(user.status)}>
                      {user?.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    {user?.emailVerified ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-secondary" />
                        <span>Email Verified</span>
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 text-accent" />
                        <span>Email Not Verified</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Edit Button */}
                <Link href="/customer-dashboard/profile/update">
                  <Button className="mb-6 w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </Link>

                {/* Quick Stats */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/50 p-3">
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Orders</p>
                        <p className="font-semibold text-foreground">
                          {user?._count?.orders || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/50 p-3">
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground">Reviews</p>
                        <p className="font-semibold text-foreground">
                          {user?._count?.reviews || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  {user.cartItems && user.cartItems.length > 0 && (
                    <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/50 p-3">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-secondary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Cart Items</p>
                          <p className="font-semibold text-foreground">
                            {user?.cartItems?.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <Card className="border border-border/70 bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Your account details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email Address</p>
                        <p className="font-medium text-foreground">{user.email}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {user.emailVerified ? "Verified" : "Not verified"}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone Number</p>
                        <p className="font-medium text-foreground">
                          {user.phone || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Member Since */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Member Since</p>
                        <p className="font-medium text-foreground">
                          {formatDate(user.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Last Updated */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <CreditCard className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last Updated</p>
                        <p className="font-medium text-foreground">
                          {formatDate(user.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Security */}
            <Card className="border border-border/70 bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Shield className="h-5 w-5" />
                  Account Security
                </CardTitle>
                <CardDescription>
                  Manage your account security settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Email Verification */}
                  <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/50 p-4">
                    <div>
                      <p className="font-medium text-foreground">Email Verification</p>
                      <p className="text-sm text-muted-foreground">
                        {user.emailVerified
                          ? "Your email is verified"
                          : "Verify your email to secure your account"}
                      </p>
                    </div>
                    <Badge
                      className={
                        user.emailVerified
                          ? "bg-secondary/10 text-secondary"
                          : "bg-accent/10 text-accent"
                      }
                    >
                      {user.emailVerified ? "Verified" : "Pending"}
                    </Badge>
                  </div>

                  {/* Account Status */}
                  <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/50 p-4">
                    <div>
                      <p className="font-medium text-foreground">Account Status</p>
                      <p className="text-sm text-muted-foreground">
                        {user.status === "ACTIVE"
                          ? "Your account is active and in good standing"
                          : "Your account needs attention"}
                      </p>
                    </div>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/customer-dashboard/order">
                <Card className="h-full cursor-pointer border border-border/70 bg-card shadow-md transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <ShoppingBag className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">My Orders</h3>
                        <p className="text-sm text-muted-foreground">
                          View and track your orders
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/cart">
                <Card className="h-full cursor-pointer border border-border/70 bg-card shadow-md transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                        <Package className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">My Cart</h3>
                        <p className="text-sm text-muted-foreground">
                          {user.cartItems?.length || 0} item(s) in cart
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
