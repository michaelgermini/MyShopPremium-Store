"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { prisma } from "@/lib/prisma";

async function getMonthlyRevenue() {
  try {
    // Get orders from the last 12 months
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: twelveMonthsAgo,
        },
        status: "paid",
      },
      select: {
        createdAt: true,
        amount: true,
      },
    });

    // Group by month
    const monthlyData = orders.reduce((acc, order) => {
      const month = order.createdAt.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });

      if (!acc[month]) {
        acc[month] = 0;
      }

      acc[month] += order.amount / 100; // Convert cents to euros
      return acc;
    }, {} as Record<string, number>);

    // Convert to array format for the chart
    const chartData = Object.entries(monthlyData).map(([month, revenue]) => ({
      name: month,
      total: revenue,
    }));

    return chartData;
  } catch (error) {
    console.error("Error fetching monthly revenue:", error);
    return [];
  }
}

export async function Overview() {
  const data = await getMonthlyRevenue();

  if (data.length === 0) {
    return (
      <div className="flex h-[350px] items-center justify-center text-muted-foreground">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `€${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
