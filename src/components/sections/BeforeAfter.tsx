"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import NextImage from "next/image";

export default function BeforeAfter() {
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate slider position from pointer event
  const getPositionFromEvent = useCallback(
    (clientX: number) => {
      if (!sliderContainerRef.current) return 50;
      const rect = sliderContainerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      return Math.max(2, Math.min(98, percentage));
    },
    []
  );

  // Mouse events
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setSliderPosition(getPositionFromEvent(e.clientX));
    },
    [getPositionFromEvent]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setSliderPosition(getPositionFromEvent(e.clientX));
    },
    [isDragging, getPositionFromEvent]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
  }, [isDragging]);

  // Touch events
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      setSliderPosition(getPositionFromEvent(e.touches[0].clientX));
    },
    [getPositionFromEvent]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      setSliderPosition(getPositionFromEvent(e.touches[0].clientX));
    },
    [isDragging, getPositionFromEvent]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
  }, [isDragging]);

  // Add/remove global event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      window.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <section
      className="relative bg-secondary py-24 md:py-32 overflow-hidden"
      aria-label="Before and After Transformation"
    >
      {/* Heading */}
      <div className="text-center mb-12 md:mb-16 px-6">
        <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4 font-semibold">
          Renovation
        </p>
        <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white text-balance">
          The Transformation
        </h2>
        <p className="text-white/60 text-base md:text-lg mt-6 max-w-xl mx-auto">
          Drag the slider to reveal the dramatic difference our craftsmanship
          makes.
        </p>
      </div>

      {/* Slider */}
      <div className="max-w-5xl mx-auto px-6">
        <div
          ref={sliderContainerRef}
          className="before-after-container relative aspect-[16/9] rounded-xl select-none shadow-2xl"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          role="slider"
          aria-label="Before and after comparison slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPosition)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              setSliderPosition((prev) => Math.max(2, prev - 2));
            } else if (e.key === "ArrowRight") {
              setSliderPosition((prev) => Math.min(98, prev + 2));
            }
          }}
        >
          {/* "Before" layer */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, #D4C5A9 0%, #BFB08C 30%, #A89570 60%, #8B7A55 100%)",
            }}
          >
            <NextImage
              src="/images/before-after/before.jpg"
              alt="Before renovation"
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          {/* "After" layer — clipped to slider position */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, #1A1A2E 0%, #16213E 30%, #0F3460 60%, #111111 100%)",
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            }}
          >
            <NextImage
              src="/images/before-after/after.jpg"
              alt="After renovation"
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          {/* "BEFORE" label */}
          <span
            className="absolute top-4 left-4 md:top-6 md:left-6 text-xs md:text-sm font-semibold uppercase tracking-widest text-[#7A6A45] bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full z-20 pointer-events-none select-none"
            aria-hidden="true"
          >
            Before
          </span>

          {/* "AFTER" label */}
          <span
            className="absolute top-4 right-4 md:top-6 md:right-6 text-xs md:text-sm font-semibold uppercase tracking-widest text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full z-20 pointer-events-none select-none"
            aria-hidden="true"
          >
            After
          </span>

          {/* Slider line */}
          <div
            className="before-after-slider"
            style={{ left: `${sliderPosition}%` }}
            aria-hidden="true"
          >
            {/* Handle */}
            <div className="before-after-handle">
              <span className="text-white text-sm font-bold select-none flex items-center gap-0.5">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
