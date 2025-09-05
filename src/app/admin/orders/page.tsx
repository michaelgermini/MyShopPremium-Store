import { Suspense } from "react";
import { OrdersTable } from "@/components/admin/orders-table";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          Manage customer orders and track their status
        </p>
      </div>

      <Suspense fallback={<OrdersTableSkeleton />}>
        <OrdersTable />
      </Suspense>
    </div>
  );
}

function OrdersTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>
      <div className="border rounded-md">
        <div className="p-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4 py-4 border-b last:border-b-0">
              <Skeleton className="h-4 w-[100px]" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-3 w-[150px]" />
              </div>
              <Skeleton className="h-4 w-[60px]" />
              <Skeleton className="h-8 w-[80px]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
