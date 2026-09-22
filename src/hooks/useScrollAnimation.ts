"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationType = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "rotate" | "clipUp" | "clipLeft" | "blur";

interface UseScrollAnimationOptions {
  type?: AnimationType;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  once?: boolean;
}

const animationPresets: Record<AnimationType, gsap.TweenVars> = {
  fadeUp: { opacity: 0, y: 60 },
  fadeDown: { opacity: 0, y: -60 },
  fadeLeft: { opacity: 0, x: -60 },
  fadeRight: { opacity: 0, x: 60 },
  scale: { opacity: 0, scale: 0.85 },
  rotate: { opacity: 0, rotateX: 15, transformOrigin: "bottom center" },
  clipUp: { clipPath: "inset(100% 0 0 0)" },
  clipLeft: { clipPath: "inset(0 100% 0 0)" },
  blur: { opacity: 0, filter: "blur(10px)" },
};

export function useScrollAnimation(
  selector: string,
  options: UseScrollAnimationOptions = {}
) {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    type = "fadeUp",
    duration = 1,
    delay = 0,
    stagger = 0.1,
    start = "top 85%",
    end,
    scrub = false,
    markers = false,
    toggleActions = "play none none none",
    once = true,
  } = options;

  useGSAP(
    () => {
      const elements = gsap.utils.toArray(selector);
      if (elements.length === 0) return;

      const fromVars = animationPresets[type];

      gsap.from(elements, {
        ...fromVars,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elements[0] as Element,
          start,
          end,
          scrub,
          markers,
          toggleActions,
          once,
        },
      });
    },
    { scope: containerRef }
  );

  return containerRef;
}

export function useParallax(selector: string, speed: number = 0.3) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const elements = gsap.utils.toArray(selector);
      elements.forEach((el) => {
        gsap.to(el as Element, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el as Element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return containerRef;
}

export function useTextReveal(selector: string, options?: { stagger?: number; delay?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const elements = gsap.utils.toArray(selector);
      elements.forEach((el) => {
        const text = el as HTMLElement;
        const words = text.textContent?.split(" ") || [];
        text.innerHTML = words
          .map((word) => `<span class="inline-block overflow-hidden"><span class="inline-block reveal-word" style="transform: translateY(100%)">${word}</span></span>`)
          .join(" ");

        gsap.to(text.querySelectorAll(".reveal-word"), {
          y: 0,
          duration: 0.8,
          stagger: options?.stagger || 0.05,
          delay: options?.delay || 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return containerRef;
}

export function useMagneticEffect() {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: ref as React.RefObject<HTMLDivElement> });

  return ref;
}
