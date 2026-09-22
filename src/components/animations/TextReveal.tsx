"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  type?: "chars" | "words" | "lines";
  stagger?: number;
  duration?: number;
  delay?: number;
  className?: string;
  as?: React.ElementType;
  triggerStart?: string;
  from?: "bottom" | "top" | "left" | "right";
  scrub?: boolean;
}

export default function TextReveal({
  children,
  type = "words",
  stagger = 0.05,
  duration = 0.8,
  delay = 0,
  className = "",
  as: Component = "div",
  triggerStart = "top 85%",
  from = "bottom",
  scrub = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const text = containerRef.current;
      const content = text.textContent || "";
      let elements: string[] = [];

      switch (type) {
        case "chars":
          elements = content.split("");
          break;
        case "words":
          elements = content.split(" ");
          break;
        case "lines":
          elements = [content];
          break;
      }

      // Wrap each element in overflow-hidden span containing the animated span
      text.innerHTML = elements
        .map(
          (el) =>
            `<span style="display:inline-block;overflow:hidden;vertical-align:top"><span class="reveal-el" style="display:inline-block;will-change:transform">${el}${type === "words" ? "&nbsp;" : ""}</span></span>`
        )
        .join("");

      const revealEls = text.querySelectorAll(".reveal-el");

      const fromVars: Record<string, gsap.TweenVars> = {
        bottom: { y: "110%", opacity: 0 },
        top: { y: "-110%", opacity: 0 },
        left: { x: "-50px", opacity: 0 },
        right: { x: "50px", opacity: 0 },
      };

      gsap.from(revealEls, {
        ...fromVars[from],
        duration,
        stagger,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: text,
          start: triggerStart,
          toggleActions: scrub ? undefined : "play none none none",
          scrub: scrub ? 1 : false,
        },
      });
    },
    { scope: containerRef as React.RefObject<HTMLDivElement> }
  );

  return (
    <Component ref={containerRef} className={className}>
      {children}
    </Component>
  );
}
