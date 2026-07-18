"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  relatedMedicines?: getMedicineData[];
};

export default function MedicineDetailsPage({
  medicine,
  user,
  relatedMedicines = [],
}: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { avgRating, reviewCount } = useMemo(() => {
    const reviews = medicine.reviews ?? [];
    if (!reviews.length) return { avgRating: 0, reviewCount: 0 };
    const sum = reviews.reduce((acc, r) => acc + (r.rating ?? 0), 0);
    return { avgRating: sum / reviews.length, reviewCount: reviews.length };
  }, [medicine.reviews]);

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
        toast.error("Something went wrong", { id: toastId });
      } else {
        toast.success("Added to cart successfully", { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const incrementQuantity = () => {
    if (quantity < medicine.stock) setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return {
          badge: "bg-secondary/10 text-secondary border-secondary/20",
          dot: "bg-secondary",
        };
      case "low stock":
        return {
          badge: "bg-accent/15 text-accent-foreground border-accent/30",
          dot: "bg-accent",
        };
      case "out of stock":
        return {
          badge: "bg-destructive/10 text-destructive border-destructive/20",
          dot: "bg-destructive",
        };
      default:
        return {
          badge: "bg-muted text-muted-foreground border-border",
          dot: "bg-muted-foreground",
        };
    }
  };

  const statusStyle = getStatusStyle(medicine.status);

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumb-ish eyebrow */}
        <p className="text-xs tracking-wide uppercase text-muted-foreground mb-6">
          Shop <span className="mx-1.5 text-border">/</span>{" "}
          {medicine.category?.name ?? "Medicine"}
          <span className="mx-1.5 text-border">/</span>
          <span className="text-foreground">{medicine.name}</span>
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* IMAGE */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-card to-muted shadow-sm border border-border overflow-hidden">
              <Image
                src={medicine.image}
                alt={medicine.name}
                fill
                className="object-contain p-10"
                priority
              />

              {medicine.category?.name && (
                <span className="absolute top-4 left-4 text-xs font-medium bg-card/90 backdrop-blur px-3 py-1 rounded-full border border-border text-muted-foreground">
                  {medicine.category.name}
                </span>
              )}

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
                className="absolute top-4 right-4 p-2.5 bg-card/90 backdrop-blur rounded-full shadow-sm border border-border hover:scale-105 transition-transform"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isFavorite
                      ? "text-destructive fill-destructive"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* DETAILS */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {medicine.name}
              </h1>
              <p className="text-muted-foreground mt-1">
                By {medicine.manufacturer}
              </p>
            </div>

            {/* RATING */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(avgRating)
                        ? "fill-accent text-accent"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>
              {reviewCount > 0 ? (
                <span className="text-sm text-muted-foreground">
                  {avgRating.toFixed(1)} · {reviewCount}{" "}
                  {reviewCount === 1 ? "review" : "reviews"}
                </span>
              ) : (
                <span className="text-sm text-muted-foreground">
                  No reviews yet
                </span>
              )}
            </div>

            <Separator />

            {/* PRICE + STATUS */}
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold text-primary">
                ${medicine.price}
              </span>
              <Badge
                variant="outline"
                className={`${statusStyle.badge} gap-1.5 py-1 px-2.5`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}
                />
                {medicine.status}
              </Badge>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-3 gap-3">
              <Feature icon={Truck} label="Free Delivery" tone="secondary" />
              <Feature icon={Shield} label="100% Authentic" tone="primary" />
              <Feature
                icon={Clock}
                label={`Expires ${new Date(
                  medicine.expiryDate,
                ).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}`}
                tone="accent"
              />
            </div>

            <Separator />

            {/* QUANTITY */}
            <div>
              <p className="font-medium mb-2 text-sm">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-full bg-card overflow-hidden">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="p-3 text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    value={quantity}
                    readOnly
                    className="w-12 text-center bg-transparent font-medium outline-none"
                  />
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= medicine.stock}
                    className="p-3 text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {medicine.stock} available
                </span>
              </div>
            </div>

            {/* ADD TO CART */}
            <Button
              size="lg"
              className="w-full h-14 text-base rounded-xl shadow-sm"
              disabled={medicine.stock === 0}
              onClick={() => handleAddToCart(medicine.id)}
            >
              {medicine.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>

            {/* SELLER */}
            <div className="flex items-center gap-3 bg-card border border-border p-4 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold shrink-0">
                {medicine.seller.name?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Sold by</p>
                <p className="font-medium truncate">{medicine.seller.name}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {medicine.seller.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start h-auto p-0 gap-6">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-muted-foreground data-[state=active]:text-foreground"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-muted-foreground data-[state=active]:text-foreground"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-muted-foreground data-[state=active]:text-foreground"
              >
                Reviews {reviewCount > 0 && `(${reviewCount})`}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="pt-6">
              <p className="text-foreground/80 leading-relaxed max-w-2xl">
                {medicine.description}
              </p>
            </TabsContent>

            <TabsContent value="details" className="pt-6">
              <dl className="grid sm:grid-cols-2 gap-4 max-w-2xl">
                <DetailRow label="Manufacturer" value={medicine.manufacturer} />
                <DetailRow label="Stock" value={`${medicine.stock} units`} />
                <DetailRow
                  label="Expiry"
                  value={new Date(medicine.expiryDate).toDateString()}
                />
              </dl>
            </TabsContent>

            <TabsContent value="reviews" className="pt-6">
              {medicine.reviews?.length ? (
                <div className="space-y-4 max-w-2xl">
                  {medicine.reviews?.map((review) => (
                    <div
                      key={review.id}
                      className="border border-border rounded-xl p-4 bg-card"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium text-sm">
                            {review.customer.name}
                          </p>
                          <div className="flex mt-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={
                                  i < review.rating
                                    ? "fill-accent text-accent"
                                    : "text-border"
                                }
                              />
                            ))}
                          </div>
                        </div>

                        <span className="text-xs text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <p className="text-foreground/80 text-sm leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-dashed border-border rounded-xl max-w-2xl">
                  <p className="text-muted-foreground">
                    No reviews yet. Be the first to review this product.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* RELATED ITEMS */}
        {relatedMedicines.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold mb-6">Related items</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedMedicines.map((item) => (
                <RelatedCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RelatedCard({ item }: { item: getMedicineData }) {
  return (
    <Link
      href={`/shop/${item.id}`}
      className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square bg-muted">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain p-6 group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-3">
        <p className="text-sm font-medium truncate">{item.name}</p>
        <p className="text-xs text-muted-foreground truncate">
          {item.manufacturer}
        </p>
        <p className="text-primary font-semibold mt-1">${item.price}</p>
      </div>
    </Link>
  );
}

function Feature({
  icon: Icon,
  label,
  tone = "primary",
}: {
  icon: LucideIcon;
  label: string;
  tone?: "primary" | "secondary" | "accent";
}) {
  const toneStyles = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/15 text-accent-foreground",
  }[tone];

  return (
    <div className="flex flex-col items-start gap-2 p-3 rounded-xl border border-border bg-card">
      <div className={`p-1.5 rounded-lg ${toneStyles}`}>
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-xs leading-tight text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 py-2 border-b border-border">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
