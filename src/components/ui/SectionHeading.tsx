"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  number?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  number,
  title,
  subtitle,
  align = "left",
  light = false,
  className = "",
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      if (number) {
        tl.from(".section-number", {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        });
      }

      tl.from(
        ".section-title",
        {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
        },
        number ? "-=0.3" : 0
      );

      if (subtitle) {
        tl.from(
          ".section-subtitle",
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`mb-12 md:mb-16 lg:mb-20 ${align === "center" ? "text-center" : ""} ${className}`}
    >
      {number && (
        <span
          className={`section-number block text-sm font-sans font-medium tracking-[0.3em] uppercase mb-4 ${
            light ? "text-accent" : "text-accent"
          }`}
        >
          {number}
        </span>
      )}
      <h2
        className={`section-title font-heading text-4xl md:text-5xl lg:text-6xl ${
          light ? "text-white" : "text-secondary"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`section-subtitle mt-4 md:mt-6 text-base md:text-lg max-w-2xl leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-white/60" : "text-text-light"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
