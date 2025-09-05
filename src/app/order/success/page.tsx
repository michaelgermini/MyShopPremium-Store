import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Package, Truck } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="mb-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground">
          Thank you for your purchase. Your order has been successfully recorded.
        </p>
      </div>

      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Order Received</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Payment Confirmed</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Processing</span>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>
              You will receive a confirmation email with your order details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-left space-y-2">
              <li>• Confirmation email sent</li>
              <li>• Order preparation in progress</li>
              <li>• Shipping within 2-3 business days</li>
              <li>• Delivery tracking by email</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 justify-center">
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
