import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductSkeletonProps {
  viewMode?: "grid" | "list";
}

export function ProductSkeleton({ viewMode = "grid" }: ProductSkeletonProps) {
  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-48">
            <Skeleton className="aspect-[4/3] sm:aspect-[3/2] w-full" />
          </div>

          <div className="flex-1 flex flex-col">
            <CardContent className="p-4 flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full ml-2" />
              </div>
              <Skeleton className="h-6 w-20" />
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Skeleton className="h-10 w-full sm:w-32" />
            </CardFooter>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full" />
      <CardContent className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
      <CardFooter className="p-4">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}

export function ProductGridSkeleton({ count = 12, viewMode = "grid" }: {
  count?: number;
  viewMode?: "grid" | "list";
}) {
  return (
    <div className={`grid gap-6 ${
      viewMode === "grid"
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        : "grid-cols-1"
    }`}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} viewMode={viewMode} />
      ))}
    </div>
  );
}
