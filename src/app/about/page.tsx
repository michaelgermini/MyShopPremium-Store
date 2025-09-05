import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Heart, Zap, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">About MyShop</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A modern and elegant store, designed to offer the best online shopping experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            At MyShop, we believe that online shopping should be simple, secure and enjoyable.
            Our modern platform combines the latest technologies with special attention
            to user experience.
          </p>
          <p className="text-muted-foreground">
            We carefully select our products to guarantee quality and satisfaction,
            while maintaining competitive prices.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Next.js 14</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">shadcn/ui</Badge>
            <Badge variant="secondary">Prisma</Badge>
            <Badge variant="secondary">Zustand</Badge>
            <Badge variant="secondary">Stripe</Badge>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="text-center">
              <Shield className="h-10 w-10 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Security</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Secure payments and personal data protection
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Heart className="h-10 w-10 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Rigorous selection of high-quality products
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Zap className="h-10 w-10 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Fast website and smooth user experience
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Users className="h-10 w-10 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Service</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Responsive customer support and personalized service
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="text-muted-foreground">
          Have a question? Don&apos;t hesitate to contact us.
          Our team is here to help you.
        </p>
      </div>
    </div>
  );
}
