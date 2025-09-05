"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/currency";
import { useCart, WishlistItem } from "@/store/cart";
import { useToast } from "@/hooks/use-toast";
import { WishlistButton } from "@/components/wishlist-button";
import { ProductImage } from "@/components/product-image";
import { QuickAddToCartButton } from "@/components/add-to-cart-button";

export function ProductCard({
  id,
  name,
  price,
  currency,
  image,
  href,
  badge,
  viewMode = "grid",
  description,
}: {
  id: string;
  name: string;
  price: number;
  currency: string;
  image?: string;
  href: string;
  badge?: string;
  viewMode?: "grid" | "list";
  description?: string;
}) {
  const add = useCart((s) => s.add);
  const { toast } = useToast();

  const handleAddToCart = () => {
    add({ id, name, price, currency, image });
    toast({
      title: "Product added",
      description: `${name} has been added to your cart`,
    });
  };

  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <Link href={href} aria-label={`View ${name}`} className="block">
            <div className="product-image-container aspect-square sm:aspect-[4/3] sm:w-48">
              {image && (
                <ProductImage
                  src={image}
                  alt={name}
                  fill
                  context="card"
                  className="transition-transform duration-300 hover:scale-105"
                  objectPosition="center"
                  sizes="(max-width: 640px) 120px, 192px"
                />
              )}
              {badge && (
                <Badge className="absolute top-2 left-2">{badge}</Badge>
              )}
            </div>
          </Link>

          <div className="flex-1 flex flex-col">
            <CardContent className="p-4 flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <Link href={href}>
                    <h3 className="font-medium text-base sm:text-lg hover:underline line-clamp-2">{name}</h3>
                  </Link>
                  {description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {description}
                    </p>
                  )}
                </div>
                <WishlistButton
                  product={{
                    id,
                    name,
                    price,
                    currency,
                    image,
                  }}
                  className="ml-2 flex-shrink-0"
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-primary">
                  {formatPrice(price, currency)}
                </p>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button className="w-full sm:w-auto" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    );
  }

  // Grid view (default)
  return (
    <Card className="product-card">
      <div className="relative">
        {/* Image Link */}
        <Link href={href} aria-label={`View ${name}`} className="block">
          <div className="product-image-container aspect-square">
            {image && (
              <ProductImage
                src={image}
                alt={name}
                fill
                context="card"
                className="transition-transform duration-300 group-hover:scale-110"
                objectPosition="center"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 300px"
              />
            )}
            {badge && (
              <Badge className="absolute top-2 left-2">{badge}</Badge>
            )}
          </div>
        </Link>

        {/* Quick actions overlay - positioned absolutely over the image */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <WishlistButton
            product={{
              id,
              name,
              price,
              currency,
              image,
            }}
            className="bg-white/80 backdrop-blur-sm hover:bg-white"
          />
          <QuickAddToCartButton
            product={{
              id,
              name,
              price,
              currency,
              image,
            }}
            className="bg-white/80 backdrop-blur-sm hover:bg-white"
          />
        </div>
      </div>

      <CardContent className="p-3 sm:p-4 space-y-2">
        <h3 className="font-medium text-sm sm:text-base truncate">{name}</h3>
        <p className="text-sm text-muted-foreground font-semibold">
          {formatPrice(price, currency)}
        </p>
      </CardContent>
      <CardFooter className="p-3 sm:p-4">
        <Button
          variant="outline"
          className="w-full text-sm"
          size="sm"
          asChild
        >
          <Link href={href} className="flex items-center justify-center">
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
