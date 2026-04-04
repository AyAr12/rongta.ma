"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "@/lib/api";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasImages = images && images.length > 0;
  const hasMultipleImages = images.length > 1;

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!hasImages) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-l-xl rounded-r-none border border-border bg-secondary/40">
        <span className="text-6xl opacity-20">📦</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-l-xl rounded-r-none border border-border bg-secondary/30">
        <Image
          src={getImageUrl(images[activeIndex])}
          alt={`${productName} — Image ${activeIndex + 1}`}
          fill
          className="object-cover transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Image précédente"
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition hover:bg-black/70"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Image suivante"
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition hover:bg-black/70"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-black/35 px-3 py-1.5 backdrop-blur-sm">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Aller à l'image ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === activeIndex
                      ? "bg-white"
                      : "bg-white/45 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {hasMultipleImages && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Afficher l'image ${i + 1}`}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:h-20 sm:w-20 ${
                i === activeIndex
                  ? "border-primary shadow-sm"
                  : "border-border opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={getImageUrl(img)}
                alt={`${productName} — Miniature ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
