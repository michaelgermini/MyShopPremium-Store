"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/currency";
import { ProductImage } from "@/components/product-image";
import { Clock, Eye } from "lucide-react";

interface RecentlyViewedProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  image?: string;
  slug: string;
  viewedAt: Date;
}

const STORAGE_KEY = "recently-viewed-products";
const MAX_RECENT_PRODUCTS = 6;

export function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<RecentlyViewedProduct[]>([]);

  useEffect(() => {
    // Charger les produits récemment consultés depuis le localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRecentProducts(parsed);
      } catch (error) {
        console.error("Error parsing recently viewed products:", error);
      }
    }
  }, []);

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
                  <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Recently Viewed
          </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {recentProducts.slice(0, 6).map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group block"
            >
              <div className="aspect-square relative rounded-lg overflow-hidden bg-muted mb-2">
                {product.image && (
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    fill
                    context="thumbnail"
                    className="object-cover transition-transform group-hover:scale-105"
                    objectPosition="center"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h4>
                <p className="text-sm font-semibold text-primary">
                  {formatPrice(product.price, product.currency)}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>
                    {Math.floor((Date.now() - new Date(product.viewedAt).getTime()) / (1000 * 60 * 60))}h ago
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href="/products">
              View All Products
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Hook pour ajouter un produit aux récemment consultés
export function useRecentlyViewed() {
  const addToRecentlyViewed = (product: {
    id: string;
    name: string;
    price: number;
    currency: string;
    image?: string;
    slug: string;
  }) => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let recentProducts: RecentlyViewedProduct[] = [];

    if (stored) {
      try {
        recentProducts = JSON.parse(stored);
      } catch (error) {
        console.error("Error parsing recently viewed products:", error);
      }
    }

    // Supprimer le produit s'il existe déjà
    recentProducts = recentProducts.filter(p => p.id !== product.id);

    // Ajouter le produit au début
    const newProduct: RecentlyViewedProduct = {
      ...product,
      viewedAt: new Date(),
    };

    recentProducts.unshift(newProduct);

    // Garder seulement les MAX_RECENT_PRODUCTS plus récents
    recentProducts = recentProducts.slice(0, MAX_RECENT_PRODUCTS);

    // Sauvegarder dans le localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentProducts));
  };

  return { addToRecentlyViewed };
}