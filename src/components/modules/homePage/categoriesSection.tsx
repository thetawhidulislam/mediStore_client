"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Pill,
  Thermometer,
  Sparkles,
  HeartPulse,
  Droplet,
  Leaf,
  ShieldPlus,
  Bandage,
  type LucideIcon,
} from "lucide-react";

export type Category = {
  id: number;
  name: string;
  description: string;
};

type Props = {
  categories: Category[];
};

// keyword-based icon match so backend doesn't need an icon field
const iconRules: { keywords: string[]; icon: LucideIcon }[] = [
  { keywords: ["digestive"], icon: Pill },
  { keywords: ["cold", "flu"], icon: Thermometer },
  { keywords: ["skin"], icon: Sparkles },
  { keywords: ["heart", "blood", "pressure"], icon: HeartPulse },
  { keywords: ["diabetes"], icon: Droplet },
  { keywords: ["vitamin", "supplement"], icon: Leaf },
  { keywords: ["antibiotic"], icon: ShieldPlus },
  { keywords: ["pain", "relief"], icon: Bandage },
];

function getCategoryIcon(name: string) {
  const lower = name.toLowerCase();
  const match = iconRules.find((rule) =>
    rule.keywords.some((k) => lower.includes(k)),
  );
  return match?.icon ?? Pill;
}

export default function CategoriesSection({ categories }: Props) {
  return (
    <section className="relative bg-background">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 via-transparent to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-24">
        <div className="mb-16 text-center space-y-4">
          <Badge variant="secondary" className="mx-auto">
            Categories
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Explore by
            <span className="text-primary"> Category</span>
          </h2>

          <p className="mx-auto max-w-xl text-muted-foreground">
            Choose a category to quickly find the medicines you need from
            trusted sellers.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category.name);
            return (
              <Card
                key={category.id}
                className="
                  group relative h-full overflow-hidden rounded-2xl
                  border border-border bg-background/70 p-6 backdrop-blur
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-primary/50
                  hover:shadow-lg
                  dark:border-white/10
                "
              >
                {/* accent line — now actually triggers, since parent has `group` */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/60 to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
                    {category.name}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {category.description}
                  </p>

                  <span className="inline-block text-xs font-medium text-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    View medicines →
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
