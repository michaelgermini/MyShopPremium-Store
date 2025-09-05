import { Suspense } from "react";
import { ProductsContent } from "@/components/products-content";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { RecentlyViewed } from "@/components/recently-viewed";
import { ProductsStats } from "@/components/products-stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Star,
  Truck,
  Shield,
  TrendingUp,
  Users,
  Package,
  Sparkles
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Products | E-Commerce Store",
  description: "Discover our collection of quality products. Shop the latest trends with fast shipping and secure checkout.",
  keywords: ["products", "shopping", "e-commerce", "online store"],
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: "Our Products | E-Commerce Store",
    description: "Discover our collection of quality products",
    type: "website",
  },
};

export default function ProductsPage() {
  return (
    <div className="space-y-12">
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 rounded-2xl p-8 md:p-12">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <Badge variant="secondary" className="text-xs">
              ✨ New Collection
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Our Amazing Products
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            Discover our curated collection of premium products. From fashion to electronics,
            find everything you need with exceptional quality and service.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="group">
              <ShoppingBag className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Start Shopping
            </Button>
            <Button variant="outline" size="lg">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Trends
            </Button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full blur-2xl translate-y-24 -translate-x-24"></div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <Package className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">25+</div>
            <div className="text-sm text-muted-foreground">Products</div>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">1K+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">4.8</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <Truck className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">24h</div>
            <div className="text-sm text-muted-foreground">Fast Delivery</div>
          </CardContent>
        </Card>
      </section>

      {/* Popular Categories */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Popular Categories</h2>
          <p className="text-muted-foreground">Explore our most loved product categories</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: "Fashion", icon: "👕", color: "bg-blue-50 text-blue-600" },
            { name: "Electronics", icon: "📱", color: "bg-purple-50 text-purple-600" },
            { name: "Home", icon: "🏠", color: "bg-green-50 text-green-600" },
            { name: "Sports", icon: "⚽", color: "bg-orange-50 text-orange-600" },
            { name: "Accessories", icon: "👜", color: "bg-pink-50 text-pink-600" },
            { name: "Beauty", icon: "💄", color: "bg-red-50 text-red-600" }
          ].map((category) => (
            <Card key={category.name} className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-3 text-2xl group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-sm">{category.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted/30 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Why Shop With Us?</h2>
          <p className="text-muted-foreground">Experience the difference with our premium service</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
            <p className="text-muted-foreground">Your data is protected with enterprise-grade security</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
            <p className="text-muted-foreground">Free delivery on orders over €50, fast and reliable</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
            <p className="text-muted-foreground">100% satisfaction guarantee on all our products</p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Explore All Products</h2>
          <p className="text-muted-foreground">Find exactly what you&apos;re looking for</p>
        </div>

        <ProductsStats />

        {/* Quick Filters */}
        <section className="bg-white border rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Quick Filters</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              🔥 Trending Now
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              💰 Under €50
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              ⭐ Top Rated
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              🚚 Free Shipping
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              🆕 New Arrivals
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              🎯 Best Sellers
            </Button>
          </div>
        </section>

        <Suspense fallback={
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading amazing products...</p>
          </div>
        }>
          <ProductsContent />
        </Suspense>
      </section>

      {/* Recently Viewed */}
      <section className="space-y-6">
        <RecentlyViewed />
      </section>

      {/* Featured Products */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
          <p className="text-muted-foreground">Handpicked selections for you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Featured product cards would go here - for now showing placeholder */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-0">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center">
                <span className="text-4xl">💎</span>
              </div>
              <div className="p-4">
                <Badge className="mb-2">Featured</Badge>
                <h3 className="font-semibold text-sm">Premium Collection</h3>
                <p className="text-sm text-muted-foreground">Exclusive items</p>
                <p className="font-bold text-primary mt-2">From €99.99</p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-0">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 rounded-t-lg flex items-center justify-center">
                <span className="text-4xl">🚀</span>
              </div>
              <div className="p-4">
                <Badge className="mb-2">New</Badge>
                <h3 className="font-semibold text-sm">Latest Arrivals</h3>
                <p className="text-sm text-muted-foreground">Fresh products</p>
                <p className="font-bold text-primary mt-2">From €49.99</p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-0">
              <div className="aspect-square bg-gradient-to-br from-orange-100 to-red-100 rounded-t-lg flex items-center justify-center">
                <span className="text-4xl">⭐</span>
              </div>
              <div className="p-4">
                <Badge className="mb-2">Popular</Badge>
                <h3 className="font-semibold text-sm">Best Sellers</h3>
                <p className="text-sm text-muted-foreground">Customer favorites</p>
                <p className="font-bold text-primary mt-2">From €29.99</p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-0">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-t-lg flex items-center justify-center">
                <span className="text-4xl">🎁</span>
              </div>
              <div className="p-4">
                <Badge className="mb-2">Sale</Badge>
                <h3 className="font-semibold text-sm">Special Offers</h3>
                <p className="text-sm text-muted-foreground">Limited time deals</p>
                <p className="font-bold text-primary mt-2">Up to 50% off</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Stay Updated</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Subscribe to our newsletter and be the first to know about new products and exclusive offers
        </p>
        <div className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-lg border bg-background"
          />
          <Button>Subscribe</Button>
        </div>
      </section>
    </div>
  );
}
