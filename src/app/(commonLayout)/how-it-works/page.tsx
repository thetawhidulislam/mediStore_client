import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Search,
  FileCheck,
  ShoppingCart,
  Truck,
  type LucideIcon,
} from "lucide-react";

export const metadata = {
  title: "How It Works | MediStore",
  description:
    "See how MediStore connects you with verified pharmacies — from search to doorstep delivery.",
};

type Step = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const steps: Step[] = [
  {
    icon: Search,
    title: "Search & Browse",
    desc: "Find the medicine you need by name or category. Every listing shows the verified seller behind it.",
  },
  {
    icon: FileCheck,
    title: "Verify & Select",
    desc: "Check seller details, pricing, and availability. Prescription-required items are flagged clearly before checkout.",
  },
  {
    icon: ShoppingCart,
    title: "Place Your Order",
    desc: "Add items to your order and confirm delivery details. Your order is routed directly to the verified pharmacy.",
  },
  {
    icon: Truck,
    title: "Fast, Safe Delivery",
    desc: "Your pharmacy prepares and ships your order. Track it until it reaches your doorstep.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20">
      <div className="text-center space-y-4 mb-16">
        <Badge variant="secondary" className="mx-auto w-fit">
          How It Works
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          From search to doorstep,
          <span className="text-primary"> in four steps</span>
        </h1>
        <p className="mx-auto max-w-xl text-muted-foreground">
          MediStore keeps every order simple, transparent, and backed by
          verified pharmacies.
        </p>
      </div>

      <div className="relative">
        {/* connecting line, desktop only */}
        <div className="absolute left-1/2 top-10 hidden h-[calc(100%-5rem)] w-px -translate-x-1/2 bg-border dark:bg-white/10 md:block" />

        <div className="space-y-6">
          {steps.map((step, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={step.title}
                className={`flex flex-col gap-6 md:flex-row md:items-center ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="md:w-1/2">
                  <Card className="rounded-2xl border border-border p-6 shadow-sm dark:border-white/10">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <step.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{step.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* step number, desktop only, sits on the connecting line */}
                <div className="hidden md:flex md:w-1/2 md:items-center md:justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary">
                    {i + 1}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
