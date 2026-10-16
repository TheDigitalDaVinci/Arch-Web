"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { companyInfo } from "@/data/content";

const SESSION_KEY = "whiterock_loaded";

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  // Check session storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const alreadyLoaded = sessionStorage.getItem(SESSION_KEY);
      if (alreadyLoaded) {
        setIsVisible(false);
        setShouldRender(false);
      }
    }
  }, []);

  // Simulated progress
  useEffect(() => {
    if (!isVisible) return;

    let currentProgress = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const increment = () => {
      // Variable speed: fast start, slow middle, fast end
      let step: number;
      if (currentProgress < 30) {
        step = Math.random() * 8 + 4;
      } else if (currentProgress < 70) {
        step = Math.random() * 4 + 1;
      } else if (currentProgress < 90) {
        step = Math.random() * 6 + 3;
      } else {
        step = Math.random() * 3 + 2;
      }

      currentProgress = Math.min(currentProgress + step, 100);
      setProgress(Math.round(currentProgress));

      if (currentProgress < 100) {
        const delay = currentProgress < 30 ? 80 : currentProgress < 70 ? 120 : 60;
        timeoutId = setTimeout(increment, delay);
      } else {
        setIsComplete(true);
      }
    };

    // Start after a brief pause for logo to fade in
    timeoutId = setTimeout(increment, 500);

    return () => clearTimeout(timeoutId);
  }, [isVisible]);

  // Animate logo on mount
  useEffect(() => {
    if (!isVisible || !logoRef.current) return;

    gsap.fromTo(
      logoRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.1 }
    );
  }, [isVisible]);

  // Exit animation when complete
  const handleExit = useCallback(() => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current, {
      y: "-100%",
      duration: 1,
      ease: "power3.inOut",
      delay: 0.3,
      onComplete: () => {
        setIsVisible(false);
        setShouldRender(false);
        document.body.style.overflow = "";
        if (typeof window !== "undefined") {
          sessionStorage.setItem(SESSION_KEY, "true");
        }
      },
    });
  }, []);

  useEffect(() => {
    if (isComplete) {
      handleExit();
    }
  }, [isComplete, handleExit]);

  // Lock scroll while loading
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="loading-screen"
      aria-hidden="true"
      role="presentation"
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div ref={logoRef} className="flex flex-col items-center gap-2" style={{ opacity: 0 }}>
          {companyInfo.logo ? (
            <Image
              src={companyInfo.logo}
              alt={companyInfo.name}
              width={260}
              height={61}
              priority
              className="h-12 w-auto object-contain md:h-14"
            />
          ) : (
            <>
              <span className="font-heading text-2xl font-semibold tracking-[0.3em] text-white sm:text-3xl md:text-4xl">
                WHITE ROCK
              </span>
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-accent/40" />
                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
                  Builders &amp; Interiors
                </span>
                <span className="h-px w-6 bg-accent/40" />
              </div>
            </>
          )}
        </div>

        {/* Progress Bar */}
        <div className="loading-progress-bar">
          <div
            ref={progressFillRef}
            className="loading-progress-fill"
            style={{
              transform: `scaleX(${progress / 100})`,
            }}
          />
        </div>

        {/* Progress Counter */}
        <span
          ref={counterRef}
          className="text-[12px] font-light tabular-nums tracking-[0.3em] text-white/50"
        >
          {progress}%
        </span>
      </div>
    </div>
  );
}
