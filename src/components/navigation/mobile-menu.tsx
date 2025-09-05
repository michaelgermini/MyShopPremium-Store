"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Menu,
  ChevronDown,
  ChevronRight,
  Home,
  Smartphone,
  Laptop,
  Headphones,
  Shirt,
  Dumbbell,
  Package,
  Star,
  Percent
} from "lucide-react";

// Mobile menu categories data
const categories = [
  {
    title: "Electronics",
    href: "/products?category=electronics",
    icon: Smartphone,
    subcategories: [
      { name: "Smartphones", href: "/products?category=smartphones" },
      { name: "Computers", href: "/products?category=computers" },
      { name: "Tablets", href: "/products?category=tablets" },
      { name: "Accessories", href: "/products?category=accessories" },
    ],
  },
  {
    title: "Computing",
    href: "/products?category=computers",
    icon: Laptop,
    subcategories: [
      { name: "Laptops", href: "/products?category=laptops" },
      { name: "Desktops", href: "/products?category=desktops" },
      { name: "Peripherals", href: "/products?category=peripherals" },
      { name: "Storage", href: "/products?category=storage" },
    ],
  },
  {
    title: "Audio & Video",
    href: "/products?category=audio-video",
    icon: Headphones,
    subcategories: [
      { name: "Headphones", href: "/products?category=headphones" },
      { name: "Speakers", href: "/products?category=speakers" },
      { name: "Screens", href: "/products?category=screens" },
      { name: "Cameras", href: "/products?category=cameras" },
    ],
  },
  {
    title: "Fashion & Accessories",
    href: "/products?category=fashion",
    icon: Shirt,
    subcategories: [
      { name: "Clothing", href: "/products?category=clothing" },
      { name: "Shoes", href: "/products?category=shoes" },
      { name: "Bags", href: "/products?category=bags" },
      { name: "Jewelry", href: "/products?category=jewelry" },
    ],
  },
  {
    title: "Sports & Leisure",
    href: "/products?category=sports",
    icon: Dumbbell,
    subcategories: [
      { name: "Sport Equipment", href: "/products?category=sport-equipment" },
      { name: "Sportswear", href: "/products?category=sportswear" },
      { name: "Camping", href: "/products?category=camping" },
      { name: "Games", href: "/products?category=games" },
    ],
  },
];

const quickLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "All Products", href: "/products", icon: Package },
  { name: "New Arrivals", href: "/products?sort=newest", icon: Star },
  { name: "Deals", href: "/products?filter=discounted", icon: Percent },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const pathname = usePathname();

  const toggleCategory = (categoryTitle: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryTitle)) {
      newExpanded.delete(categoryTitle);
    } else {
      newExpanded.add(categoryTitle);
    }
    setExpandedCategories(newExpanded);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Main navigation and product categories
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="pb-6">
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={() => setOpen(false)}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">MyShop</span>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 pb-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Navigation
            </h3>
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                  isActive(link.href)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
                onClick={() => setOpen(false)}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          <Separator />

          {/* Categories */}
          <div className="flex-1 overflow-y-auto py-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              Categories
            </h3>

            <div className="space-y-2">
              {categories.map((category) => {
                const isExpanded = expandedCategories.has(category.title);
                const hasActiveSubcategory = category.subcategories.some(sub =>
                  isActive(sub.href)
                );

                return (
                  <div key={category.title}>
                    <button
                      onClick={() => toggleCategory(category.title)}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors",
                        isActive(category.href) || hasActiveSubcategory
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <category.icon className="h-5 w-5" />
                        <span>{category.title}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </button>

                    {isExpanded && (
                      <div className="ml-8 mt-2 space-y-1">
                        {/* Lien vers la catégorie principale */}
                        <Link
                          href={category.href}
                          className={cn(
                            "block px-3 py-2 text-sm rounded-lg transition-colors",
                            isActive(category.href)
                              ? "bg-primary/10 text-primary font-medium"
                              : "hover:bg-muted"
                          )}
                          onClick={() => setOpen(false)}
                        >
                          Voir tout
                        </Link>

                        {/* Sous-catégories */}
                        {category.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory.name}
                            href={subcategory.href}
                            className={cn(
                              "block px-3 py-2 text-sm rounded-lg transition-colors",
                              isActive(subcategory.href)
                                ? "bg-primary/10 text-primary font-medium"
                                : "hover:bg-muted"
                            )}
                            onClick={() => setOpen(false)}
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t">
            <div className="text-center text-sm text-muted-foreground">
              <p>&copy; 2024 MyShop. All rights reserved.</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
