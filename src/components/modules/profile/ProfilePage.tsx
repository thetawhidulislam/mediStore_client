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
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Welcome back to your dashboard</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-linear-to-r from-primary to-primary/80 h-24"></div>
              <CardContent className="pt-0">
                {/* Profile Image */}
                <div className="relative -mt-12 mb-4">
                  <div className="w-24 h-24 mx-auto relative">
                    <Image
                      src={user.image}
                      alt={user.name}
                      fill
                      className="rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                  <div className="flex justify-center gap-2 mb-3">
                    <Badge>{user?.role || ""}</Badge>
                    <Badge className={getStatusColor(user.status)}>
                      {user?.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
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
                  <Button className="w-full mb-6">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>

                {/* Quick Stats */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Orders</p>
                        <p className="font-semibold">
                          {user?._count?.orders || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-amber-500" />
                      <div>
                        <p className="text-sm text-gray-600">Reviews</p>
                        <p className="font-semibold">
                          {user?._count?.reviews || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  {user.cartItems && user.cartItems.length > 0 && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-gray-600">Cart Items</p>
                          <p className="font-semibold">
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
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
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
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-medium">{user.email}</p>
                        <p className="text-xs text-gray-500 mt-1">
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
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-medium">
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
                        <p className="text-sm text-gray-500">Member Since</p>
                        <p className="font-medium">
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
                        <p className="text-sm text-gray-500">Last Updated</p>
                        <p className="font-medium">
                          {formatDate(user.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Security */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Account Security
                </CardTitle>
                <CardDescription>
                  Manage your account security settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Email Verification */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Email Verification</p>
                      <p className="text-sm text-gray-600">
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
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Account Status</p>
                      <p className="text-sm text-gray-600">
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
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">My Orders</h3>
                        <p className="text-sm text-gray-600">
                          View and track your orders
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/cart">
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                        <Package className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">My Cart</h3>
                        <p className="text-sm text-gray-600">
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
