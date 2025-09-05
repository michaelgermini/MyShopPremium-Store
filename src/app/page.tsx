import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBag, CreditCard, Shield, Truck } from 'lucide-react'
import { SearchBar } from '@/components/search-bar'
import { FeaturedProducts } from '@/components/featured-products'
import { CategoryShowcase } from '@/components/category-showcase'
import { StatsSection } from '@/components/stats-section'
import { SportsShowcase } from '@/components/sports-showcase'

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Modern <span className="text-primary">Store</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Discover our collection of quality products. Secure payment,
            fast delivery and exceptional customer service.
          </p>

          {/* Search Bar */}
          <div className="mb-6 sm:mb-8">
            <SearchBar />
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Button asChild size="lg" className="w-full sm:w-auto px-8">
              <Link href="/products">View Products</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto px-8">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Quality Products</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Rigorous selection of high-quality products
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Secure Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Secure transactions with Stripe
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Express delivery across France
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Satisfaction guaranteed or refund
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Sports Showcase - Highlighting Yoga Mat and Sports Products */}
      <SportsShowcase />

      {/* Category Showcase */}
      <CategoryShowcase />

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground">
            Ready to discover our products?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 px-2">
            Join thousands of satisfied customers
          </p>
          <Button asChild size="lg" className="w-full sm:w-auto px-8 py-3 text-lg">
            <Link href="/products" className="flex items-center justify-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Start Shopping
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2024 MyShop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
