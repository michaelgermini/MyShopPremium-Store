"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/currency";
import { ProductImage } from "@/components/product-image";
import { Dumbbell, Star, TrendingUp, Heart } from "lucide-react";
import { STABLE_IMAGE_URLS } from "@/lib/image-data";

interface SportsProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  images: { url: string; alt: string }[];
  category: { name: string };
  featured?: boolean;
  rating?: number;
  reviews?: number;
}

// Produits sportifs en vedette
const sportsProducts: SportsProduct[] = [
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
    featured: true,
    rating: 4.8,
    reviews: 124
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
    featured: true,
    rating: 4.9,
    reviews: 89
  },
  {
    id: "dumbbells",
    name: "Adjustable Dumbbells",
    slug: "dumbbells",
    description: "Versatile adjustable dumbbells for home workouts. Perfect for strength training.",
    price: 12999,
    currency: "USD",
    images: [
      { url: STABLE_IMAGE_URLS.dumbbells, alt: "Adjustable Dumbbells" }
    ],
    category: { name: "Sports" },
    featured: true,
    rating: 4.7,
    reviews: 67
  },
  {
    id: "fitness-ball",
    name: "Stability Fitness Ball",
    slug: "fitness-ball",
    description: "Professional stability ball for core exercises and balance training.",
    price: 2499,
    currency: "USD",
    images: [
      { url: STABLE_IMAGE_URLS.fitnessBall, alt: "Fitness Ball" }
    ],
    category: { name: "Sports" },
    featured: true,
    rating: 4.6,
    reviews: 43
  }
];

interface SportsShowcaseProps {
  title?: string;
  subtitle?: string;
  maxProducts?: number;
}

export function SportsShowcase({
  title = "Sports & Fitness",
  subtitle = "Premium equipment for your active lifestyle",
  maxProducts = 4
}: SportsShowcaseProps) {
  const displayedProducts = sportsProducts.slice(0, maxProducts);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Dumbbell className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <Badge variant="secondary" className="text-xs">
                🔥 Most Popular
              </Badge>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">{title}</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {displayedProducts.map((product, index) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
              <div className="relative">
                {/* Image Link */}
                <Link href={`/products/${product.slug}`} className="block">
                  <div className="product-image-container aspect-square bg-gradient-to-br from-green-50 to-blue-50">
                    {product.images[0] && (
                      <ProductImage
                        src={product.images[0].url}
                        alt={product.images[0].alt}
                        fill
                        context="card"
                        className="product-image"
                        objectPosition="center"
                        priority={index === 0}
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 300px"
                      />
                    )}
                  </div>
                </Link>

                {/* Badge featured */}
                {product.featured && (
                  <Badge className="absolute top-3 left-3 bg-green-600 text-white hover:bg-green-700">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}

                {/* Quick actions overlay */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                      {product.category.name}
                    </Badge>
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    )}
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
                      <Button size="sm" variant="outline" className="hover:bg-green-50 hover:border-green-300">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Dumbbell className="h-4 w-4" />
            <span>Get fit and healthy with our premium sports equipment</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/products?category=sports">
                <Dumbbell className="mr-2 h-4 w-4" />
                Shop Sports Equipment
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-green-300 hover:bg-green-50">
              <Link href="/products">
                View All Products
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
