"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { SearchBar } from "@/components/search-bar";
import { ProductFilters } from "@/components/product-filters";
import { ProductGridSkeleton } from "@/components/product-skeleton";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  images: { url: string; alt: string }[];
  category?: { name: string };
}

export function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("name-asc");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Filter and sort products function
  const filterAndSortProducts = useCallback(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((product) =>
        product.category?.name === selectedCategory
      );
    }

    // Apply price filter
    filtered = filtered.filter((product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "newest":
          // Since createdAt is not available, sort by name as fallback
          return a.name.localeCompare(b.name);
        case "popular":
          // For now, sort by name as popularity isn't implemented
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  useEffect(() => {
    const filtered = filterAndSortProducts();
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filterAndSortProducts]);

  const categories = Array.from(
    new Set(products.map((product) => product.category?.name).filter(Boolean))
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Price range calculation
  const maxPrice = Math.max(...products.map(p => p.price));
  const minPrice = Math.min(...products.map(p => p.price));

  if (loading) {
    return (
      <div className="space-y-6">
        <SearchBar />
        <div className="space-y-4">
          <ProductFilters
            onSortChange={() => {}}
            onCategoryFilter={() => {}}
            selectedCategory={null}
            categories={[]}
            onPriceRangeChange={() => {}}
            priceRange={[0, 1000]}
            minPrice={0}
            maxPrice={1000}
            onViewModeChange={() => {}}
            viewMode="grid"
          />
        </div>
        <ProductGridSkeleton count={12} viewMode="grid" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SearchBar />

      {products.length > 0 && (
        <div className="space-y-4">
          <ProductFilters
            onSortChange={setSortBy}
            onCategoryFilter={setSelectedCategory}
            selectedCategory={selectedCategory}
            categories={categories}
            onPriceRangeChange={setPriceRange}
            priceRange={priceRange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onViewModeChange={setViewMode}
            viewMode={viewMode}
          />
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchQuery || selectedCategory
              ? `No products found${searchQuery ? ` for "${searchQuery}"` : ""}${selectedCategory ? ` in category "${selectedCategory}"` : ""}.`
              : "No products available at the moment."}
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
              {filteredProducts.length > itemsPerPage && (
                <span className="ml-2">
                  (showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)})
                </span>
              )}
            </p>
            {searchQuery && (
              <p className="text-sm text-muted-foreground">
                Search results for &quot;{searchQuery}&quot;
              </p>
            )}
          </div>

          <div className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}>
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                currency={product.currency}
                image={product.images[0]?.url}
                href={`/products/${product.slug}`}
                badge={product.category?.name}
                viewMode={viewMode}
                description={product.description}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNumber = i + 1;
                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
