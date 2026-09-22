"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { materials } from "@/data/content";
import type { Material } from "@/types";

gsap.registerPlugin(ScrollTrigger);

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 128, g: 128, b: 128 };
}

interface MaterialCardProps {
  material: Material;
  index: number;
}

function MaterialCard({ material, index }: MaterialCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { r, g, b } = hexToRgb(material.color);

  const floatDelays = [0, 0.8, 1.6, 2.4, 0.4, 1.2, 2.0];
  const animDelay = `${floatDelays[index % floatDelays.length]}s`;

  return (
    <article
      className="material-card floating group relative rounded-2xl p-6 transition-all duration-500 ease-[var(--ease-smooth)]"
      style={{
        animationDelay: animDelay,
        background: `linear-gradient(135deg, rgba(${r}, ${g}, ${b}, ${isHovered ? 0.2 : 0.1}) 0%, rgba(${r}, ${g}, ${b}, ${isHovered ? 0.1 : 0.04}) 100%)`,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0px)",
        boxShadow: isHovered
          ? `0 24px 48px rgba(0, 0, 0, 0.4), 0 0 60px rgba(${r}, ${g}, ${b}, 0.15)`
          : "0 4px 16px rgba(0, 0, 0, 0.2)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="group"
      aria-label={`Material: ${material.name}`}
    >
      {/* Color accent dot */}
      <div
        className="mb-4 h-3 w-3 rounded-full transition-transform duration-500 ease-[var(--ease-smooth)] group-hover:scale-125"
        style={{ backgroundColor: material.color }}
        aria-hidden="true"
      />

      {/* Material name */}
      <h3 className="font-heading text-xl text-white mb-2">{material.name}</h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-white/60 mb-3">
        {material.description}
      </p>

      {/* Specs list — appears on hover */}
      <div
        className="overflow-hidden transition-all duration-500 ease-[var(--ease-smooth)]"
        style={{
          maxHeight: isHovered ? "200px" : "0px",
          opacity: isHovered ? 1 : 0,
        }}
      >
        <div className="border-t border-white/10 pt-3 mt-1">
          <ul className="space-y-1.5" role="list">
            {material.specs.map((spec, specIndex) => (
              <li
                key={specIndex}
                className="flex items-start gap-2 text-xs text-white/50 transition-all duration-300"
                style={{
                  transitionDelay: isHovered ? `${specIndex * 80}ms` : "0ms",
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered
                    ? "translateY(0px)"
                    : "translateY(8px)",
                }}
              >
                <span
                  className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: material.color }}
                  aria-hidden="true"
                />
                {spec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function MaterialShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Section heading
        gsap.from(".material-heading", {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".material-heading",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // Subtext
        gsap.from(".material-subtext", {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".material-subtext",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // Card stagger
        gsap.from(".material-card", {
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".material-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });

      // Mobile — simpler animations
      mm.add("(max-width: 767px)", () => {
        gsap.from(".material-heading", {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".material-heading",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        gsap.from(".material-card", {
          opacity: 0,
          y: 40,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".material-grid",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden section-padding"
      style={{ backgroundColor: "#111111" }}
      aria-label="Material Palette"
    >
      {/* Subtle background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200, 168, 107, 0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center lg:mb-20">
          <span className="material-heading mb-4 block font-sans text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Premium Selection
          </span>
          <h2 className="material-heading font-heading text-4xl text-white sm:text-5xl lg:text-6xl">
            Material Palette
          </h2>
          <p className="material-subtext mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/50 lg:text-lg">
            We curate the finest materials from around the world — hand-selected
            for their beauty, durability, and timeless appeal. Each element is
            chosen to elevate your space into a work of art.
          </p>
        </div>

        {/* Material Grid */}
        <div className="material-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {materials.map((material, index) => (
            <MaterialCard
              key={material.id}
              material={material}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
