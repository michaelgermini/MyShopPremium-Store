# 🛒 Modern E-Commerce Store

A modern and elegant online store built with Next.js 14, TypeScript, Tailwind CSS and Shadcn/ui.

## ✨ Features

### 🏪 Store
- **Product catalog** with organized categories
- **Advanced search** with real-time suggestions
- **Filtering by categories** and price
- **Smart pagination**
- **Featured products** highlighted

### 🛍️ Cart & Orders
- **Dynamic cart** with real-time updates
- **Interactive quantity management**
- **Automatic total calculation**
- **Secure payment** with Stripe
- **Order tracking**

### 👤 User
- **Authentication** with NextAuth.js
- **Custom user profiles**
- **Order history**
- **Persistent wishlist**
- **Reviews and comments**

### 🎨 Interface
- **Modern design** with Shadcn/ui
- **Mobile-first responsive design**
- **Smooth animations** and transitions
- **Dark/light theme**
- **Accessibility** WCAG 2.1 compliant

### 🔧 Administration
- **Complete admin panel**
- **Product CRUD management**
- **Order management**
- **Real-time statistics**
- **User management**

## 🚀 Technologies

- **Frontend:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Shadcn/ui
- **Database:** PostgreSQL with Prisma
- **Authentication:** NextAuth.js
- **Payment:** Stripe
- **Deployment:** Vercel
- **Language:** TypeScript

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/michaelgermini/MyShopPremium-Store.git
   cd MyShopPremium-Store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database configuration**
   ```bash
   # Copy environment file
   cp .env.example .env.local

   # Configure your PostgreSQL database
   DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce"

   # Configure NextAuth.js
   NEXTAUTH_SECRET="your-very-long-secret"
   NEXTAUTH_URL="http://localhost:3000"

   # Configure Stripe
   STRIPE_PUBLIC_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   ```

4. **Database migration**
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # User dashboard
│   ├── admin/             # Admin panel
│   ├── api/               # API Routes
│   ├── checkout/          # Payment process
│   └── products/          # Product pages
├── components/            # Reusable components
│   ├── ui/               # Shadcn/ui components
│   ├── forms/            # Forms
│   ├── layout/           # Layout components
│   └── product/          # Product components
├── lib/                  # Utilities and configurations
│   ├── auth.ts           # NextAuth configuration
│   ├── db.ts             # Database configuration
│   ├── stripe.ts         # Stripe configuration
│   └── utils.ts          # Utility functions
├── hooks/                # Custom React hooks
├── store/                # Zustand stores
└── types/                # TypeScript types
```

## 📸 Screenshots

### Homepage
![Modern Store Homepage](screenshots/Home.png)

### Product Catalog
![Explore All Products](screenshots/Explore_all_Products.png)

### Product Details - Premium Yoga Mat
![Premium Yoga Mat](screenshots/Premium_Yoga.png)

### Quick Filters
![Quick Filters](screenshots/Quick_Filters.png)

### Customer Reviews
![Reviews](screenshots/Reviews.png)

### Authentication
![Sign In](screenshots/Sign_In.png)
![Sign Up](screenshots/Sign_Up.png)

### Help & Support
![Help](screenshots/Help.png)

### Footer
![Footer](screenshots/Fotter.png)

## 🗄️ Database

The project uses Prisma with PostgreSQL. The schema includes:

- **Users** - Users and authentication
- **Products** - Product catalog
- **Categories** - Product categories
- **Orders** - Orders and transactions
- **Reviews** - Reviews and comments
- **CartItems** - Cart items

## 🎨 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start in production
npm run lint         # ESLint check

# Database
npm run db:migrate   # Prisma migration
npm run db:studio    # Prisma Studio interface
npm run db:seed      # Database seeding

# Types
npm run type-check   # TypeScript check
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with:

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth.js
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (optional)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="..."
EMAIL_SERVER_PASSWORD="..."
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**
2. **Add environment variables** in Vercel settings
3. **Deploy automatically** on every push

### Other Platforms

The project can be deployed on:
- **Netlify**
- **Railway**
- **Render**
- **Heroku**

## 🤝 Contribution

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under MIT. See the `LICENSE` file for more details.

## 📞 Support

For any questions or issues:
- Open an issue on GitHub
- Contact the development team

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React Framework
- [Shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Prisma](https://prisma.io/) - Database ORM
- [Stripe](https://stripe.com/) - Payment Solution
- [NextAuth.js](https://next-auth.js.org/) - Authentication

---

⭐ **Don't forget to star this project if you like it!**