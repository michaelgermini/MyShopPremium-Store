import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/currency";
import { ProductImage } from "@/components/product-image";

interface OrderItem {
  quantity: number;
  price: number;
  product: {
    name: string;
    images: {
      url: string;
      alt: string;
    }[];
  };
}

interface Order {
  id: string;
  email: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  user: {
    name: string | null;
    email: string;
  } | null;
  items: OrderItem[];
}

async function getOrder(id: string): Promise<Order | null> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/admin/orders/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}

export default async function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await getOrder(params.id);

  if (!order) {
    notFound();
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "default";
      case "pending":
        return "secondary";
      case "failed":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Order #{order.id.slice(-8)}
          </h1>
          <p className="text-muted-foreground">
            Order details and management
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
            <CardDescription>
              Basic details about this order
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Order ID
                </label>
                <p className="text-sm font-mono">{order.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Status
                </label>
                <div className="mt-1">
                  <Badge variant={getStatusBadgeVariant(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Date
                </label>
                <p className="text-sm">
                  {new Date(order.createdAt).toLocaleDateString()} at{" "}
                  {new Date(order.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Total
                </label>
                <p className="text-sm font-semibold">
                  {formatPrice(order.amount)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>
              Details about the customer who placed this order
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Name
              </label>
              <p className="text-sm">
                {order.user?.name || "N/A"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Email
              </label>
              <p className="text-sm">{order.email}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
          <CardDescription>
            Products included in this order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index}>
                <div className="flex items-center space-x-4">
                  {item.product.images.length > 0 && (
                    <div className="relative h-16 w-16 rounded overflow-hidden">
                      <ProductImage
                        src={item.product.images[0].url}
                        alt={item.product.images[0].alt}
                        width={64}
                        height={64}
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium">{item.product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
                {index < order.items.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="flex justify-end">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-xl font-bold">
                {formatPrice(order.amount)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
