"use client";

import { useState } from "react";
import ImageLightbox from "./ImageLightbox";

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export default function ZoomableImage({
  src,
  alt,
  className = "",
  containerClassName = "",
}: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsZoomed(true)}
        className={`relative w-full overflow-hidden rounded-lg bg-surface border border-border/20 group hover:border-border/40 transition-colors duration-300 cursor-zoom-in ${containerClassName}`}
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-auto object-contain block ${className}`}
          loading="lazy"
        />

        {/* Zoom indicator on hover */}
        <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
          <div className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 p-3 rounded-full bg-black/60 text-white backdrop-blur-sm border border-white/10">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
        </div>
      </div>

      {isZoomed && (
        <ImageLightbox imageUrl={src} onClose={() => setIsZoomed(false)} />
      )}
    </>
  );
}
