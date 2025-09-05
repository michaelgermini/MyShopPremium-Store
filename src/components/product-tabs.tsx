"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductSpecifications } from "@/components/product-specifications";
import { ProductReviews } from "@/components/product-reviews";
import { Separator } from "@/components/ui/separator";
import {
  Info,
  MessageSquare,
  Truck,
  Shield,
  FileText,
  HelpCircle
} from "lucide-react";

interface ProductTabsProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    category?: {
      name: string;
      slug: string;
    } | null;
    createdAt: Date;
  };
  reviewsCount?: number;
}

export function ProductTabs({ product, reviewsCount = 3 }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="description" className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          <span className="hidden sm:inline">Description</span>
        </TabsTrigger>
        <TabsTrigger value="specifications" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">Caractéristiques</span>
        </TabsTrigger>
        <TabsTrigger value="reviews" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Avis ({reviewsCount})</span>
        </TabsTrigger>
        <TabsTrigger value="shipping" className="flex items-center gap-2">
          <Truck className="h-4 w-4" />
          <span className="hidden sm:inline">Livraison</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <Card>
                  <CardHeader>
          <CardTitle>Product Description</CardTitle>
          <CardDescription>
            Discover all the details about {product.name}
          </CardDescription>
        </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg border bg-muted/50">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                                  <h4 className="font-semibold text-sm">Quality Guaranteed</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Authentic and quality product
                  </p>
              </div>
              <div className="text-center p-4 rounded-lg border bg-muted/50">
                <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Fast Delivery</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Shipping within 24-48h
                </p>
              </div>
              <div className="text-center p-4 rounded-lg border bg-muted/50">
                <HelpCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Customer Support</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  7/7 assistance
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="specifications" className="mt-6">
        <ProductSpecifications product={product} />
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <ProductReviews productId={product.id} />
      </TabsContent>

      <TabsContent value="shipping" className="mt-6">
        <Card>
          <CardHeader>
                      <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Shipping Information
          </CardTitle>
          <CardDescription>
            Discover our shipping options and delivery times
          </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Delivery Times</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Mainland France</p>
                      <p className="text-xs text-muted-foreground">Tracked Colissimo</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">2-3 days</p>
                      <p className="text-xs text-muted-foreground">Free &gt; $50</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Europe</p>
                      <p className="text-xs text-muted-foreground">International tracked parcel</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">3-5 days</p>
                      <p className="text-xs text-muted-foreground">From $15</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Worldwide</p>
                      <p className="text-xs text-muted-foreground">International carrier</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">5-10 days</p>
                      <p className="text-xs text-muted-foreground">Price on quote</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Shipping Options</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Truck className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Standard Delivery</p>
                      <p className="text-xs text-muted-foreground">
                        Home delivery with tracking
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Express Delivery</p>
                      <p className="text-xs text-muted-foreground">
                        Delivery within 24h (+$5)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Info className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Pickup Point</p>
                      <p className="text-xs text-muted-foreground">
                        Pickup at partner store
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Important Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p><strong>Preparation:</strong> 24-48h business days</p>
                  <p><strong>Packaging:</strong> Secure and eco-friendly</p>
                  <p><strong>Tracking:</strong> Tracking number provided</p>
                </div>
                <div className="space-y-2">
                  <p><strong>Insurance:</strong> Coverage up to $500</p>
                  <p><strong>Return:</strong> Free within 30 days</p>
                  <p><strong>Contact:</strong> support@myshop.com</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
