"use client";

import Link from "next/link";
import { ChevronRight, Home, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface ProductBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  showHomeIcon?: boolean;
}

export function ProductBreadcrumb({
  items,
  className,
  showHomeIcon = true
}: ProductBreadcrumbProps) {
  return (
    <nav
      className={cn(
        "flex items-center space-x-1 text-sm text-muted-foreground bg-muted/30 px-4 py-3 rounded-lg",
        className
      )}
      aria-label="Breadcrumb"
    >
      {showHomeIcon && (
        <>
          <Link
            href="/"
            className="flex items-center hover:text-foreground transition-colors"
            aria-label="Home"
          >
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
        </>
      )}

      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
          {item.href ? (
            <Link
              href={item.href}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
              {item.label}
            </Link>
          ) : (
            <span className="flex items-center gap-1 text-foreground font-medium">
              {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

// Composant breadcrumb générique pour toute l'application
export function AppBreadcrumb({
  items,
  className
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <nav
      className={cn(
        "flex items-center space-x-1 text-sm text-muted-foreground",
        className
      )}
      aria-label="Breadcrumb"
    >
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-foreground transition-colors"
        aria-label="Home"
      >
        <Package className="h-4 w-4" />
        <span className="font-medium">MyShop</span>
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" />
          {item.href ? (
            <Link
              href={item.href}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
              {item.label}
            </Link>
          ) : (
            <span className="flex items-center gap-1 text-foreground font-medium">
              {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
