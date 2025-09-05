
# 🛠️ Admin Panel Guide

## 📋 Overview

Your e-commerce application now includes a comprehensive admin panel accessible at `/admin`. This guide will help you navigate and use all the administrative features.

## 🔐 Access

### Requirements
- User must be authenticated
- Admin routes are protected by middleware
- Access URL: `http://localhost:3000/admin`

### Navigation
The admin panel includes a sidebar with the following sections:

## 📊 Dashboard (`/admin`)

### Features
- **Statistics Cards**: Total revenue, orders, products, and customers
- **Revenue Chart**: Monthly revenue overview (last 12 months)
- **Recent Orders**: Latest 5 customer orders

### Data Displayed
- Real-time statistics from your database
- Interactive charts using Recharts
- Quick access to recent activity

## 📦 Products Management (`/admin/products`)

### Features
- View all products in a table format
- Search products by name or description
- Add new products
- Edit existing products
- Delete products
- View product images and categories

### Product Table Columns
- Product Image
- Product Name & ID
- Category
- Price
- Status
- Actions (Edit/Delete)

### Adding Products
Navigate to `/admin/products/new` to add new products:
- Product name (required)
- Description (required)
- Price in euros (required)
- Category selection (required)
- Multiple product images with alt text

### API Endpoints
- `GET /api/admin/products` - List all products
- `POST /api/admin/products` - Create new product
- `GET /api/admin/products/[id]` - Get product details
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product

## 🛒 Orders Management (`/admin/orders`)

### Features
- View all customer orders
- Search orders by email or order ID
- View detailed order information
- Track order status
- Customer information display

### Order Table Columns
- Order ID
- Customer Name & Email
- Number of Items
- Total Amount
- Order Status
- Order Date
- Actions (View Details)

### Order Details Page (`/admin/orders/[id]`)
- Complete order information
- Customer details
- Ordered items with images
- Order status and timeline
- Total calculations

### Order Statuses
- `pending` - Order placed, payment pending
- `paid` - Payment successful
- `failed` - Payment failed

### API Endpoints
- `GET /api/admin/orders` - List all orders
- `GET /api/admin/orders/[id]` - Get order details
- `PUT /api/admin/orders/[id]` - Update order status

## 🏷️ Categories Management

### API Endpoint
- `GET /api/admin/categories` - List all categories

### Features
- Used in product creation/editing
- Categories are populated from database
- Supports hierarchical organization (future enhancement)

## 🔒 Security Features

### Authentication
- Protected routes using NextAuth.js
- Session-based authentication
- Automatic redirects for unauthorized access

### Middleware Protection
```typescript
// Routes protected: /admin/*
export default withAuth(middleware, {
  callbacks: {
    authorized: ({ token, req }) => {
      // Admin routes require authentication
      return !!token;
    },
  },
});
```

## 🎨 UI Components

### Design System
- Built with shadcn/ui components
- Responsive design for all screen sizes
- Dark/light mode support (inherited from main app)
- Consistent styling throughout

### Key Components
- **AdminSidebar**: Navigation menu
- **AdminHeader**: User menu and logout
- **ProductsTable**: Product management interface
- **OrdersTable**: Order management interface
- **StatsCards**: Dashboard statistics
- **Overview**: Revenue chart component

## 📈 Analytics & Reporting

### Current Metrics
- Total revenue (completed orders only)
- Total order count
- Total product count
- Total registered customers
- Monthly revenue trends

### Future Enhancements
- Order conversion rates
- Customer lifetime value
- Product performance metrics
- Geographic sales distribution

## 🔧 Technical Implementation

### Database Integration
- Uses Prisma ORM for all database operations
- Optimized queries with proper includes
- Error handling for all API calls
- Real-time data updates

### API Structure
```typescript
// Admin API routes structure
/api/admin/
├── products/           # Product management
│   ├── route.ts       # GET/POST products
│   └── [id]/
│       └── route.ts   # GET/PUT/DELETE specific product
├── orders/            # Order management
│   ├── route.ts       # GET orders
│   └── [id]/
│       └── route.ts   # GET/PUT specific order
└── categories/        # Category management
    └── route.ts       # GET categories
```

### State Management
- Server-side data fetching
- Client-side search and filtering
- Optimistic UI updates
- Error boundaries for stability

## 🚀 Getting Started

1. **Start the application**:
   ```bash
   npm run dev
   ```

2. **Access admin panel**:
   - Go to `http://localhost:3000/admin`
   - Sign in with any user account (all authenticated users have admin access)

3. **Explore features**:
   - View dashboard statistics
   - Add new products
   - Manage existing orders
   - Search and filter data

## 🔮 Future Enhancements

### Planned Features
- **User Role Management**: Different permission levels
- **Bulk Operations**: Mass product/order updates
- **Advanced Analytics**: Detailed reporting and charts
- **Email Notifications**: Automated customer communications
- **Inventory Management**: Stock tracking and alerts
- **Export Functionality**: CSV/PDF export capabilities

### Potential Improvements
- Real-time notifications for new orders
- Advanced filtering and sorting options
- Product image upload directly from admin panel
- Order status automation workflows
- Customer management interface

## 🆘 Troubleshooting

### Common Issues

1. **"Unauthorized" errors**:
   - Ensure user is signed in
   - Check middleware configuration
   - Verify API route authentication

2. **Data not loading**:
   - Check database connection
   - Verify Prisma schema
   - Check API route responses

3. **UI not updating**:
   - Clear browser cache
   - Check for JavaScript errors in console
   - Verify component state management

### Debug Tips
- Use browser dev tools for API debugging
- Check server logs for database errors
- Test API endpoints directly with tools like Postman
- Verify environment variables are loaded correctly

---

**🎉 Your admin panel is now fully functional!** Start managing your e-commerce store efficiently.
