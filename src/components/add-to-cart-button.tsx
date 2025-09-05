"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/store/cart";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, ShoppingCart, Loader2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  image?: string;
}

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  showQuantitySelector?: boolean;
  size?: "sm" | "lg";
  variant?: "default" | "outline" | "secondary";
}

export function AddToCartButton({
  product,
  quantity: initialQuantity = 1,
  showQuantitySelector = false,
  size = "lg",
  variant = "default"
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isLoading, setIsLoading] = useState(false);
  const add = useCart((s) => s.add);
  const { toast } = useToast();

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);

      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));

      add(product, quantity);

      toast({
        title: "✅ Product added to cart",
        description: `${quantity} x ${product.name} has been added to your cart`,
      });

      // Reset quantity to 1 after successful addition
      if (showQuantitySelector) {
        setQuantity(1);
      }
    } catch (error) {
      toast({
        title: "❌ Error",
        description: "Failed to add product to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, Math.min(99, value));
    setQuantity(newQuantity);
  };

  if (showQuantitySelector) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1 || isLoading}
            className="h-8 w-8 p-0"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            className="w-12 h-8 text-center border-0 focus-visible:ring-0"
            min="1"
            max="99"
            disabled={isLoading}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= 99 || isLoading}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <Button
          size={size}
          variant={variant}
          onClick={handleAddToCart}
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleAddToCart}
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Adding...
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  );
}

// Quick Add Button for hover effects and quick actions
export function QuickAddToCartButton({
  product,
  size = "sm",
  className = ""
}: {
  product: Product;
  size?: "sm" | "lg";
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const add = useCart((s) => s.add);
  const { toast } = useToast();

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 200));
      add(product, 1);

      toast({
        title: "✅ Added to cart",
        description: `${product.name} added to your cart`,
      });
    } catch (error) {
      toast({
        title: "❌ Error",
        description: "Failed to add product to cart",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size={size}
      onClick={handleQuickAdd}
      disabled={isLoading}
      className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${className}`}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <ShoppingCart className="h-4 w-4" />
      )}
    </Button>
  );
}
