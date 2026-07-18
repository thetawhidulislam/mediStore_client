"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { MessageSquareText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Medicine } from "@/constants/MedicineData";
import type { categoryOption } from "@/constants/categoryData";

type Props = {
  medicines: Medicine[];
  categories: categoryOption[];
};

type SortOption = "newest" | "price-asc" | "price-desc" | "most-reviewed";

const ITEMS_PER_PAGE = 12;

export default function ShopPage({ medicines, categories }: Props) {
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);

  const filteredMedicines = useMemo(() => {
    const filtered = (medicines ?? []).filter((med) => {
      const categoryMatch =
        category === "all" || med.categoryId?.toString() === category;

      const searchMatch =
        med.name.toLowerCase().includes(search.toLowerCase()) ||
        med.description.toLowerCase().includes(search.toLowerCase());

      const priceMatch =
        (minPrice === "" || med.price >= minPrice) &&
        (maxPrice === "" || med.price <= maxPrice);

      return categoryMatch && searchMatch && priceMatch;
    });

    // Sort — ekta notun array-e sort kori, original prop-ke mutate na kore
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "most-reviewed":
          return (b._count?.reviews ?? 0) - (a._count?.reviews ?? 0);
        case "newest":
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

    return sorted;
  }, [category, search, minPrice, maxPrice, sortBy, medicines]);

  // Filter/sort change hole page 1-e ferot jai — nahole user page 3-e
  // thakte thakte filter change korle empty page dekhte pare
  const resetToFirstPage = () => setPage(1);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMedicines.length / ITEMS_PER_PAGE),
  );
  const currentPageMedicines = filteredMedicines.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Shop All Medicines</h1>

      {/* Filters + Sort */}
      <div className="mb-8 flex flex-wrap gap-4 items-center">
        {/* Search */}
        <input
          type="text"
          placeholder="Search medicines..."
          className="border rounded px-3 py-1 w-64"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            resetToFirstPage();
          }}
        />

        {/* Category */}
        <Select
          onValueChange={(value) => {
            setCategory(value);
            resetToFirstPage();
          }}
          defaultValue="all"
        >
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
          onChange={(e) => {
            setMinPrice(e.target.value ? Number(e.target.value) : "");
            resetToFirstPage();
          }}
        />

        {/* Max Price */}
        <input
          type="number"
          placeholder="Max Price"
          className="border rounded px-3 py-1 w-24"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value ? Number(e.target.value) : "");
            resetToFirstPage();
          }}
        />

        {/* Sort — notun */}
        <Select
          onValueChange={(value) => {
            setSortBy(value as SortOption);
            resetToFirstPage();
          }}
          defaultValue="newest"
        >
          <SelectTrigger className="w-48 ml-auto">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="most-reviewed">Most Reviewed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Showing {currentPageMedicines.length} of {filteredMedicines.length}{" "}
        medicines
      </p>

      {/* Medicines Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentPageMedicines.length > 0 ? (
          currentPageMedicines.map((med) => (
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

                {/* Review count — real data, fake star-fill age remove korlam
                    karon "review" field-e kono real rating value chilo na */}
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MessageSquareText size={14} />
                  <span>{med._count?.reviews ?? 0} reviews</span>
                </div>

                <div className="font-medium text-primary mt-1">
                  ৳ {med.price}
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

      {/* Pagination — notun */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
