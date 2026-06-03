"use client";

import { useState, useEffect, useRef } from "react";

interface ProjectImageSliderProps {
  images: string[];
  title: string;
  video?: string;
  aspectRatio?: "16/10" | "video";
}

interface SlideItem {
  type: "image" | "video";
  url: string;
}

const INTERVAL_MS = 5000;

export default function ProjectImageSlider({
  images,
  title,
  video,
  aspectRatio = "16/10",
}: ProjectImageSliderProps) {
  const slides: SlideItem[] = [
    ...(video ? [{ type: "video" as const, url: video }] : []),
    ...images.map((img) => ({ type: "image" as const, url: img })),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxImageUrl, setLightboxImageUrl] = useState<string | null>(null);
  const [tallestRatio, setTallestRatio] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const remainingTimeRef = useRef<number>(INTERVAL_MS);

  const currentSlide = slides[currentIndex];
  const isVideoSlide = currentSlide?.type === "video";

  // Preload images to determine the aspect ratio of the tallest image
  useEffect(() => {
    if (!images || images.length === 0) return;

    const loadedRatios: number[] = new Array(images.length);
    let loadedCount = 0;

    images.forEach((url, index) => {
      const img = new globalThis.Image();
      img.src = url;
      img.onload = () => {
        if (img.width && img.height) {
          // Width divided by height gives the aspect ratio.
          // The smallest aspect ratio value corresponds to the tallest height (e.g. 1.6 is taller than 1.77)
          loadedRatios[index] = img.width / img.height;
        }
        loadedCount++;
        if (loadedCount === images.length) {
          const validRatios = loadedRatios.filter((r) => r !== undefined && !isNaN(r));
          if (validRatios.length > 0) {
            const minRatio = Math.min(...validRatios);
            setTallestRatio(minRatio);
          }
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          const validRatios = loadedRatios.filter((r) => r !== undefined && !isNaN(r));
          if (validRatios.length > 0) {
            const minRatio = Math.min(...validRatios);
            setTallestRatio(minRatio);
          }
        }
      };
    });
  }, [images]);

  const handleNext = () => {
    remainingTimeRef.current = INTERVAL_MS;
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    remainingTimeRef.current = INTERVAL_MS;
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleSegmentClick = (idx: number) => {
    remainingTimeRef.current = INTERVAL_MS;
    setCurrentIndex(idx);
  };

  // Timer for automatic sliding (only active for image slides)
  useEffect(() => {
    if (slides.length <= 1) return;

    if (!isPaused && !isVideoSlide) {
      startTimeRef.current = Date.now();
      timerRef.current = setTimeout(() => {
        handleNext();
      }, remainingTimeRef.current);
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        const elapsed = Date.now() - startTimeRef.current;
        remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isPaused, isVideoSlide, slides.length]);

  // YouTube Player API listener to scroll next when video ends
  useEffect(() => {
    if (!isVideoSlide || !isYouTubeUrl(currentSlide.url)) return;

    const handleYoutubeMessage = (event: MessageEvent) => {
      if (!event.origin.includes("youtube.com")) return;
      try {
        let data = event.data;
        if (typeof data === "string") {
          data = JSON.parse(data);
        }
        // playerState === 0 means ended
        if (data && data.event === "infoDelivery" && data.info?.playerState === 0) {
          handleNext();
        }
      } catch (e) {
        // Ignore parsing errors
      }
    };

    window.addEventListener("message", handleYoutubeMessage);
    return () => {
      window.removeEventListener("message", handleYoutubeMessage);
    };
  }, [currentIndex, isVideoSlide, currentSlide]);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxImageUrl(null);
      }
    };
    if (lightboxImageUrl) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxImageUrl]);

  if (!slides || slides.length === 0) return null;

  // Determine active aspect ratio (use calculated tallest image ratio, or fall back to prop configuration)
  const defaultRatio = aspectRatio === "video" ? 16 / 9 : 16 / 10;
  const activeRatio = tallestRatio !== null ? tallestRatio : defaultRatio;

  return (
    <div
      className="relative flex flex-col w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes slider-progress-run {
              from { transform: scaleX(0); }
              to { transform: scaleX(1); }
            }
            .animate-slider-progress {
              transform-origin: left;
              animation: slider-progress-run ${INTERVAL_MS}ms linear forwards;
            }
            @keyframes fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-fade-in {
              animation: fade-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `,
        }}
      />

      {/* Main Slideshow viewport (Clicking opens Lightbox for images) */}
      <div
        onClick={() => {
          if (currentSlide?.type === "image") {
            setLightboxImageUrl(currentSlide.url);
          }
        }}
        className={`relative w-full overflow-hidden rounded-lg border border-border bg-surface shadow-sm group ${
          currentSlide?.type === "image" ? "cursor-zoom-in" : ""
        }`}
        style={{
          aspectRatio: activeRatio,
        }}
      >
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          if (slide.type === "video") {
            return (
              <div
                key={idx}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {isActive ? (
                  isYouTubeUrl(slide.url) ? (
                    <iframe
                      src={getYouTubeEmbedUrl(slide.url)}
                      title={`${title} Demo Video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0 absolute inset-0 animate-fade-in"
                    />
                  ) : (
                    <div className="w-full h-full p-2 flex items-center justify-center bg-surface animate-fade-in">
                      <video
                        src={slide.url}
                        controls
                        autoPlay
                        muted
                        preload="auto"
                        playsInline
                        onEnded={handleNext}
                        className="w-full h-full max-h-full object-contain block rounded"
                      />
                    </div>
                  )
                ) : (
                  <div className="w-full h-full bg-surface" />
                )}
              </div>
            );
          } else {
            return (
              <img
                key={idx}
                src={slide.url}
                alt={`${title} Screenshot ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
                loading={idx === 0 ? "eager" : "lazy"}
              />
            );
          }
        })}

        {/* Subtle Zoom Indicator on Hover (only for images) */}
        {currentSlide?.type === "image" && (
          <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 p-3 rounded-full bg-black/60 text-white backdrop-blur-sm border border-white/10 pointer-events-none">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Progress Indicators Segment Bar with Arrow Buttons on the Sides */}
      {slides.length > 1 && (
        <div className="flex items-center gap-3 w-full mt-4">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-full text-text-secondary hover:text-orange hover:bg-surface-elevated transition-colors duration-200 cursor-pointer focus:outline-none flex items-center justify-center shrink-0 border border-border"
            aria-label="Previous slide"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 13L5 8l5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Progress Segments */}
          <div className="flex-1 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSegmentClick(idx)}
                className="flex-1 h-1 bg-border/40 rounded-full overflow-hidden relative cursor-pointer focus:outline-none"
                aria-label={`Go to slide ${idx + 1}`}
              >
                {idx === currentIndex ? (
                  <div
                    className="h-full bg-orange animate-slider-progress w-full"
                    style={{
                      animationPlayState: isPaused || isVideoSlide ? "paused" : "running",
                    }}
                  />
                ) : idx < currentIndex ? (
                  <div className="h-full bg-orange/60 w-full" />
                ) : (
                  <div className="h-full bg-transparent w-full" />
                )}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="p-1.5 rounded-full text-text-secondary hover:text-orange hover:bg-surface-elevated transition-colors duration-200 cursor-pointer focus:outline-none flex items-center justify-center shrink-0 border border-border"
            aria-label="Next slide"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 13l5-5-5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Lightbox Modal (Larger Image Zoom overlay) */}
      {lightboxImageUrl && (
        <div
          onClick={() => setLightboxImageUrl(null)}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-10 cursor-zoom-out animate-fade-in"
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxImageUrl(null)}
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

          {/* Large Image container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-full max-h-full flex flex-col items-center justify-center"
          >
            <img
              src={lightboxImageUrl}
              alt="Enlarged screenshot view"
              className="max-w-[92vw] max-h-[85vh] object-contain rounded-md border border-white/10 shadow-2xl"
            />
            <p className="absolute -bottom-8 left-0 right-0 text-center text-[10px] text-white/40 font-mono uppercase tracking-wider">
              Click anywhere outside the image to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Helpers for YouTube URL detection & embeds inside the slider
const isYouTubeUrl = (url: string): boolean => {
  return url.includes("youtube.com") || url.includes("youtu.be");
};

const getYouTubeEmbedUrl = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    const id = match[2];
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`;
  }
  return url;
};
