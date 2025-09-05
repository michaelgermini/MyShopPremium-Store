"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Package,
  Tags,
  Star,
  TrendingUp,
  ShoppingCart,
  Users,
  BarChart3,
  PieChart
} from "lucide-react";

interface ProductStats {
  totalProducts: number;
  totalCategories: number;
  averagePrice: number;
  priceRange: {
    min: number;
    max: number;
  };
  topCategories: Array<{
    name: string;
    count: number;
  }>;
}

export function ProductsStats() {
  const [stats, setStats] = useState<ProductStats | null>(null);

  useEffect(() => {
    // In a real app, you'd fetch this from an API
    // For now, we'll calculate from local data
    const calculateStats = () => {
      try {
        // This would normally come from your API
        // For demo purposes, we'll show placeholder data
        setStats({
          totalProducts: 24,
          totalCategories: 6,
          averagePrice: 89.99,
          priceRange: {
            min: 19.99,
            max: 299.99,
          },
          topCategories: [
            { name: "Electronics", count: 8 },
            { name: "Clothing", count: 6 },
            { name: "Home", count: 5 },
            { name: "Sports", count: 3 },
            { name: "Books", count: 2 },
          ],
        });
      } catch (error) {
        console.error("Error calculating product stats:", error);
      }
    };

    calculateStats();
  }, []);

  if (!stats) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Products</p>
                <p className="text-3xl font-bold text-primary">{stats.totalProducts}</p>
                <p className="text-xs text-green-600 mt-1">↗️ +12% this month</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Categories</p>
                <p className="text-3xl font-bold text-green-600">{stats.totalCategories}</p>
                <p className="text-xs text-green-600 mt-1">↗️ +2 new categories</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors">
                <Tags className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={60} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Average Price</p>
                <p className="text-3xl font-bold text-purple-600">€{stats.averagePrice.toFixed(0)}</p>
                <p className="text-xs text-green-600 mt-1">↗️ +5% vs last month</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Price Range</p>
                <p className="text-2xl font-bold text-orange-600">€{stats.priceRange.min}</p>
                <p className="text-sm text-muted-foreground">to €{stats.priceRange.max}</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={90} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Categories Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Popular Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topCategories.slice(0, 3).map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">{index + 1}</span>
                    </div>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${(category.count / Math.max(...stats.topCategories.map(c => c.count))) * 100}%` }}
                      ></div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Store Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Orders Today</span>
                </div>
                <span className="font-bold text-blue-600">24</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Active Users</span>
                </div>
                <span className="font-bold text-green-600">1,247</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Conversion Rate</span>
                </div>
                <span className="font-bold text-purple-600">3.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
