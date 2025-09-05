"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  Truck,
  Shield,
  RotateCcw,
  CheckCircle,
  Clock,
  MapPin
} from "lucide-react";

interface ProductSpecificationsProps {
  product: {
    id: string;
    name: string;
    price: number;
    currency: string;
    category?: {
      name: string;
      slug: string;
    } | null;
    createdAt: Date;
  };
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const productAge = Math.floor(
    (new Date().getTime() - new Date(product.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  const specifications = [
  { label: "Reference", value: product.id.slice(-8).toUpperCase() },
  { label: "Category", value: product.category?.name || "Uncategorized" },
  { label: "Price", value: `${(product.price / 100).toFixed(2)} ${product.currency}` },
  { label: "Availability", value: "In Stock", status: "success" },
  { label: "Condition", value: "New", status: "success" },
  { label: "Added", value: `${productAge} days ago` },
];

  const policies = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping from $50 purchase",
    details: "2-3 business days"
  },
  {
    icon: RotateCcw,
    title: "Free Returns",
    description: "Free returns within 30 days",
    details: "General conditions"
  },
  {
    icon: Shield,
    title: "Warranty",
    description: "2-year manufacturer warranty",
    details: "Parts and labor"
  },
  {
    icon: CheckCircle,
    title: "Secure Payment",
    description: "100% secure payment",
    details: "SSL encrypted"
  }
];

  return (
    <div className="space-y-6">
      {/* Spécifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product Specifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specifications.map((spec, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {spec.label}:
                </span>
                <div className="flex items-center gap-2">
                  {spec.status && (
                    <Badge
                      variant={spec.status === "success" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {spec.value}
                    </Badge>
                  )}
                  {!spec.status && (
                    <span className="text-sm font-semibold">{spec.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Policies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Services & Warranties
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {policies.map((policy, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border bg-muted/50">
                <policy.icon className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{policy.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {policy.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {policy.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Important Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Delivery Time</p>
                <p className="text-xs text-muted-foreground">
                  2-3 business days for mainland France
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Package className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Packaging</p>
                <p className="text-xs text-muted-foreground">
                  Secure and eco-friendly packaging
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Satisfaction Guaranteed</p>
                <p className="text-xs text-muted-foreground">
                  Satisfied or refunded within 30 days
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="text-xs text-muted-foreground space-y-2">
            <p>
              <strong>Return conditions:</strong> Unopened product in original packaging
            </p>
            <p>
              <strong>Shipping costs:</strong> Free from $50 purchase
            </p>
            <p>
              <strong>Payment:</strong> Credit card, Visa, Mastercard, PayPal, bank transfer
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
