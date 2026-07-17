import { CardGridSkeleton } from "@/components/ui/card-grid-skeleton";

export default function ShopLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <CardGridSkeleton count={8} />
    </div>
  );
}
