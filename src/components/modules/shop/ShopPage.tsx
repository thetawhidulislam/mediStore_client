"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Medicine = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  review: number; // 1-5
  categoryId: number;
  manufacturer: string; // new field
};

export type Category = {
  id: number;
  name: string;
};

type Props = {
  medicines: Medicine[];
  categories: Category[];
};

export default function ShopPage({ medicines, categories }: Props) {
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const filteredMedicines = useMemo(() => {
    return medicines?.filter((med) => {
      const categoryMatch =
        category === "all" || med.categoryId.toString() === category;

      const searchMatch =
        med.name.toLowerCase().includes(search.toLowerCase()) ||
        med.description.toLowerCase().includes(search.toLowerCase());

      const priceMatch =
        (minPrice === "" || med.price >= minPrice) &&
        (maxPrice === "" || med.price <= maxPrice);

      return categoryMatch && searchMatch && priceMatch;
    });
  }, [category, search, minPrice, maxPrice, medicines]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Shop All Medicines</h1>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4 items-center">
        {/* Search */}
        <input
          type="text"
          placeholder="Search medicines..."
          className="border rounded px-3 py-1 w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category */}
        <Select onValueChange={setCategory} defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categories?.map((cat) => (
              <SelectItem key={cat.id} value={cat.id.toString()}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Min Price */}
        <input
          type="number"
          placeholder="Min Price"
          className="border rounded px-3 py-1 w-24"
          value={minPrice}
          onChange={(e) =>
            setMinPrice(e.target.value ? Number(e.target.value) : "")
          }
        />

        {/* Max Price */}
        <input
          type="number"
          placeholder="Max Price"
          className="border rounded px-3 py-1 w-24"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value ? Number(e.target.value) : "")
          }
        />
      </div>

      {/* Medicines Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredMedicines?.length > 0 ? (
          filteredMedicines?.map((med) => (
            <Card
              key={med.id}
              className="overflow-hidden rounded-xl border border-muted/50 p-4 transition hover:shadow-lg hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 w-full rounded-lg overflow-hidden">
                <Image
                  src={med.image}
                  alt={med.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="mt-4 space-y-2">
                <h3 className="font-semibold">{med.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {med.description}
                </p>

                {/* Review */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 })?.map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < med.review
                          ? "text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>

                <div className="font-medium text-primary mt-1">
                  ${med.price}
                </div>

                <div className="text-sm text-muted-foreground">
                  Manufacturer: {med.manufacturer}
                </div>

                <Link
                  href={`/shop/${med.id}`}
                  className="text-sm text-primary mt-1 inline-block hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center col-span-full text-muted-foreground">
            No medicines found.
          </p>
        )}
      </div>
    </div>
  );
}
