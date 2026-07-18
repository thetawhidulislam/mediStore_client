"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateUserInfo } from "@/action/user.action";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  image: string;
};

export default function EditProfilePage({ user }: { user: User }) {
  const router = useRouter();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone ?? "");
  const [imageUrl, setImageUrl] = useState(user.image);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!name || !email || !imageUrl) {
      toast.error("Name, Email, and Image URL are required!");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Updating profile...");

    try {
      const res = await updateUserInfo({
        id: user.id,
        name,
        email,
        phone,
        image: imageUrl,
      });

      if (res?.error) {
        toast.error("Update failed", { id: toastId });
      } else {
        toast.success("Profile updated successfully", { id: toastId });
        router.push("/customer-dashboard/profile");
      }
    } catch {
      toast.error("Server error", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-bold">Update Profile</h2>

        {/* IMAGE */}
        <div className="flex flex-col items-center gap-4">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={name}
              width={120}
              height={120}
              className="rounded-full border object-cover"
            />
          )}

          <Input
            placeholder="Paste Image URL"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <Input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <Button className="w-full" onClick={handleUpdate} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
