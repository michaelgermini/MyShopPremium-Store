"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWishlist } from "@/store/cart";

export function WishlistButton() {
  const { count } = useWishlist();

  return (
    <Button variant="outline" size="icon" asChild className="relative">
      <Link href="/wishlist" aria-label="View wishlist">
        <Heart className="h-5 w-5" />
        {count() > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
            {count()}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
