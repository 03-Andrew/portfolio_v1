"use client";

import { useEffect } from "react";

interface ImageLightboxProps {
  imageUrl: string;
  onClose: () => void;
}

export default function ImageLightbox({ imageUrl, onClose }: ImageLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-10 cursor-zoom-out animate-fade-in"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-orange p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[110] cursor-pointer"
        aria-label="Close lightbox"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M12 4L4 12M4 4l8 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-full max-h-full flex flex-col items-center justify-center"
      >
        <img
          src={imageUrl}
          alt="Enlarged view"
          className="max-w-[92vw] max-h-[85vh] object-contain rounded-md border border-white/10 shadow-2xl"
        />
        <p className="absolute -bottom-8 left-0 right-0 text-center text-[10px] text-white/40 font-mono uppercase tracking-wider">
          Click anywhere outside the image to close
        </p>
      </div>
    </div>
  );
}
