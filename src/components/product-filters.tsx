"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Grid3X3, List, X } from "lucide-react";

interface ProductFiltersProps {
  onSortChange: (sort: string) => void;
  onCategoryFilter: (category: string | null) => void;
  selectedCategory: string | null;
  categories: string[];
  onPriceRangeChange: (range: [number, number]) => void;
  priceRange: [number, number];
  minPrice: number;
  maxPrice: number;
  onViewModeChange: (mode: "grid" | "list") => void;
  viewMode: "grid" | "list";
}

export function ProductFilters({
  onSortChange,
  onCategoryFilter,
  selectedCategory,
  categories,
  onPriceRangeChange,
  priceRange,
  minPrice,
  maxPrice,
  onViewModeChange,
  viewMode,
}: ProductFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border rounded-lg p-4 space-y-4">
      {/* Header with view mode toggle */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filters</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewModeChange("grid")}
            className={viewMode === "grid" ? "bg-primary text-primary-foreground" : ""}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewModeChange("list")}
            className={viewMode === "list" ? "bg-primary text-primary-foreground" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator />

      {/* Category Filters */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Category</Label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryFilter(null)}
          >
            All
          </Button>

          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryFilter(category)}
            >
              {category}
            </Button>
          ))}

          {selectedCategory && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {selectedCategory}
              <button
                onClick={() => onCategoryFilter(null)}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">
          Price Range: €{priceRange[0]} - €{priceRange[1]}
        </Label>
        <Slider
          value={priceRange}
          onValueChange={(value) => onPriceRangeChange(value as [number, number])}
          max={maxPrice}
          min={minPrice}
          step={10}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>€{minPrice}</span>
          <span>€{maxPrice}</span>
        </div>
      </div>

      {/* Sort Options */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Sort by</Label>
        <Select onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            <SelectItem value="price-asc">Price (Low to High)</SelectItem>
            <SelectItem value="price-desc">Price (High to Low)</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {(selectedCategory || priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onCategoryFilter(null);
            onPriceRangeChange([minPrice, maxPrice]);
          }}
          className="w-full"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );
}
