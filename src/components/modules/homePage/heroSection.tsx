"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, ShieldCheck, Truck, Stethoscope } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* subtle background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 to-background" />

      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <Card className="relative overflow-hidden rounded-2xl border-muted/60 p-10 shadow-sm">
            {/* floating accent */}
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              {/* LEFT CONTENT */}
              <div className="space-y-6">
                <Badge variant="secondary" className="w-fit">
                  Trusted Online Pharmacy
                </Badge>

                <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                  Your Health,
                  <br />
                  <span className="text-primary">Delivered with Care</span>
                </h1>

                <p className="max-w-md text-muted-foreground">
                  MediStore makes it easy to order authentic medicines from
                  verified sellers — fast, safe, and reliable.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link href={"/shop"}>
                    <Button size="lg" className="gap-2 cursor-pointer">
                      Browse Medicines
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>

                  <Button size="lg" variant="outline">
                    How It Works
                  </Button>
                </div>
              </div>

              {/* RIGHT FEATURES */}
              <div className="grid gap-4">
                <FeatureItem
                  icon={<ShieldCheck className="h-5 w-5 text-primary" />}
                  title="100% Authentic"
                  desc="All medicines are verified and quality checked."
                />
                <FeatureItem
                  icon={<Truck className="h-5 w-5 text-primary" />}
                  title="Fast Delivery"
                  desc="Quick delivery right to your doorstep."
                />
                <FeatureItem
                  icon={<Stethoscope className="h-5 w-5 text-primary" />}
                  title="Healthcare Ready"
                  desc="Built for pharmacies, sellers, and patients."
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ---------- small reusable feature item ---------- */
type FeatureItemProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

function FeatureItem({ icon, title, desc }: FeatureItemProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border bg-muted/30 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
