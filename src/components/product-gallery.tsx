"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/product-image";

interface ProductGalleryProps {
  images: { id: string; url: string; alt: string }[];
  productName: string;
  videos?: { id: string; url: string; thumbnail: string }[];
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const currentImage = images[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
    setIsZoomed(false);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setIsZoomed(false);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground">No image</span>
      </div>
    );
  }

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-4">
        {/* Main Image Container */}
        <div className="relative group">
          <div className="aspect-square relative rounded-lg overflow-hidden bg-muted w-full h-full">
            <ProductImage
              src={currentImage.url}
              alt={currentImage.alt || `${productName} - Image ${currentImageIndex + 1}`}
              fill
              context="gallery"
              priority={currentImageIndex === 0}
              className="cursor-pointer transition-transform hover:scale-105"
              objectPosition="center"
              onClick={openLightbox}
            />

            {/* Zoom Button */}
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={openLightbox}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentImageIndex
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-muted hover:border-muted-foreground/50"
                }`}
              >
                <ProductImage
                  src={image.url}
                  alt={image.alt || `${productName} - Thumbnail ${index + 1}`}
                  fill
                  context="thumbnail"
                  className="object-cover"
                  objectPosition="center"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <Button
              variant="secondary"
              size="sm"
              className="absolute -top-12 right-0 z-10"
              onClick={closeLightbox}
            >
              <X className="h-4 w-4" />
              Close
            </Button>

            {/* Main Lightbox Image */}
            <div className="relative">
              <ProductImage
                src={currentImage.url}
                alt={currentImage.alt || `${productName} - Image ${currentImageIndex + 1}`}
                width={800}
                height={800}
                className={`w-full h-auto max-h-[80vh] object-contain ${
                  isZoomed ? "cursor-zoom-out scale-150" : "cursor-zoom-in"
                } transition-transform`}
                onClick={toggleZoom}
              />

              {/* Lightbox Navigation */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Lightbox Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Lightbox Thumbnails */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 mt-4 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-white ring-2 ring-white/20"
                        : "border-white/30 hover:border-white/50"
                    }`}
                  >
                    <ProductImage
                      src={image.url}
                      alt={image.alt || `${productName} - Thumbnail ${index + 1}`}
                      fill
                      context="thumbnail"
                      className="object-cover"
                      objectPosition="center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
