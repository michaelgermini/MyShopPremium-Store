import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { getFallbackImage } from "@/lib/fallback-images";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  quality?: number;
  objectPosition?: string;
  sizes?: string;
  context?: 'card' | 'detail' | 'thumbnail' | 'hero' | 'gallery';
}

export function ProductImage({
  src,
  alt,
  className,
  priority = false,
  fill = false,
  width,
  height,
  quality = 85,
  objectPosition = "center",
  sizes,
  context = 'card',
}: ProductImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Configuration optimisée selon le contexte d'usage
  const getOptimizedSizes = () => {
    switch (context) {
      case 'hero':
        return sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px";
      case 'detail':
        return sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px";
      case 'gallery':
        return sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px";
      case 'thumbnail':
        return sizes || "(max-width: 768px) 50vw, 200px";
      case 'card':
      default:
        return sizes || "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px";
    }
  };

  const optimizedSizes = getOptimizedSizes();

  // Gestionnaire d'erreur pour utiliser l'image de fallback
  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Déterminer quelle image de fallback utiliser basée sur l'alt ou le contexte
      let fallbackKey = 'placeholder';
      if (alt.toLowerCase().includes('yoga')) fallbackKey = 'yogaMat';
      else if (alt.toLowerCase().includes('running') || alt.toLowerCase().includes('shoe')) fallbackKey = 'runningShoes';
      else if (alt.toLowerCase().includes('dumbbell')) fallbackKey = 'dumbbells';
      else if (alt.toLowerCase().includes('fitness') || alt.toLowerCase().includes('ball')) fallbackKey = 'fitnessBall';
      else if (alt.toLowerCase().includes('t-shirt') || alt.toLowerCase().includes('tshirt')) fallbackKey = 'tshirt';
      else if (alt.toLowerCase().includes('hoodie')) fallbackKey = 'hoodie';
      else if (alt.toLowerCase().includes('iphone')) fallbackKey = 'iphone';
      else if (alt.toLowerCase().includes('macbook')) fallbackKey = 'macbook';

      setImageSrc(getFallbackImage(fallbackKey));
    }
  };

  if (fill) {
    return (
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className={cn("object-cover object-center", className)}
          style={{ objectPosition }}
          priority={priority}
          quality={quality}
          sizes={optimizedSizes}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
          onError={handleError}
        />
      </div>
    );
  }

  const defaultWidth = context === 'thumbnail' ? 200 : context === 'detail' ? 800 : 400;
  const defaultHeight = context === 'thumbnail' ? 200 : context === 'detail' ? 800 : 400;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width || defaultWidth}
      height={height || defaultHeight}
      className={cn("object-cover object-center", className)}
      style={{ objectPosition }}
      priority={priority}
      quality={quality}
      sizes={optimizedSizes}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
      onError={handleError}
    />
  );
}
