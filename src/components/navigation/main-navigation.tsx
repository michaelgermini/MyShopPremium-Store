"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Gamepad2,
  Shirt,
  Home,
  Car,
  Dumbbell,
  Package
} from "lucide-react";

// Organized categories data
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

// Main links
const mainLinks = [
  { name: "Home", href: "/", description: "Return to home page" },
  { name: "All Products", href: "/products", description: "View all our products" },
  { name: "New Arrivals", href: "/products?sort=newest", description: "Discover the latest products" },
  { name: "Deals", href: "/products?filter=discounted", description: "Enjoy the best offers" },
];

export function MainNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/"
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                pathname === "/" && "bg-accent text-accent-foreground"
              )}
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Categories with sub-menus */}
        {categories.map((category) => (
          <NavigationMenuItem key={category.title}>
            <NavigationMenuTrigger className="flex items-center gap-2">
              <category.icon className="h-4 w-4" />
              {category.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                <div className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href={category.href}
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    >
                      <category.icon className="h-6 w-6" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        {category.title}
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Discover our selection of {category.title.toLowerCase()}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
                {category.subcategories.map((subcategory) => (
                  <NavigationMenuLink key={subcategory.name} asChild>
                    <Link
                      href={subcategory.href}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">
                        {subcategory.name}
                      </div>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}

        {/* Main links */}
        {mainLinks.slice(1).map((link) => (
          <NavigationMenuItem key={link.name}>
            <NavigationMenuLink asChild>
              <Link
                href={link.href}
                className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                  pathname === link.href && "bg-accent text-accent-foreground"
                )}
              >
                {link.name}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
