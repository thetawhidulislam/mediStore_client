"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { deleteCart, updateCartItem } from "@/action/cart.action";

type CartItemProps = {
  id: string;
  medicineId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartPageProps = {
  cartInfo: any;
};

export default function CartPage({ cartInfo }: CartPageProps) {
  // Normalize the data structure
  const normalizeCartData = (data: any) => {
    if (!data) return [];

    if (Array.isArray(data)) {
      return data.map((item) => ({
        id: item.id || "",
        medicineId: item.medicines?.id || item.medicineId || "",
        name: item.medicines?.name || item.name || "Unknown",
        price: Number(item.medicines?.price || item.price || 0),
        image: item.medicines?.image || item.image || "/placeholder.jpg",
        quantity: Number(item.quantity || 1),
      }));
    } else if (data.medicines) {
      // Single item with medicines property
      return [
        {
          id: data.id || "",
          medicineId: data.medicines.id || "",
          name: data.medicines.name || "Unknown",
          price: Number(data.medicines.price || 0),
          image: data.medicines.image || "/placeholder.jpg",
          quantity: Number(data.quantity || 1),
        },
      ];
    } else {
      // Single item without medicines property
      return [
        {
          id: data.id || "",
          medicineId: data.medicineId || "",
          name: data.name || "Unknown",
          price: Number(data.price || 0),
          image: data.image || "/placeholder.jpg",
          quantity: Number(data.quantity || 1),
        },
      ];
    }
  };

  const cart = normalizeCartData(cartInfo);

  // Calculate subtotal safely
  const subtotal = cart.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0,
  );

  const total = subtotal;

  const increaseQty = async (item: CartItemProps) => {
    const toastId = toast.loading("Increasing the item...");
    const updateQty = item.quantity + 1;
    try {
      const res = await updateCartItem(item.id, updateQty);
      if (res?.error) {
        toast.error("Something went wrong", { id: toastId });
      } else {
        toast.success("Cart updated successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const decreaseQty = async (item: CartItemProps) => {
    const toastId = toast.loading("Decreasing the item...");
    const updateQty = item.quantity - 1;

    if (updateQty < 1) {
      toast.error("Minimum quantity is 1", { id: toastId });
      return;
    }

    try {
      const res = await updateCartItem(item.id, updateQty);
      if (res?.error) {
        toast.error("Something went wrong", { id: toastId });
      } else {
        toast.success("Cart updated successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const removeItem = async (id: string) => {
    const toastId = toast.loading("Item remove to cart...");

    try {
      const res = await deleteCart(id);


      if (res?.error) {
        toast.error("someting gone a wrong", { id: toastId });
      } else {
        toast.success("remove to cart successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  if (cart.length === 0 || !cart[0]) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Add some medicines to get started!</p>
        <Button asChild size="lg">
          <Link href="/medicines">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shop Medicines
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Your Cart</h1>
        <div className="w-20 h-1 bg-primary mx-auto"></div>
        <p className="text-gray-500 mt-2">
          {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-100 bg-white flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-primary text-white">
                      ${Number(item.price).toFixed(2)}
                    </Badge>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          {item.name}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Medicine ID: {item.medicineId}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600">Quantity:</span>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => decreaseQty(item)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>

                          <span className="w-12 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => increaseQty(item)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <div className="text-gray-500 text-sm">Total</div>
                        <div className="text-xl font-bold text-primary">
                          $
                          {(Number(item.price) * Number(item.quantity)).toFixed(
                            2,
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Shopping */}
          <div className="mt-8">
            <Button variant="outline" asChild className="w-full">
              <Link href="/medicines">← Continue Shopping</Link>
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-primary/10 to-background rounded-2xl border border-primary/20 p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                {cart.length}
              </span>
              Order Summary
            </h2>

            {/* Summary Items */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Items</span>
                <span className="font-semibold">{cart.length}</span>
              </div>
            </div>

            {/* Total */}
            <div className="mb-6">
              <div className="flex justify-between items-center py-4 border-t border-b border-primary/20">
                <span className="text-lg font-bold">Total</span>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    ${total.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <Button size="lg" className="w-full mb-4" asChild>
              <Link href="/order">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
