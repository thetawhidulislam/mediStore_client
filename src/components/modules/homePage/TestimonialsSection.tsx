"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Quote,
  Pill,
} from "lucide-react";

type Review = {
  id: string;
  rating: number;
  comment?: string | null;
  customer?: { name: string } | null;
  medicines?: {
    id?: string;
    name: string;
    image?: string | null;
    price?: number | null;
  } | null;
};

type Props = {
  reviews: Review[];
};

function getInitials(name?: string | null) {
  if (!name) return "VC";
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

export default function TestimonialsSection({ reviews }: Props) {
  const featured = reviews
    .filter((r) => r.comment && r.comment.trim().length > 0 && r.rating >= 4)
    .sort(
      (a, b) =>
        b.rating - a.rating ||
        (b.comment?.length ?? 0) - (a.comment?.length ?? 0),
    )
    .slice(0, 8);

  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const scrollable = el.scrollWidth > el.clientWidth + 4;
    setIsScrollable(scrollable);
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);

    const cardWidth = el.firstElementChild?.clientWidth ?? 1;
    const gap = 20;
    const index = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, featured.length]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth ?? 300;
    el.scrollBy({ left: dir * (cardWidth + 20), behavior: "smooth" });
  };

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth ?? 300;
    el.scrollTo({ left: i * (cardWidth + 20), behavior: "smooth" });
  };

  if (featured.length === 0) return null;

  return (
    <section className="py-20 overflow-hidden">
      <div className="flex items-end justify-between mb-10 px-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
            Verified Reviews
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Real relief, real reviews
          </h2>
        </div>

        {isScrollable && (
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollLeft}
              aria-label="Previous review"
              className="h-10 w-10 rounded-full border flex items-center justify-center transition
                disabled:opacity-30 disabled:cursor-not-allowed
                hover:border-accent hover:text-accent"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollByCard(1)}
              disabled={!canScrollRight}
              aria-label="Next review"
              className="h-10 w-10 rounded-full border flex items-center justify-center transition
                disabled:opacity-30 disabled:cursor-not-allowed
                hover:border-accent hover:text-accent"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        className={`flex gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          isScrollable
            ? "snap-x snap-mandatory scroll-smooth"
            : "justify-center"
        }`}
      >
        {featured.map((review) => (
          <div
            key={review.id}
            className="group relative flex flex-col gap-4 rounded-2xl border bg-card p-6 pt-8
              shrink-0 snap-start w-[85%] sm:w-[340px]
              shadow-sm transition-all duration-300
              hover:shadow-lg hover:-translate-y-1 hover:border-accent/40"
          >
            <div className="absolute -top-3 -right-3 flex items-center gap-1 rounded-full border-2 border-dashed border-accent bg-card px-3 py-1 rotate-[-6deg] shadow-sm">
              <ShieldCheck size={12} className="text-accent" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                Verified
              </span>
            </div>

            <Quote
              size={28}
              className="text-primary/15 -mb-2"
              fill="currentColor"
              strokeWidth={0}
            />

            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star
                  key={s}
                  size={14}
                  className={
                    s < review.rating
                      ? "fill-accent text-accent"
                      : "text-muted-foreground/30"
                  }
                />
              ))}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 min-h-[5.5rem]">
              {review.comment}
            </p>

            {/* product chip */}
            {review.medicines?.name && (
              <Link
                href={
                  review.medicines.id
                    ? `/shop/${review.medicines.id}`
                    : "#"
                }
                className="flex items-center gap-3 rounded-xl border bg-muted/30 p-2.5
                  transition-colors hover:border-accent/50 hover:bg-muted/50"
              >
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-primary/10 flex items-center justify-center">
                  {review.medicines.image ? (
                    <Image
                      src={review.medicines.image}
                      alt={review.medicines.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    <Pill size={16} className="text-primary" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate">
                    {review.medicines.name}
                  </p>
                  {review.medicines.price != null && (
                    <p className="text-xs text-accent font-medium">
                      ৳{review.medicines.price}
                    </p>
                  )}
                </div>
              </Link>
            )}

            <div className="mt-auto pt-4 border-t flex items-center gap-3">
              <div className="flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase">
                {getInitials(review.customer?.name)}
              </div>
              <p className="text-sm font-semibold">
                {review.customer?.name ?? "Verified Customer"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isScrollable && (
        <div className="flex justify-center gap-2 mt-6">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIndex
                  ? "w-6 bg-accent"
                  : "w-1.5 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
