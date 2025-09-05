import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Package,
  Shield,
  Truck,
  RotateCcw
} from "lucide-react";

const footerSections = {
  shop: {
    title: "Shop",
    links: [
      { name: "All Products", href: "/products" },
      { name: "New Arrivals", href: "/products?sort=newest" },
      { name: "Deals", href: "/products?filter=discounted" },
      { name: "Brands", href: "/brands" },
      { name: "Sale", href: "/products?filter=sale" },
    ],
  },
  categories: {
    title: "Categories",
    links: [
      { name: "Electronics", href: "/products?category=electronics" },
      { name: "Computing", href: "/products?category=computers" },
      { name: "Fashion", href: "/products?category=fashion" },
      { name: "Home", href: "/products?category=home" },
      { name: "Sports", href: "/products?category=sports" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { name: "Help Center", href: "/help" },
      { name: "Contact", href: "/contact" },
      { name: "Shipping", href: "/shipping" },
      { name: "Returns", href: "/returns" },
      { name: "FAQ", href: "/faq" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" },
      { name: "Sustainability", href: "/sustainability" },
    ],
  },
};

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "YouTube", href: "#", icon: Youtube },
];

const services = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "From $50 purchase"
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "SSL encrypted"
  },
  {
    icon: RotateCcw,
    title: "Free Returns",
    description: "Within 30 days"
  },
  {
    icon: Package,
    title: "Careful Packaging",
    description: "Eco-friendly"
  },
];

export function ImprovedFooter() {
  return (
    <footer className="bg-muted/50 border-t">
      {/* Services Section */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="text-center">
                <service.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-sm mb-1">{service.title}</h3>
                <p className="text-xs text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">MyShop</span>
            </div>
            <p className="text-muted-foreground mb-6 text-sm">
              Your trusted online store for all your purchases.
              Quality, service and satisfaction guaranteed.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>contact@myshop.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Paris, France</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Newsletter & Social */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Newsletter */}
          <div className="flex-1 max-w-md">
            <h3 className="font-semibold mb-2">Stay Informed</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Receive our latest offers and news
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="sm">Subscribe</Button>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2024 MyShop. All rights reserved.
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
              Cookies
            </Link>
            <Link href="/legal" className="text-muted-foreground hover:text-foreground">
              Legal Notice
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
