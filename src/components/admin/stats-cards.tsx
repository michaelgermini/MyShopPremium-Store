import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";

async function getStats() {
  try {
    const [totalRevenue, totalOrders, totalProducts, totalCustomers] = await Promise.all([
      // Total revenue from completed orders
      prisma.order.aggregate({
        where: { status: "paid" },
        _sum: { amount: true },
      }),

      // Total orders count
      prisma.order.count(),

      // Total products count
      prisma.product.count(),

      // Total unique customers
      prisma.user.count(),
    ]);

    return {
      totalRevenue: totalRevenue._sum.amount || 0,
      totalOrders,
      totalProducts,
      totalCustomers,
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {
      totalRevenue: 0,
      totalOrders: 0,
      totalProducts: 0,
      totalCustomers: 0,
    };
  }
}

export async function StatsCards() {
  const stats = await getStats();

  const cards = [
    {
      title: "Total Revenue",
      value: `€${(stats.totalRevenue / 100).toFixed(2)}`,
      description: "Total revenue from completed orders",
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toString(),
      description: "Number of orders placed",
      icon: ShoppingCart,
    },
    {
      title: "Total Products",
      value: stats.totalProducts.toString(),
      description: "Products in your catalog",
      icon: Package,
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers.toString(),
      description: "Registered customers",
      icon: Users,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {card.title}
            </CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
