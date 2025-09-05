// Images de fallback locales pour éviter les erreurs 404 des images Unsplash
export const FALLBACK_IMAGES = {
  // Images SVG encodées en base64 pour les produits
  yogaMat: `data:image/svg+xml;base64,${btoa(`
    <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="600" fill="#f3f4f6"/>
      <rect x="100" y="200" width="400" height="200" fill="#10b981" rx="20"/>
      <rect x="150" y="250" width="300" height="100" fill="#059669" rx="10"/>
      <text x="300" y="310" text-anchor="middle" fill="white" font-family="Arial" font-size="24" font-weight="bold">YOGA MAT</text>
      <circle cx="200" cy="300" r="15" fill="#34d399"/>
      <circle cx="400" cy="300" r="15" fill="#34d399"/>
      <rect x="180" y="280" width="40" height="8" fill="#6ee7b7" rx="4"/>
      <rect x="380" y="280" width="40" height="8" fill="#6ee7b7" rx="4"/>
    </svg>
  `)}`,

  runningShoes: `data:image/svg+xml;base64,${btoa(`
    <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="600" fill="#f3f4f6"/>
      <path d="M150 350 L250 300 L350 320 L450 280 L500 300 L520 320 L480 360 L350 380 L250 370 L150 390 Z" fill="#3b82f6"/>
      <path d="M200 320 L300 290 L400 310 L480 290 L500 310 L460 340 L340 360 L240 350 Z" fill="#1d4ed8"/>
      <circle cx="180" cy="340" r="8" fill="#60a5fa"/>
      <circle cx="220" cy="330" r="6" fill="#60a5fa"/>
      <circle cx="260" cy="325" r="5" fill="#60a5fa"/>
      <text x="300" y="420" text-anchor="middle" fill="#1f2937" font-family="Arial" font-size="20" font-weight="bold">RUNNING SHOES</text>
    </svg>
  `)}`,

  dumbbells: `data:image/svg+xml;base64,${btoa(`
    <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="600" fill="#f3f4f6"/>
      <rect x="200" y="250" width="200" height="100" fill="#6b7280" rx="10"/>
      <rect x="180" y="270" width="40" height="60" fill="#374151" rx="5"/>
      <rect x="380" y="270" width="40" height="60" fill="#374151" rx="5"/>
      <circle cx="200" cy="300" r="20" fill="#9ca3af"/>
      <circle cx="400" cy="300" r="20" fill="#9ca3af"/>
      <circle cx="200" cy="300" r="12" fill="#6b7280"/>
      <circle cx="400" cy="300" r="12" fill="#6b7280"/>
      <text x="300" y="400" text-anchor="middle" fill="#1f2937" font-family="Arial" font-size="20" font-weight="bold">DUMBBELLS</text>
    </svg>
  `)}`,

  fitnessBall: `data:image/svg+xml;base64,${btoa(`
    <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="600" fill="#f3f4f6"/>
      <circle cx="300" cy="300" r="120" fill="#ef4444"/>
      <circle cx="300" cy="300" r="100" fill="#dc2626"/>
      <circle cx="300" cy="300" r="80" fill="#b91c1c"/>
      <path d="M240 240 Q300 220 360 240 Q380 260 360 280 Q300 300 240 280 Q220 260 240 240 Z" fill="#fca5a5"/>
      <circle cx="285" cy="275" r="8" fill="#7f1d1d"/>
      <circle cx="315" cy="275" r="8" fill="#7f1d1d"/>
      <text x="300" y="420" text-anchor="middle" fill="#1f2937" font-family="Arial" font-size="20" font-weight="bold">FITNESS BALL</text>
    </svg>
  `)}`,

  tshirt: `data:image/svg+xml;base64,${btoa(`
    <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="600" fill="#f3f4f6"/>
      <path d="M250 150 L350 150 L370 200 L330 250 L270 250 L230 200 Z" fill="#3b82f6"/>
      <rect x="270" y="250" width="60" height="150" fill="#1d4ed8"/>
      <circle cx="300" cy="180" r="15" fill="#60a5fa"/>
      <text x="300" y="450" text-anchor="middle" fill="#1f2937" font-family="Arial" font-size="20" font-weight="bold">T-SHIRT</text>
    </svg>
  `)}`,

  hoodie: `data:image/svg+xml;base64,${btoa(`
    <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="600" fill="#f3f4f6"/>
      <path d="M250 150 L350 150 L370 200 L330 250 L270 250 L230 200 Z" fill="#374151"/>
      <rect x="270" y="250" width="60" height="120" fill="#1f2937"/>
      <rect x="250" y="200" width="20" height="80" fill="#374151"/>
      <rect x="330" y="200" width="20" height="80" fill="#374151"/>
      <circle cx="300" cy="180" r="15" fill="#6b7280"/>
      <text x="300" y="420" text-anchor="middle" fill="#1f2937" font-family="Arial" font-size="20" font-weight="bold">HOODIE</text>
    </svg>
  `)}`,

  iphone: `data:image/svg+xml;base64,${btoa(`
    <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="600" fill="#f3f4f6"/>
      <rect x="200" y="150" width="200" height="300" fill="#1f2937" rx="30"/>
      <rect x="210" y="160" width="180" height="280" fill="#111827" rx="20"/>
      <circle cx="300" cy="400" r="8" fill="#374151"/>
      <rect x="285" y="170" width="30" height="4" fill="#374151" rx="2"/>
      <text x="300" y="480" text-anchor="middle" fill="#1f2937" font-family="Arial" font-size="20" font-weight="bold">IPHONE</text>
    </svg>
  `)}`,

  macbook: `data:image/svg+xml;base64,${btoa(`
    <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="600" fill="#f3f4f6"/>
      <rect x="150" y="250" width="300" height="200" fill="#1f2937" rx="15"/>
      <rect x="160" y="260" width="280" height="160" fill="#111827" rx="10"/>
      <rect x="170" y="270" width="260" height="140" fill="#374151" rx="5"/>
      <circle cx="300" cy="430" r="8" fill="#6b7280"/>
      <rect x="285" y="280" width="30" height="3" fill="#9ca3af" rx="1"/>
      <text x="300" y="520" text-anchor="middle" fill="#1f2937" font-family="Arial" font-size="20" font-weight="bold">MACBOOK</text>
    </svg>
  `)}`,

  // Image générique pour les erreurs
  placeholder: `data:image/svg+xml;base64,${btoa(`
    <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="600" fill="#f3f4f6"/>
      <rect x="200" y="200" width="200" height="200" fill="#e5e7eb" rx="20"/>
      <circle cx="300" cy="280" r="30" fill="#9ca3af"/>
      <path d="M280 270 L290 280 L300 270 L310 280 L320 270 L320 290 L280 290 Z" fill="#6b7280"/>
      <text x="300" y="380" text-anchor="middle" fill="#6b7280" font-family="Arial" font-size="16">Image</text>
      <text x="300" y="400" text-anchor="middle" fill="#6b7280" font-family="Arial" font-size="16">Loading...</text>
    </svg>
  `)}`
} as const;

// Fonction pour obtenir une image de fallback
export function getFallbackImage(key: string): string {
  return FALLBACK_IMAGES[key as keyof typeof FALLBACK_IMAGES] || FALLBACK_IMAGES.placeholder;
}

// Fonction pour créer une URL d'image avec fallback
export function getImageWithFallback(primaryUrl: string, fallbackKey: string): string {
  // Pour l'instant, on retourne directement l'URL primaire
  // Dans un environnement de production, on pourrait ajouter une logique de retry
  return primaryUrl;
}
