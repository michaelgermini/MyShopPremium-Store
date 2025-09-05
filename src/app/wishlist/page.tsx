import { Suspense } from "react";
import { WishlistContent } from "@/components/wishlist-content";

export default function WishlistPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground">
          Your favorite products saved for later
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-12">Loading wishlist...</div>}>
        <WishlistContent />
      </Suspense>
    </div>
  );
}
