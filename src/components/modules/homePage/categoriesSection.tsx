"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type Category = {
  id: number;
  name: string;
  description: string;
};

type Props = {
  categories: Category[];
};

export default function CategoriesSection({ categories }: Props) {
  return (
    <section className="relative bg-background">
      {/* subtle background accent */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 via-transparent to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-24">
        {/* Header */}
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

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="
                  h-full overflow-hidden rounded-2xl border border-muted/60
                  bg-background/70 p-6 backdrop-blur
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-primary/50
                  hover:shadow-lg
                "
            >
              {/* accent line */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/60 to-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="space-y-3">
                <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
                  {category.name}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {category.description}
                </p>

                <span className="inline-block text-xs font-medium text-primary/80 opacity-0 transition-opacity group-hover:opacity-100">
                  View medicines →
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
