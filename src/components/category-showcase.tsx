"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/currency";
import { ProductImage } from "@/components/product-image";
import {
  Smartphone,
  Laptop,
  Shirt,
  Dumbbell,
  Home,
  Car,
  Sparkles
} from "lucide-react";
import { STABLE_IMAGE_URLS } from "@/lib/image-data";

interface CategoryProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  image: string;
  category: string;
}

interface CategoryShowcaseProps {
  title?: string;
  subtitle?: string;
}

// Produits représentatifs par catégorie avec des URLs d'images stables
const categoryProducts: Record<string, CategoryProduct[]> = {
  electronics: [
    {
      id: "iphone-15",
      name: "iPhone 15",
      slug: "iphone-15",
      price: 99999,
      currency: "USD",
      image: STABLE_IMAGE_URLS.iphone,
      category: "Electronics"
    },
    {
      id: "airpods",
      name: "AirPods Pro",
      slug: "airpods",
      price: 24999,
      currency: "USD",
      image: STABLE_IMAGE_URLS.airpods,
      category: "Electronics"
    }
  ],
  computing: [
    {
      id: "macbook-pro",
      name: "MacBook Pro",
      slug: "macbook-pro",
      price: 199999,
      currency: "USD",
      image: STABLE_IMAGE_URLS.macbook,
      category: "Computing"
    },
    {
      id: "dell-xps",
      name: "Dell XPS 13",
      slug: "dell-xps-13",
      price: 129999,
      currency: "USD",
      image: STABLE_IMAGE_URLS.dellXps,
      category: "Computing"
    }
  ],
  fashion: [
    {
      id: "tshirt-logo",
      name: "T-Shirt Logo",
      slug: "tshirt-logo",
      price: 2499,
      currency: "USD",
      image: STABLE_IMAGE_URLS.tshirt,
      category: "Fashion"
    },
    {
      id: "hoodie-zip",
      name: "Hoodie Zip",
      slug: "hoodie-zip",
      price: 5499,
      currency: "USD",
      image: STABLE_IMAGE_URLS.hoodie,
      category: "Fashion"
    }
  ],
  sports: [
    {
      id: "yoga-mat",
      name: "Premium Yoga Mat",
      slug: "yoga-mat",
      price: 2999,
      currency: "USD",
      image: STABLE_IMAGE_URLS.yogaMat,
      category: "Sports"
    },
    {
      id: "running-shoes",
      name: "Performance Running Shoes",
      slug: "running-shoes",
      price: 8999,
      currency: "USD",
      image: STABLE_IMAGE_URLS.runningShoes,
      category: "Sports"
    },
    {
      id: "dumbbells",
      name: "Adjustable Dumbbells",
      slug: "dumbbells",
      price: 12999,
      currency: "USD",
      image: STABLE_IMAGE_URLS.dumbbells,
      category: "Sports"
    },
    {
      id: "fitness-ball",
      name: "Stability Fitness Ball",
      slug: "fitness-ball",
      price: 2499,
      currency: "USD",
      image: STABLE_IMAGE_URLS.fitnessBall,
      category: "Sports"
    }
  ]
};

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    icon: Smartphone,
    href: "/products?category=electronics",
    color: "bg-blue-500"
  },
  {
    id: "computing",
    name: "Computing",
    icon: Laptop,
    href: "/products?category=computing",
    color: "bg-purple-500"
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: Shirt,
    href: "/products?category=fashion",
    color: "bg-pink-500"
  },
  {
    id: "sports",
    name: "Sports",
    icon: Dumbbell,
    href: "/products?category=sports",
    color: "bg-green-500"
  }
];

export function CategoryShowcase({
  title = "Shop by Category",
  subtitle = "Explore our curated collections"
}: CategoryShowcaseProps) {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">{title}</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((category) => (
            <div key={category.id} className="space-y-4">
              {/* Category Header */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className={`${category.color} text-white p-6`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <category.icon className="h-8 w-8 mb-2" />
                      <CardTitle className="text-white text-lg">
                        {category.name}
                      </CardTitle>
                    </div>
                    <Sparkles className="h-6 w-6 opacity-80" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <Button asChild variant="outline" className="w-full">
                    <Link href={category.href}>
                      Shop {category.name}
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Featured Products */}
              <div className="space-y-3">
                {categoryProducts[category.id]?.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="block"
                  >
                    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 hover:scale-105">
                      <div className="flex">
                        <div className="w-20 h-20 relative flex-shrink-0">
                          <ProductImage
                            src={product.image}
                            alt={product.name}
                            fill
                            context="thumbnail"
                            className="object-cover"
                            objectPosition="center"
                          />
                        </div>
                        <div className="flex-1 p-3">
                          <h4 className="font-medium text-sm line-clamp-2 mb-1">
                            {product.name}
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-primary">
                              {formatPrice(product.price, product.currency)}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              View
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )) || (
                  <Card className="p-4 text-center text-muted-foreground">
                    <p className="text-sm">More products coming soon</p>
                  </Card>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Discover all our products</span>
          </div>
        </div>
      </div>
    </section>
  );
}
