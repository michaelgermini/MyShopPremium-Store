"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/currency";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/product-image";

export function CartSheet() {
  const { items, remove, setQty, total, count } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative" aria-label="Open cart">
          <ShoppingCart className="h-5 w-5" />
          {count() > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
              {count()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your cart ({count()} item{count() !== 1 ? "s" : ""})</SheetTitle>
          <SheetDescription>
            Review your items and proceed to checkout
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-auto divide-y">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground text-center">
                Your cart is empty
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-4">
                {item.image && (
                  <div className="relative h-16 w-16 rounded overflow-hidden">
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatPrice(item.price, item.currency)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQty(item.id, item.qty - 1)}
                      disabled={item.qty <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm w-8 text-center">{item.qty}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQty(item.id, item.qty + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(item.id)}
                      className="ml-auto text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Total</span>
              <span className="font-medium">{formatPrice(total())}</span>
            </div>
            <Button asChild className="w-full">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
