"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/store/cart";
import { WishlistItem } from "@/store/cart";

interface WishlistButtonProps {
  product: WishlistItem;
  className?: string;
}

export function WishlistButton({ product, className }: WishlistButtonProps) {
  const { add, remove, has } = useWishlist();
  const isInWishlist = has(product.id);

  const handleToggle = () => {
    if (isInWishlist) {
      remove(product.id);
    } else {
      add(product);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={(e) => {
        e.preventDefault();
        handleToggle();
      }}
      className={`p-2 h-8 w-8 ${className}`}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={`h-4 w-4 ${
          isInWishlist
            ? "fill-red-500 text-red-500"
            : "text-muted-foreground hover:text-red-500"
        }`}
      />
    </Button>
  );
}
