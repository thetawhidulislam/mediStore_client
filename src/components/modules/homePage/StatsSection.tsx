import { Pill, Tags, Star, MessageSquareText } from "lucide-react";

type Props = {
  medicineCount: number;
  categoryCount: number;
  reviewCount: number;
  averageRating: number;
};

export default function StatsSection({
  medicineCount,
  categoryCount,
  reviewCount,
  averageRating,
}: Props) {
  const stats = [
    { label: "Medicines Available", value: `${medicineCount}+`, icon: Pill },
    { label: "Categories Covered", value: `${categoryCount}+`, icon: Tags },
    { label: "Customer Reviews", value: `${reviewCount}+`, icon: MessageSquareText },
    {
      label: "Average Rating",
      value: averageRating ? `${averageRating.toFixed(1)} / 5` : "—",
      icon: Star,
    },
  ];

  return (
    <section className="py-16">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex flex-col items-center text-center rounded-xl border p-6 bg-card"
          >
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Icon className="text-primary" size={22} />
            </div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}