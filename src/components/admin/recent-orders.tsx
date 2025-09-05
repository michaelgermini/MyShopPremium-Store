import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { prisma } from "@/lib/prisma";

async function getRecentOrders() {
  try {
    const orders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return orders;
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    return [];
  }
}

export async function RecentOrders() {
  const orders = await getRecentOrders();

  if (orders.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No orders yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center space-x-4">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {order.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              {order.user?.name || "Unknown User"}
            </p>
            <p className="text-sm text-muted-foreground">
              Order #{order.id.slice(-8)}
            </p>
            <p className="text-xs text-muted-foreground">
              {order.items.length} item{order.items.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">
              €{(order.amount / 100).toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {order.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
