"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/currency";
import { ProductImage } from "@/components/product-image";
import { Star, ShoppingCart } from "lucide-react";
import { STABLE_IMAGE_URLS } from "@/lib/image-data";

interface FeaturedProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  images: { url: string; alt: string }[];
  category?: { name: string };
  featured?: boolean;
}

// Données d'exemple pour les produits populaires avec des URLs d'images stables
const featuredProducts: FeaturedProduct[] = [
  {
    id: "yoga-mat",
    name: "Premium Yoga Mat",
    slug: "yoga-mat",
    description: "High-quality, non-slip yoga mat perfect for all types of yoga practice. Excellent cushioning and grip.",
    price: 2999,
    currency: "USD",
    images: [
      { url: STABLE_IMAGE_URLS.yogaMat, alt: "Premium Yoga Mat" }
    ],
    category: { name: "Sports" },
    featured: true
  },
  {
    id: "running-shoes",
    name: "Performance Running Shoes",
    slug: "running-shoes",
    description: "Lightweight and comfortable running shoes with superior cushioning and support.",
    price: 8999,
    currency: "USD",
    images: [
      { url: STABLE_IMAGE_URLS.runningShoes, alt: "Running shoes" }
    ],
    category: { name: "Sports" },
    featured: true
  },
  {
    id: "tshirt-logo",
    name: "T-Shirt Logo",
    slug: "tshirt-logo",
    description: "Organic cotton T-shirt with logo. Perfect for casual wear.",
    price: 2499,
    currency: "USD",
    images: [
      { url: STABLE_IMAGE_URLS.tshirt, alt: "T-shirt logo front" }
    ],
    category: { name: "Clothing" },
    featured: true
  },
  {
    id: "iphone-15",
    name: "iPhone 15",
    slug: "iphone-15",
    description: "Latest iPhone with advanced features and stunning camera.",
    price: 99999,
    currency: "USD",
    images: [
      { url: STABLE_IMAGE_URLS.iphone, alt: "iPhone 15" }
    ],
    category: { name: "Electronics" },
    featured: true
  },
  {
    id: "hoodie-zip",
    name: "Hoodie Zip",
    slug: "hoodie-zip",
    description: "Comfortable fleece hoodie with full zip. Great for all seasons.",
    price: 5499,
    currency: "USD",
    images: [
      { url: STABLE_IMAGE_URLS.hoodie, alt: "Hoodie front" }
    ],
    category: { name: "Clothing" },
    featured: true
  },
  {
    id: "macbook-pro",
    name: "MacBook Pro",
    slug: "macbook-pro",
    description: "Powerful laptop for professionals and creatives.",
    price: 199999,
    currency: "USD",
    images: [
      { url: STABLE_IMAGE_URLS.macbook, alt: "MacBook Pro" }
    ],
    category: { name: "Computing" },
    featured: true
  }
];

interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
  maxProducts?: number;
}

export function FeaturedProducts({
  title = "Featured Products",
  subtitle = "Discover our most popular items",
  maxProducts = 6
}: FeaturedProductsProps) {
  const displayedProducts = featuredProducts.slice(0, maxProducts);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">{title}</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {displayedProducts.map((product, index) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                {/* Image Link */}
                <Link href={`/products/${product.slug}`} className="block">
                  <div className="product-image-container aspect-square">
                    {product.images[0] && (
                      <ProductImage
                        src={product.images[0].url}
                        alt={product.images[0].alt}
                        fill
                        context="card"
                        className="product-image"
                        objectPosition="center"
                        priority={index < 2}
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 300px"
                      />
                    )}
                  </div>
                </Link>

                {/* Badge featured */}
                {product.featured && (
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                )}

                {/* Quick actions overlay */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {product.category?.name}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">4.8</span>
                    </div>
                  </div>

                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(product.price, product.currency)}
                    </span>
                    <Link href={`/products/${product.slug}`}>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8 sm:mt-12">
          <Button asChild size="lg" className="w-full sm:w-auto px-6 sm:px-8">
            <Link href="/products" className="flex items-center justify-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
