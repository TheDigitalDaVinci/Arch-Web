"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealType = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "clipUp" | "clipLeft" | "blur";

interface RevealOnScrollProps {
  children: ReactNode;
  type?: RevealType;
  delay?: number;
  duration?: number;
  className?: string;
  start?: string;
  as?: React.ElementType;
}

export default function RevealOnScroll({
  children,
  type = "fadeUp",
  delay = 0,
  duration = 1,
  className = "",
  start = "top 85%",
  as: Component = "div",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  const getFromVars = (): gsap.TweenVars => {
    switch (type) {
      case "fadeUp":
        return { opacity: 0, y: 60 };
      case "fadeDown":
        return { opacity: 0, y: -60 };
      case "fadeLeft":
        return { opacity: 0, x: -60 };
      case "fadeRight":
        return { opacity: 0, x: 60 };
      case "scale":
        return { opacity: 0, scale: 0.85 };
      case "clipUp":
        return { clipPath: "inset(100% 0 0 0)" };
      case "clipLeft":
        return { clipPath: "inset(0 100% 0 0)" };
      case "blur":
        return { opacity: 0, filter: "blur(10px)" };
      default:
        return { opacity: 0, y: 60 };
    }
  };

  const getToVars = (): gsap.TweenVars => {
    switch (type) {
      case "clipUp":
      case "clipLeft":
        return { clipPath: "inset(0 0 0 0)" };
      case "blur":
        return { opacity: 1, filter: "blur(0px)" };
      default:
        return { opacity: 1, y: 0, x: 0, scale: 1 };
    }
  };

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.fromTo(ref.current, getFromVars(), {
        ...getToVars(),
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref }
  );

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
