import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  count?: number;
  columns?: string;
};

export function CardGridSkeleton({
  count = 8,
  columns = "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
}: Props) {
  return (
    <div className={`grid gap-6 ${columns}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}