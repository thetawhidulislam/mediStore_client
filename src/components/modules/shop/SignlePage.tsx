"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  Truck,
  Shield,
  Clock,
  Heart,
  Minus,
  Plus,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMedicineData } from "@/constants/MedicineData";
import { toast } from "sonner";
import { createCart } from "@/action/cart.action";
type Props = {
  medicine: getMedicineData;
  user?: {
    id?: string;
    cartId?: string;
  } | null;
};

export default function MedicineDetailsPage({ medicine, user }: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleAddToCart = async (medicineId: string) => {
    const toastId = toast.loading("Adding to cart...");
    const customerId = user?.id;

    if (!customerId) {
      return toast.error("Please login first", { id: toastId });
    }

    try {
      const res = await createCart({
        customerId,
        medicineId,
        quantity,
      });

      if (res?.error) {
        toast.error("someting gone a wrong", { id: toastId });
      } else {
        toast.success("Added to cart successfully", { id: toastId });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error :any ) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const incrementQuantity = () => {
    if (quantity < medicine.stock) setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "low stock":
        return "bg-accent/10 text-accent border-accent/20";
      case "out of stock":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* IMAGE */}
          <div className="relative aspect-square rounded-xl bg-white shadow border">
            <Image
              src={medicine.image}
              alt={medicine.name}
              fill
              className="object-contain p-6"
              priority
            />

            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? "text-destructive fill-destructive" : "text-gray-600"
                }`}
              />
            </button>
          </div>

          {/* DETAILS */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline">{medicine.category?.name}</Badge>
              <h1 className="text-3xl font-bold mt-2">{medicine.name}</h1>
              <p className="text-gray-600">By {medicine.manufacturer}</p>
            </div>

            {/* RATING */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            <Separator />

            {/* PRICE */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-primary">
                ${medicine.price}
              </span>
              <Badge className={getStatusColor(medicine.status)}>
                {medicine.status}
              </Badge>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-3 gap-4">
              <Feature icon={Truck} label="Free Delivery" />
              <Feature icon={Shield} label="100% Authentic" />
              <Feature
                icon={Clock}
                label={`Expires ${new Date(medicine.expiryDate).toLocaleDateString()}`}
              />
            </div>

            <Separator />

            {/* QUANTITY */}
            <div>
              <p className="font-medium mb-2">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex border rounded">
                  <button onClick={decrementQuantity} className="p-3">
                    <Minus />
                  </button>
                  <input
                    value={quantity}
                    readOnly
                    className="w-16 text-center border-x"
                  />
                  <button onClick={incrementQuantity} className="p-3">
                    <Plus />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {medicine.stock} available
                </span>
              </div>
            </div>

            {/* ADD TO CART */}
            <Button
              size="lg"
              className="w-full h-14"
              disabled={medicine.stock === 0}
              onClick={() => handleAddToCart(medicine.id)}
            >
              {medicine.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>

            {/* SELLER */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-medium">Sold by</p>
              <p>{medicine.seller.name}</p>
              <p className="text-sm text-gray-600">{medicine.seller.email}</p>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <p className="text-gray-700">{medicine.description}</p>
            </TabsContent>

            <TabsContent value="details">
              <ul className="space-y-2">
                <li>Manufacturer: {medicine.manufacturer}</li>
                <li>Stock: {medicine.stock}</li>
                <li>Expiry: {new Date(medicine.expiryDate).toDateString()}</li>
              </ul>
            </TabsContent>
            <TabsContent value="reviews">
              {medicine.reviews?.length ? (
                <div className="space-y-6">
                  {medicine.reviews?.map((review) => (
                    <div
                      key={review.id}
                      className="border rounded-lg p-4 bg-white shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{review.customer.name}</p>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                        </div>

                        <span className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <p className="text-gray-700 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-6">
                  No reviews yet. Be the first to review this product!
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
function Feature({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 p-3 rounded">
      <Icon />

      <span className="text-sm">{label}</span>
    </div>
  );
}
