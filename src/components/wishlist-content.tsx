"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/store/cart";
import Link from "next/link";

interface WishlistProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  images: { url: string; alt: string }[];
  category?: { name: string };
}

export function WishlistContent() {
  const { items, clear } = useWishlist();
  const [wishlistProducts, setWishlistProducts] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (items.length === 0) {
        setWishlistProducts([]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/products");
        const allProducts: WishlistProduct[] = await response.json();

        // Filter products that are in the wishlist
        const wishlistProductDetails = allProducts.filter(product =>
          items.some(wishlistItem => wishlistItem.id === product.id)
        );

        setWishlistProducts(wishlistProductDetails);
      } catch (error) {
        console.error("Failed to fetch wishlist products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [items]);

  if (loading) {
    return <div className="text-center py-12">Loading wishlist...</div>;
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="space-y-4">
          <p className="text-muted-foreground text-lg">
            Your wishlist is empty
          </p>
          <p className="text-muted-foreground">
            Add products you like by clicking the heart icon
          </p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {wishlistProducts.length} item{wishlistProducts.length !== 1 ? "s" : ""} in your wishlist
        </p>
        <Button variant="outline" onClick={clear}>
          Clear Wishlist
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            currency={product.currency}
            image={product.images[0]?.url}
            href={`/products/${product.slug}`}
            badge={product.category?.name}
          />
        ))}
      </div>
    </div>
  );
}
