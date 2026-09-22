"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  separator?: string;
  scrollTrigger?: boolean;
  triggerStart?: string;
}

export function useCountUp(options: UseCountUpOptions) {
  const {
    end,
    duration = 2,
    start = 0,
    decimals = 0,
    suffix = "",
    prefix = "",
    separator = ",",
    scrollTrigger: enableScrollTrigger = true,
    triggerStart = "top 80%",
  } = options;

  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useGSAP(
    () => {
      if (!ref.current || hasAnimated) return;

      const counter = { value: start };

      const formatNumber = (num: number) => {
        const fixed = num.toFixed(decimals);
        if (separator) {
          const parts = fixed.split(".");
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
          return parts.join(".");
        }
        return fixed;
      };

      const updateDisplay = () => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${formatNumber(counter.value)}${suffix}`;
        }
      };

      // Set initial value
      ref.current.textContent = `${prefix}${formatNumber(start)}${suffix}`;

      const tween = gsap.to(counter, {
        value: end,
        duration,
        ease: "power2.out",
        onUpdate: updateDisplay,
        onComplete: () => setHasAnimated(true),
        ...(enableScrollTrigger
          ? {
              scrollTrigger: {
                trigger: ref.current,
                start: triggerStart,
                toggleActions: "play none none none",
              },
            }
          : {}),
      });

      return () => {
        tween.kill();
      };
    },
    { scope: ref as React.RefObject<HTMLDivElement>, dependencies: [hasAnimated] }
  );

  return ref;
}
