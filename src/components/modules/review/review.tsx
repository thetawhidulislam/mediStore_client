"use client";

import { useEffect, useState } from "react";
import {
  Star,
  CheckCircle,
  Sparkles,
  MessageSquare,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createReview } from "@/action/review.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/* ---------------- TYPES ---------------- */
type Medicine = {
  id: string;
  name: string;
};

type OrderItem = {
  id: string;
  medicines: Medicine;
};

type Order = {
  id: string;
  customerId: string;
  orderItems: OrderItem[];
};

type Props = {
  data: {
    data: Order | null;
  };
};

/* ---------------- COMPONENT ---------------- */
export default function ReviewPage({ data }: Props) {
  const order = data?.data;
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [medicineId, setMedicineId] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* ✅ AUTO SELECT FIRST MEDICINE */
  useEffect(() => {
    if (order?.orderItems?.length) {
      setMedicineId(order.orderItems[0].medicines.id);
    }
  }, [order]);

  /* ---------------- SUBMIT REVIEW ---------------- */
  const handleSubmit = async () => {
    if (!medicineId || !comment.trim()) {
      toast.error("Please select medicine and write a comment");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Submitting your review...");

    try {
      const res = await createReview({
        medicineId,
        customerId: order!.customerId,
        rating ,
        comment: comment.trim(),
      });

      if (res?.error) {
        toast.error("Somthing go wrong", { id: toastId });
      } else {
        toast.success("Review submitted successfully!", { id: toastId });
        setComment("");
        setSubmitted(true);
      }
    } catch {
      toast.error("Server error", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (!order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-lg text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  // Success state
  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-10 text-center">
            <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Review Submitted!</h2>
            <p className="text-gray-600 mb-8">
              Thank you for sharing your experience. Your feedback helps other
              customers make informed decisions.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full" size="lg">
                <a href="/customer-dashboard/order">Back to Dashboard</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const selectedMedicine = order.orderItems.find(
    (item) => item.medicines.id === medicineId,
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Share Your Feedback
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your honest review helps others make better healthcare decisions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Review Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Write Your Review</CardTitle>
                <CardDescription>
                  Select a product and rate your experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Medicine Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-4 h-4" />
                      Select Medicine
                    </div>
                  </label>
                  <div className="relative">
                    <select
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none"
                      value={medicineId}
                      onChange={(e) => setMedicineId(e.target.value)}
                    >
                      {order.orderItems.map((item) => (
                        <option key={item.id} value={item.medicines.id}>
                          {item.medicines.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  {selectedMedicine && (
                    <p className="text-sm text-gray-500">
                      Reviewing:{" "}
                      <span className="font-medium">
                        {selectedMedicine.medicines.name}
                      </span>
                    </p>
                  )}
                </div>

                {/* Rating Section */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4" />
                      Your Rating
                    </div>
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-2 hover:scale-110 transition-transform"
                          aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
                        >
                          <Star
                            size={36}
                            className={`${
                              star <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            } transition-colors`}
                          />
                        </button>
                      ))}
                      <span className="ml-4 text-xl font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-lg">
                        {rating}.0
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 px-2">
                      <span>Not satisfied</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                </div>

                {/* Comment Section */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4" />
                      Your Review
                    </div>
                  </label>
                  <Textarea
                    placeholder="Tell us about your experience with this medicine. Was it effective? Did you experience any side effects? How was your overall satisfaction?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-35 resize-none border-gray-300 rounded-xl focus:ring-2 focus:ring-primary"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Be specific and honest about your experience</span>
                    <span>{comment.length}/1000 characters</span>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={loading || !medicineId || !comment.trim()}
                  size="lg"
                  className="w-full rounded-xl h-12 text-base font-medium"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting Review...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Submit Review
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Guidelines & Info */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Order Info */}
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Order Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order ID:</span>
                      <span className="font-medium">
                        {order.id.slice(0, 8)}...
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Medicines:</span>
                      <span className="font-medium">
                        {order.orderItems.length}
                      </span>
                    </div>
                    <div className="pt-3 border-t">
                      <p className="text-sm text-gray-500">
                        Thank you for purchasing from us. Your feedback is
                        valuable!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Review Guidelines */}
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Review Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
                      <span className="text-sm text-gray-600">
                        Be honest about your experience
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
                      <span className="text-sm text-gray-600">
                        Include details about effectiveness
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
                      <span className="text-sm text-gray-600">
                        Mention any side effects noticed
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
                      <span className="text-sm text-gray-600">
                        Your review will help others
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
                      <span className="text-sm text-gray-600">
                        Reviews are publicly visible
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Help Text */}
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-primary mb-1">
                      Why your review matters
                    </h4>
                    <p className="text-sm text-primary/80">
                      Your feedback helps improve our products and assists other
                      customers in making informed healthcare decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
