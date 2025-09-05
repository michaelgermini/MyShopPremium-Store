// URLs d'images Unsplash optimisées avec meilleur recadrage pour éviter les erreurs 404
export const STABLE_IMAGE_URLS = {
  // Produits électroniques - recadrage optimisé
  iphone: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&crop=center&auto=format&q=80",
  macbook: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&crop=center&auto=format&q=80",
  airpods: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop&crop=center&auto=format&q=80",
  dellXps: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop&crop=center&auto=format&q=80",

  // Vêtements - recadrage centré sur le produit
  tshirt: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&crop=center&auto=format&q=80",
  hoodie: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&crop=center&auto=format&q=80",

  // Sports - images optimisées pour le fitness
  runningShoes: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop&crop=center&auto=format&q=80",
  yogaMat: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop&crop=center&auto=format&q=80",
  dumbbells: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&crop=center&auto=format&q=80",
  fitnessBall: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&crop=center&auto=format&q=80",
  resistanceBands: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&crop=center&auto=format&q=80",

  // Accessoires - recadrage précis
  baseballCap: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop&crop=center&auto=format&q=80",
  backpack: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&crop=center&auto=format&q=80",

  // Maison et autres - recadrage optimisé
  ceramicMug: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&h=500&fit=crop&crop=center&auto=format&q=80",
  throwBlanket: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop&crop=center&auto=format&q=80",
  deskLamp: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=center&auto=format&q=80",
} as const;

// Fonction utilitaire pour obtenir une URL d'image stable avec optimisation
export function getStableImageUrl(
  key: keyof typeof STABLE_IMAGE_URLS,
  size: { width: number; height: number } = { width: 500, height: 500 },
  options: {
    quality?: number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    focus?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'face' | 'edges';
  } = {}
): string {
  const baseUrl = STABLE_IMAGE_URLS[key];
  const url = new URL(baseUrl);

  // Dimensions optimisées
  url.searchParams.set('w', size.width.toString());
  url.searchParams.set('h', size.height.toString());

  // Paramètres de recadrage optimisés
  url.searchParams.set('fit', 'crop');
  url.searchParams.set('crop', options.focus || 'center');

  // Format et qualité optimisés
  url.searchParams.set('auto', 'format');
  url.searchParams.set('q', (options.quality || 80).toString());

  return url.toString();
}

// Fonctions spécialisées pour différents contextes d'usage
export function getProductCardImage(key: keyof typeof STABLE_IMAGE_URLS): string {
  return getStableImageUrl(key, { width: 400, height: 400 }, { quality: 85, focus: 'center' });
}

export function getProductDetailImage(key: keyof typeof STABLE_IMAGE_URLS): string {
  return getStableImageUrl(key, { width: 800, height: 800 }, { quality: 90, focus: 'center' });
}

export function getThumbnailImage(key: keyof typeof STABLE_IMAGE_URLS): string {
  return getStableImageUrl(key, { width: 200, height: 200 }, { quality: 80, focus: 'center' });
}

export function getHeroImage(key: keyof typeof STABLE_IMAGE_URLS): string {
  return getStableImageUrl(key, { width: 1200, height: 800 }, { quality: 85, focus: 'center' });
}
