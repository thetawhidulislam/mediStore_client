import { ShieldCheck, Truck, Clock } from "lucide-react";

export function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between bg-primary text-white p-10">
      <div>
        <h1 className="text-3xl font-bold">MediStore</h1>
        <p className="mt-2 text-white/85">Your trusted online pharmacy</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="shrink-0 mt-1" size={22} />
          <div>
            <p className="font-medium">Verified medicines</p>
            <p className="text-sm text-white/75">
              Every product is sourced from licensed manufacturers
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Truck className="shrink-0 mt-1" size={22} />
          <div>
            <p className="font-medium">Fast delivery</p>
            <p className="text-sm text-white/75">
              Get your order delivered to your doorstep quickly
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="shrink-0 mt-1" size={22} />
          <div>
            <p className="font-medium">24/7 support</p>
            <p className="text-sm text-white/75">
              Our team is here whenever you need help
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-white/60">
        © {new Date().getFullYear()} MediStore. All rights reserved.
      </p>
    </div>
  );
}
