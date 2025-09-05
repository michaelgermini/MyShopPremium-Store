"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  ShoppingBag,
  Star,
  Truck,
  TrendingUp,
  Award,
  Shield
} from "lucide-react";

interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  trend?: string;
  color: string;
}

const stats: StatItem[] = [
  {
    icon: Users,
    value: "50K+",
    label: "Happy Customers",
    trend: "+12%",
    color: "text-blue-600"
  },
  {
    icon: ShoppingBag,
    value: "100K+",
    label: "Products Sold",
    trend: "+25%",
    color: "text-green-600"
  },
  {
    icon: Star,
    value: "4.9",
    label: "Average Rating",
    trend: "+0.2",
    color: "text-yellow-600"
  },
  {
    icon: Truck,
    value: "24h",
    label: "Average Delivery",
    trend: "-2h",
    color: "text-purple-600"
  }
];

interface StatsSectionProps {
  title?: string;
  subtitle?: string;
}

export function StatsSection({
  title = "Trusted by Thousands",
  subtitle = "Join our growing community of satisfied customers"
}: StatsSectionProps) {
  return (
    <section className="py-12 sm:py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">{title}</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                  <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                    <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <div className="w-full">
                    <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground mb-2">
                      {stat.label}
                    </div>
                    {stat.trend && (
                      <Badge
                        variant={stat.trend.startsWith('+') ? 'default' : 'secondary'}
                        className="text-xs w-fit mx-auto"
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {stat.trend}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-center sm:text-left">Award-winning service</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-center sm:text-left">Secure payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-center sm:text-left">Free shipping over $50</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-center sm:text-left">4.9/5 customer rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
