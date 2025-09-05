"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MainNavigation } from "@/components/navigation/main-navigation";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { CartSheet } from "@/components/cart-sheet";
import { WishlistButton } from "@/components/wishlist-button-header";
import { UserMenu } from "@/components/user-menu";
import { SearchBar } from "@/components/search-bar";
import { Package, Heart, ShoppingCart, User, Phone, Truck, HelpCircle, MessageCircle, Search, Menu } from "lucide-react";
import { useCart, useWishlist } from "@/store/cart";
import { CounterBadge } from "./counter-badge";
import { useEffect, useState } from "react";

export function ImprovedHeader() {
  const cartCount = useCart((state) => state.count());
  const wishlistCount = useWishlist((state) => state.count());
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm transition-all duration-300 ${
      isScrolled ? 'bg-background/98 shadow-md' : ''
    }`}>
      {/* Top Bar - Informations générales */}
      <div className={`border-b bg-gradient-to-r from-primary/5 via-muted/50 to-primary/5 transition-transform duration-300 ${
        isScrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}>
        <div className="container mx-auto px-4 py-2.5">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Truck className="h-4 w-4" />
                <span>Free shipping from $50</span>
              </div>
            </div>
            <nav className="flex items-center gap-6" role="navigation" aria-label="Secondary navigation">
              <Link
                href="/help"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label="Get help and support"
              >
                <HelpCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Help</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label="Contact us"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Contact</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Header - Logo, Navigation, Actions */}
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between gap-4 transition-all duration-300 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}>
          {/* Section Logo et Menu Mobile */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <MobileMenu />
            <Link
              href="/"
              className="flex items-center space-x-3 group"
              aria-label="Go to homepage"
            >
              <div className={`bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 ${
                isScrolled ? 'w-10 h-10' : 'w-12 h-12'
              }`}>
                <Package className={`text-primary-foreground transition-all duration-300 ${
                  isScrolled ? 'h-6 w-6' : 'h-7 w-7'
                }`} />
              </div>
              <div className="flex flex-col">
                <span className={`font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent transition-all duration-300 ${
                  isScrolled ? 'text-xl' : 'text-2xl'
                }`}>
                  MyShop
                </span>
                <span className={`text-muted-foreground transition-all duration-300 ${
                  isScrolled ? 'text-xs -mt-1 opacity-70' : 'text-xs -mt-1'
                }`}>
                  Premium Store
                </span>
              </div>
            </Link>
          </div>

          {/* Section Recherche - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="w-full">
              <SearchBar />
            </div>
          </div>

          {/* Section Actions - Desktop */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Bouton Recherche Mobile */}
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden hover:bg-primary/10 transition-colors duration-200"
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Bouton Wishlist avec indicateur */}
            <div className="relative">
              <WishlistButton />
              <CounterBadge count={wishlistCount} />
            </div>

            {/* Bouton Panier avec indicateur */}
            <div className="relative">
              <CartSheet />
              <CounterBadge count={cartCount} />
            </div>

            {/* Menu Utilisateur */}
            <UserMenu />
          </div>
        </div>

        {/* Section Recherche Mobile */}
        <div className="lg:hidden pb-6">
          <SearchBar />
        </div>
      </div>

      {/* Navigation Menu - Desktop */}
      <div className="border-t bg-gradient-to-r from-muted/30 via-background to-muted/30">
        <div className="container mx-auto px-4">
          <MainNavigation />
        </div>
      </div>
    </header>
  );
}
