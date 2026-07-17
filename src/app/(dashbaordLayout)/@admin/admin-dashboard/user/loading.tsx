import { TableSkeleton } from "@/components/ui/table-skeleton";

export default function AdminOrderLoading() {
  return <TableSkeleton rows={8} columns={7} />;
}
