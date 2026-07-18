"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Image from "next/image";

export type Medicine = {
  id: string;
  name: string;
  description: string;
  price: string | number;
  image: string;
  review?: number;
};

type Props = {
  medicines: Medicine[];
};

export default function FeaturedMedicines({ medicines }: Props) {
  const truncateWords = (text: string, limit: number) =>
    text.split(" ").slice(0, limit).join(" ") +
    (text.split(" ").length > limit ? "..." : "");

  return (
    <section className="relative bg-background py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-16 text-center space-y-4">
          <Badge variant="secondary" className="mx-auto">
            Featured
          </Badge>

          <h2 className="text-3xl font-bold md:text-4xl">
            Recent
            <span className="text-primary"> Medicines</span>
          </h2>

          <p className="mx-auto max-w-xl text-muted-foreground">
            Explore the most recently added medicines from trusted pharmacies.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {(medicines ?? []).map((med) => (
            <Link
              key={med.id}
              href={`/shop/${med.id}`}
              className="group relative block"
            >
              <Card className="h-full overflow-hidden rounded-2xl border border-border bg-background/70 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg dark:border-white/10">
                {/* image container gets a solid backdrop so transparent PNGs don't look broken */}
                <div className="relative h-48 w-full overflow-hidden rounded-lg bg-muted/50 dark:bg-white/90">
                  <Image
                    src={med.image ?? "/default-med.png"}
                    alt={med.name ?? "Medicine"}
                    fill
                    style={{ objectFit: "contain" }}
                    className="p-3 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">
                    {med.name ?? "Unnamed Medicine"}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {med.description
                      ? truncateWords(med.description, 20)
                      : "No description available"}
                  </p>

                  {/* only render stars when there's an actual review count, otherwise show a plain label */}
                  {med.review && med.review > 0 ? (
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < med.review!
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      No reviews yet
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                      {med.price != null ? `৳${med.price}` : "N/A"}
                    </span>

                    <span className="text-xs font-medium text-primary/80 opacity-0 transition-opacity group-hover:opacity-100">
                      View details →
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}