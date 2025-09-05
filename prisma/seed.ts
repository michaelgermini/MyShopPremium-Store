import { PrismaClient } from "@prisma/client";
import { STABLE_IMAGE_URLS } from "../src/lib/image-data";

const db = new PrismaClient();

async function main() {
  const cat = await db.category.upsert({
    where: { slug: "t-shirts" },
    update: {},
    create: { name: "T-Shirts", slug: "t-shirts" },
  });

  await db.product.upsert({
    where: { slug: "tshirt-logo" },
    update: {},
    create: {
      name: "T‑shirt Logo",
      slug: "tshirt-logo",
      description: "Organic cotton T-shirt with logo.",
      price: 2499,
      currency: "USD",
      categoryId: cat.id,
      images: {
        create: [
          { url: STABLE_IMAGE_URLS.tshirt, alt: "T-shirt logo front" },
          { url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&crop=center", alt: "T-shirt logo back" },
          { url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&h=500&fit=crop&crop=center", alt: "T-shirt logo detail" }
        ]
      },
    },
  });

  await db.product.upsert({
    where: { slug: "hoodie-zip" },
    update: {},
    create: {
      name: "Hoodie Zip",
      slug: "hoodie-zip",
      description: "Comfortable fleece hoodie.",
      price: 5499,
      currency: "USD",
      categoryId: cat.id,
      images: {
        create: [
          { url: STABLE_IMAGE_URLS.hoodie, alt: "Hoodie front" },
          { url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop&crop=center", alt: "Hoodie back" },
          { url: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=500&fit=crop&crop=center", alt: "Hoodie detail" }
        ]
      },
    },
  });

  // Create another category
  const accessoriesCat = await db.category.upsert({
    where: { slug: "accessories" },
    update: {},
    create: { name: "Accessories", slug: "accessories" },
  });

  // Add more products
  await db.product.upsert({
    where: { slug: "cap-baseball" },
    update: {},
    create: {
      name: "Baseball Cap",
      slug: "cap-baseball",
      description: "Classic baseball cap with adjustable strap.",
      price: 1999,
      currency: "USD",
      categoryId: accessoriesCat.id,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop&crop=center", alt: "Baseball Cap front" },
          { url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop&crop=center", alt: "Baseball Cap side" },
          { url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&crop=center", alt: "Baseball Cap back" }
        ]
      },
    },
  });

  await db.product.upsert({
    where: { slug: "backpack-urban" },
    update: {},
    create: {
      name: "Urban Backpack",
      slug: "backpack-urban",
      description: "Stylish urban backpack for daily use.",
      price: 7999,
      currency: "USD",
      categoryId: accessoriesCat.id,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&crop=center", alt: "Urban Backpack front" },
          { url: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop&crop=center", alt: "Urban Backpack side" },
          { url: "https://images.unsplash.com/photo-1506629905607-d405315faa4b?w=500&h=500&fit=crop&crop=center", alt: "Urban Backpack open" }
        ]
      },
    },
  });

  // Create Pants category
  const pantsCat = await db.category.upsert({
    where: { slug: "pants" },
    update: {},
    create: { name: "Pants", slug: "pants" },
  });

  // Add Pants products
  await db.product.upsert({
    where: { slug: "jeans-slim-fit" },
    update: {},
    create: {
      name: "Slim Fit Jeans",
      slug: "jeans-slim-fit",
      description: "Classic slim fit jeans with perfect comfort fit.",
      price: 7999,
      currency: "USD",
      categoryId: pantsCat.id,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop&crop=center", alt: "Slim Fit Jeans front" },
          { url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop&crop=center", alt: "Slim Fit Jeans back" },
          { url: "https://images.unsplash.com/photo-1506629905607-d405315faa4b?w=500&h=500&fit=crop&crop=center", alt: "Slim Fit Jeans detail" }
        ]
      },
    },
  });

  await db.product.upsert({
    where: { slug: "cargo-pants-black" },
    update: {},
    create: {
      name: "Black Cargo Pants",
      slug: "cargo-pants-black",
      description: "Stylish black cargo pants with multiple pockets.",
      price: 6999,
      currency: "USD",
      categoryId: pantsCat.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1506629905607-d405315faa4b?w=500&h=500&fit=crop&crop=center", alt: "Black Cargo Pants" }] },
    },
  });

  await db.product.upsert({
    where: { slug: "chinos-beige" },
    update: {},
    create: {
      name: "Beige Chinos",
      slug: "chinos-beige",
      description: "Elegant beige chinos perfect for office or casual wear.",
      price: 5999,
      currency: "USD",
      categoryId: pantsCat.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop&crop=center", alt: "Beige Chinos" }] },
    },
  });

  // Create Shoes category
  const shoesCat = await db.category.upsert({
    where: { slug: "shoes" },
    update: {},
    create: { name: "Shoes", slug: "shoes" },
  });

  // Add Shoes products
  await db.product.upsert({
    where: { slug: "sneakers-white" },
    update: {},
    create: {
      name: "Classic White Sneakers",
      slug: "sneakers-white",
      description: "Timeless white sneakers with premium comfort.",
      price: 8999,
      currency: "USD",
      categoryId: shoesCat.id,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop&crop=center", alt: "White Sneakers front" },
          { url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop&crop=center", alt: "White Sneakers side" },
          { url: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=500&fit=crop&crop=center", alt: "White Sneakers detail" }
        ]
      },
    },
  });

  await db.product.upsert({
    where: { slug: "boots-brown" },
    update: {},
    create: {
      name: "Brown Leather Boots",
      slug: "boots-brown",
      description: "Genuine leather boots for all weather conditions.",
      price: 12999,
      currency: "USD",
      categoryId: shoesCat.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=500&fit=crop&crop=center", alt: "Brown Leather Boots" }] },
    },
  });

  await db.product.upsert({
    where: { slug: "sandals-beach" },
    update: {},
    create: {
      name: "Beach Sandals",
      slug: "sandals-beach",
      description: "Comfortable beach sandals perfect for summer.",
      price: 2999,
      currency: "USD",
      categoryId: shoesCat.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop&crop=center", alt: "Beach Sandals" }] },
    },
  });

  // Create Jackets category
  const jacketsCat = await db.category.upsert({
    where: { slug: "jackets" },
    update: {},
    create: { name: "Jackets", slug: "jackets" },
  });

  // Add Jackets products
  await db.product.upsert({
    where: { slug: "leather-jacket-black" },
    update: {},
    create: {
      name: "Black Leather Jacket",
      slug: "leather-jacket-black",
      description: "Premium black leather jacket with timeless style.",
      price: 19999,
      currency: "USD",
      categoryId: jacketsCat.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop&crop=center", alt: "Black Leather Jacket" }] },
    },
  });

  await db.product.upsert({
    where: { slug: "bomber-jacket" },
    update: {},
    create: {
      name: "Classic Bomber Jacket",
      slug: "bomber-jacket",
      description: "Retro-style bomber jacket with ribbed cuffs.",
      price: 8999,
      currency: "USD",
      categoryId: jacketsCat.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop&crop=center", alt: "Bomber Jacket" }] },
    },
  });

  await db.product.upsert({
    where: { slug: "trench-coat" },
    update: {},
    create: {
      name: "Beige Trench Coat",
      slug: "trench-coat",
      description: "Elegant trench coat perfect for transitional weather.",
      price: 15999,
      currency: "USD",
      categoryId: jacketsCat.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1544441893-675973e31985?w=500&h=500&fit=crop&crop=center", alt: "Beige Trench Coat" }] },
    },
  });

  // Create Electronics category
  const electronicsCat = await db.category.upsert({
    where: { slug: "electronics" },
    update: {},
    create: { name: "Electronics", slug: "electronics" },
  });

  // Add Electronics products
  await db.product.upsert({
    where: { slug: "wireless-headphones" },
    update: {},
    create: {
      name: "Wireless Headphones",
      slug: "wireless-headphones",
      description: "Premium wireless headphones with noise cancellation.",
      price: 24999,
      currency: "USD",
      categoryId: electronicsCat.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&crop=center", alt: "Wireless Headphones" }] },
    },
  });

  await db.product.upsert({
    where: { slug: "smartwatch" },
    update: {},
    create: {
      name: "Smart Fitness Watch",
      slug: "smartwatch",
      description: "Advanced smartwatch with health tracking features.",
      price: 29999,
      currency: "USD",
      categoryId: electronicsCat.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&crop=center", alt: "Smart Fitness Watch" }] },
    },
  });

  await db.product.upsert({
    where: { slug: "bluetooth-speaker" },
    update: {},
    create: {
      name: "Portable Bluetooth Speaker",
      slug: "bluetooth-speaker",
      description: "Compact wireless speaker with excellent sound quality.",
      price: 7999,
      currency: "USD",
      categoryId: electronicsCat.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&crop=center", alt: "Bluetooth Speaker" }] },
    },
  });

  // Create Home & Living category
  const homeCat = await db.category.upsert({
    where: { slug: "home-living" },
    update: {},
    create: { name: "Home & Living", slug: "home-living" },
  });

  // Add Home products
  await db.product.upsert({
    where: { slug: "ceramic-mug" },
    update: {},
    create: {
      name: "Ceramic Coffee Mug",
      slug: "ceramic-mug",
      description: "Beautiful ceramic mug perfect for your morning coffee.",
      price: 1499,
      currency: "USD",
      categoryId: homeCat.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&h=500&fit=crop&crop=center", alt: "Ceramic Coffee Mug" }] },
    },
  });

  await db.product.upsert({
    where: { slug: "throw-blanket" },
    update: {},
    create: {
      name: "Cozy Throw Blanket",
      slug: "throw-blanket",
      description: "Soft and warm throw blanket for your couch or bed.",
      price: 3999,
      currency: "USD",
      categoryId: homeCat.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop&crop=center", alt: "Throw Blanket" }] },
    },
  });

  await db.product.upsert({
    where: { slug: "desk-lamp" },
    update: {},
    create: {
      name: "Modern Desk Lamp",
      slug: "desk-lamp",
      description: "Adjustable desk lamp with LED lighting.",
      price: 5999,
      currency: "USD",
      categoryId: homeCat.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=center", alt: "Modern Desk Lamp" }] },
    },
  });

  // Create Sports category
  const sportsCat = await db.category.upsert({
    where: { slug: "sports" },
    update: {},
    create: { name: "Sports & Outdoors", slug: "sports" },
  });

  // Add Sports products
  await db.product.upsert({
    where: { slug: "yoga-mat" },
    update: {},
    create: {
      name: "Premium Yoga Mat",
      slug: "yoga-mat",
      description: "Non-slip yoga mat with excellent cushioning.",
      price: 4999,
      currency: "USD",
      categoryId: sportsCat.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop&crop=center", alt: "Yoga Mat" }] },
    },
  });

  await db.product.upsert({
    where: { slug: "dumbbells-set" },
    update: {},
    create: {
      name: "Adjustable Dumbbells",
      slug: "dumbbells-set",
      description: "Set of adjustable dumbbells for home workouts.",
      price: 14999,
      currency: "USD",
      categoryId: sportsCat.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop&crop=center", alt: "Dumbbells Set" }] },
    },
  });

  await db.product.upsert({
    where: { slug: "running-shoes" },
    update: {},
    create: {
      name: "Performance Running Shoes",
      slug: "running-shoes",
      description: "Lightweight running shoes with advanced cushioning.",
      price: 11999,
      currency: "USD",
      categoryId: sportsCat.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop&crop=center", alt: "Running Shoes" }] },
    },
  });

  // Add more T-Shirt products
  await db.product.upsert({
    where: { slug: "tshirt-graphic" },
    update: {},
    create: {
      name: "Graphic Print T-Shirt",
      slug: "tshirt-graphic",
      description: "Cotton T-shirt with unique graphic design.",
      price: 2999,
      currency: "USD",
      categoryId: cat.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&crop=center", alt: "Graphic T-Shirt" }] },
    },
  });

  await db.product.upsert({
    where: { slug: "tshirt-vintage" },
    update: {},
    create: {
      name: "Vintage Style T-Shirt",
      slug: "tshirt-vintage",
      description: "Retro-inspired T-shirt with distressed look.",
      price: 3499,
      currency: "USD",
      categoryId: cat.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=500&fit=crop&crop=center", alt: "Vintage T-Shirt" }] },
    },
  });

  // Add more Accessories
  await db.product.upsert({
    where: { slug: "sunglasses-aviator" },
    update: {},
    create: {
      name: "Aviator Sunglasses",
      slug: "sunglasses-aviator",
      description: "Classic aviator sunglasses with UV protection.",
      price: 8999,
      currency: "USD",
      categoryId: accessoriesCat.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop&crop=center", alt: "Aviator Sunglasses" }] },
    },
  });

  await db.product.upsert({
    where: { slug: "leather-wallet" },
    update: {},
    create: {
      name: "Genuine Leather Wallet",
      slug: "leather-wallet",
      description: "Handcrafted leather wallet with multiple card slots.",
      price: 5999,
      currency: "USD",
      categoryId: accessoriesCat.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop&crop=center", alt: "Leather Wallet" }] },
    },
  });

  await db.product.upsert({
    where: { slug: "watch-minimalist" },
    update: {},
    create: {
      name: "Minimalist Watch",
      slug: "watch-minimalist",
      description: "Elegant minimalist watch with leather strap.",
      price: 15999,
      currency: "USD",
      categoryId: accessoriesCat.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop&crop=center", alt: "Minimalist Watch" }] },
    },
  });

  console.log("Database seeded with expanded product catalog!");
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
