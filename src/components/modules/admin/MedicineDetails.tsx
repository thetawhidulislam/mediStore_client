"use client";

import Image from "next/image";
import { Medicine, Review } from "@/constants/MedicineData";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteReview } from "@/action/review.action";

type Props = {
  data: Medicine;
};

export default function MedicineDetails({ data: medicine }: Props) {
  const [reviews, setReviews] = useState<Review[]>(medicine.reviews || []);

  const handleDeleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    const toastId = toast.loading("Deleting review...");

    try {
      const res = await deleteReview(id);
      if (res?.error) {
        toast.error("Something went wrong", { id: toastId });
      } else {
        setReviews((prev) => prev.filter((r) => r.id !== id));
        toast.success("Review deleted successfully!", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete review", { id: toastId });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Medicine Header */}
      <div className="flex flex-col lg:flex-row gap-6 bg-white border rounded-xl shadow-md p-6">
        {/* Image */}
        <div className="flex-shrink-0 w-full lg:w-64 h-64 relative rounded-xl overflow-hidden bg-gray-100">
          {/* {medicine.image ? (
            // <Image
            //   src={medicine.image}
            //   alt={medicine.name}
            //   fill
            //   className="object-cover"
            // />
          ) : (
            // <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
            //   No Image
            // </div>
          )} */}
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h1 className="text-3xl font-bold">{medicine.name}</h1>
            <p className="text-sm text-muted-foreground mt-2">
              {medicine.description}
            </p>
            <div className="flex flex-wrap gap-3 mt-4 text-sm">
              <span className="bg-gray-100 px-2 py-1 rounded-md">
                Price: ৳ {medicine.price}
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded-md">
                Stock: {medicine.stock}
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded-md">
                Manufacturer: {medicine.manufacturer}
              </span>
              <span
                className={`px-2 py-1 rounded-md font-medium ${
                  medicine.status === "ACTIVE"
                    ? "bg-secondary/10 text-secondary"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {medicine.status}
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded-md">
                Expiry: {new Date(medicine.expiryDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Seller Info */}
      <div className="border rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 bg-white shadow-sm">
        <h2 className="text-lg font-semibold w-full sm:w-auto">Seller Info</h2>
        <div className="flex items-center gap-4">
          {/* {medicine.seller.image ? (
            <Image
              src={medicine.seller.image}
              alt={medicine.seller.name}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-muted-foreground font-medium">
              {medicine.seller.name[0]}
            </div>
          )} */}
          <div>
            <p className="font-medium">{medicine.seller.name}</p>
            <p className="text-sm text-muted-foreground">
              {medicine.seller.email}
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Reviews ({reviews.length})</h2>
        {reviews.length === 0 && (
          <p className="text-sm text-muted-foreground">No reviews yet.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="bg-white border rounded-xl p-4 flex flex-col sm:flex-row sm:justify-between gap-4 shadow-sm hover:shadow-md transition"
            >
              <div>
                <p className="font-medium">
                  {review.customer?.name || "Unknown"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {review.comment}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
              <Button
                size="icon"
                variant="outline"
                className="self-start sm:self-center"
                onClick={() => handleDeleteReview(review.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
