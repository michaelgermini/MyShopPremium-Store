import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number; // centimes
  currency: string;
  image?: string;
  qty: number;
};

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  currency: string;
  image?: string;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
};

type WishlistState = {
  items: WishlistItem[];
  add: (item: WishlistItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
  count: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  add: (item, qty = 1) => {
    const exists = get().items.find((i) => i.id === item.id);
    if (exists) {
      set({
        items: get().items.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + qty } : i
        ),
      });
    } else {
      set({ items: [...get().items, { ...item, qty }] });
    }
  },
  remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
  setQty: (id, qty) => {
    if (qty <= 0) {
      get().remove(id);
    } else {
      set({
        items: get().items.map((i) => (i.id === id ? { ...i, qty } : i)),
      });
    }
  },
  clear: () => set({ items: [] }),
  total: () => get().items.reduce((acc, i) => acc + i.price * i.qty, 0),
  count: () => get().items.reduce((acc, i) => acc + i.qty, 0),
}));

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => {
        const exists = get().items.find((i) => i.id === item.id);
        if (!exists) {
          set({ items: [...get().items, item] });
        }
      },
      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      clear: () => set({ items: [] }),
      has: (id) => get().items.some((i) => i.id === id),
      count: () => get().items.length,
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
