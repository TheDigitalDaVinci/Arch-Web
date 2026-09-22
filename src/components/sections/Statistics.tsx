"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCountUp } from "@/hooks/useCountUp";
import { statistics } from "@/data/content";
import type { Statistic } from "@/types";

gsap.registerPlugin(ScrollTrigger);

function StatItem({
  stat,
  isLast,
}: {
  stat: Statistic;
  isLast: boolean;
}) {
  const countRef = useCountUp({
    end: stat.value,
    duration: 2.5,
    suffix: "",
    triggerStart: "top 80%",
  });

  return (
    <div className="stat-item flex flex-col items-center text-center relative px-4 md:px-8">
      <div className="flex items-baseline">
        <span
          ref={countRef}
          className="text-6xl md:text-8xl xl:text-9xl font-heading text-white leading-none"
          aria-label={`${stat.value}${stat.suffix}`}
        >
          0
        </span>
        <span className="text-accent text-4xl md:text-6xl xl:text-7xl font-heading ml-1">
          {stat.suffix}
        </span>
      </div>
      <p className="text-white/50 text-sm uppercase tracking-widest mt-4 md:mt-6">
        {stat.label}
      </p>

      {/* Gold vertical divider - hidden on last item and on mobile */}
      {!isLast && (
        <div
          className="hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-20 bg-gradient-to-b from-transparent via-accent/40 to-transparent"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default function Statistics() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".stat-item", {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bg-secondary relative py-24 md:py-32 overflow-hidden"
      aria-label="Company statistics"
    >
      {/* Subtle radial gradient background */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,168,107,0.06)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="stats-grid grid grid-cols-2 xl:grid-cols-4 gap-12 md:gap-8">
          {statistics.map((stat, index) => (
            <StatItem
              key={stat.label}
              stat={stat}
              isLast={index === statistics.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
