import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/product-card";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductGallery } from "@/components/product-gallery";
import { ProductBreadcrumb } from "@/components/product-breadcrumb";
import { ProductTabs } from "@/components/product-tabs";
import { RecentlyViewed, useRecentlyViewed } from "@/components/recently-viewed";
import { Heart, Share2, Star } from "lucide-react";

async function getProduct(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: true,
      category: true,
    },
  });
  return product;
}

async function getRelatedProducts(categoryId: string, currentProductId: string) {
  const products = await prisma.product.findMany({
    where: {
      categoryId,
      id: { not: currentProductId },
    },
    include: {
      images: true,
      category: true,
    },
    take: 4,
  });
  return products;
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = product.categoryId
    ? await getRelatedProducts(product.categoryId, product.id)
    : [];

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    { label: product.category?.name || "Category", href: product.category ? `/products?category=${product.category.slug}` : "/products" },
    { label: product.name }
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumb Navigation */}
      <ProductBreadcrumb items={breadcrumbItems} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Gallery */}
        <ProductGallery
          images={product.images}
          productName={product.name}
        />

        {/* Product Info */}
        <div className="space-y-6">
          {/* Product Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  {product.category && (
                    <Badge variant="secondary">{product.category.name}</Badge>
                  )}
                </div>

                {/* Rating (simulé pour l'exemple) */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(4.8/5 - 24 avis)</span>
                </div>

                <p className="text-3xl font-bold text-primary">
                  {formatPrice(product.price, product.currency)}
                </p>

                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-green-600 font-medium">
                    ✓ In Stock
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Free Shipping
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Favorites
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Quick Description */}
          <div>
            <h2 className="font-semibold mb-2">Quick Description</h2>
            <p className="text-muted-foreground line-clamp-3">
              {product.description}
            </p>
          </div>

          <Separator />

          {/* Add to Cart Section */}
          <div className="space-y-4">
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                currency: product.currency,
                image: product.images[0]?.url,
              }}
              showQuantitySelector={true}
              size="lg"
            />

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Delivery 2-3 days</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Free return 30 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <ProductTabs product={product} reviewsCount={24} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <Separator />
          <div>
            <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  id={relatedProduct.id}
                  name={relatedProduct.name}
                  price={relatedProduct.price}
                  currency={relatedProduct.currency}
                  image={relatedProduct.images[0]?.url}
                  href={`/products/${relatedProduct.slug}`}
                  badge={relatedProduct.category?.name}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recently Viewed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Espace pour contenu supplémentaire si nécessaire */}
        </div>
        <div>
          <RecentlyViewed />
        </div>
      </div>
    </div>
  );
}
