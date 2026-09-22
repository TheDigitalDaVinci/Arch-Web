"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { statistics } from "@/data/content";
import { useCountUp } from "@/hooks/useCountUp";
import NextImage from "next/image";

gsap.registerPlugin(ScrollTrigger);

/* ─── Individual stat component so each has its own useCountUp hook ─── */
function StatItem({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const countRef = useCountUp({
    end: value,
    suffix: "",
    duration: 2.2,
    triggerStart: "top 85%",
  });

  return (
    <div
      className="stat-item flex flex-col items-center text-center md:items-start md:text-left"
      style={{ "--stat-index": index } as React.CSSProperties}
    >
      <div className="flex items-baseline gap-0.5">
        <span
          ref={countRef}
          className="font-heading text-5xl font-bold text-accent md:text-6xl"
        >
          0
        </span>
        <span className="font-heading text-4xl font-bold text-accent md:text-5xl">
          {suffix}
        </span>
      </div>
      <span className="mt-2 text-sm uppercase tracking-widest text-white/50">
        {label}
      </span>
    </div>
  );
}

export default function WhoWeAre() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ── Section number ── */
        gsap.from(".about-section-number", {
          opacity: 0,
          x: -40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-section-number",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        /* ── Heading reveal ── */
        gsap.from(".about-heading", {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-heading",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        /* ── Paragraphs stagger ── */
        gsap.from(".about-paragraph", {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-paragraphs",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        /* ── Image clip-path reveal ── */
        gsap.fromTo(
          ".about-image",
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.4,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: ".about-image",
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        /* ── Gold divider line ── */
        gsap.from(".about-divider", {
          scaleX: 0,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".about-divider",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        /* ── Stats stagger in ── */
        gsap.from(".stat-item", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-row",
            start: "top 85%",
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
      id="about"
      className="relative overflow-hidden bg-secondary text-white"
      aria-label="About White Rock Builders"
    >
      <div className="section-padding mx-auto max-w-7xl px-6 lg:px-12">
        {/* ── Section number ── */}
        <span
          className="about-section-number mb-12 block font-heading text-[8rem] font-bold leading-none text-transparent md:mb-16 md:text-[12rem]"
          style={{
            WebkitTextStroke: "1px rgba(200, 168, 107, 0.15)",
          }}
          aria-hidden="true"
        >
          01
        </span>

        {/* ── Split layout ── */}
        <div className="grid gap-12 md:grid-cols-5 md:gap-16 lg:gap-24">
          {/* Left column — 60% (3 of 5 cols) */}
          <div className="md:col-span-3">
            <h2 className="about-heading max-w-2xl font-heading text-4xl font-bold leading-[1.1] md:text-5xl lg:text-6xl">
              We Build Dreams
              <br />
              Into Reality
            </h2>

            <div className="about-paragraphs mt-8 max-w-xl space-y-6 md:mt-10">
              <p className="about-paragraph text-base leading-relaxed text-white/70 md:text-lg">
                White Rock Builders &amp; Interiors is a premier design-build
                firm specializing in luxury residences, bespoke interiors, and
                high-end commercial spaces. With over 10 years of experience, we
                have established ourselves as a trusted name in architectural
                excellence, bringing visionary concepts to life with
                uncompromising quality.
              </p>
              <p className="about-paragraph text-base leading-relaxed text-white/70 md:text-lg">
                Our multidisciplinary team of architects, interior designers,
                and construction specialists work in seamless collaboration —
                ensuring every project reflects the unique personality of its
                owner while pushing the boundaries of contemporary design. From
                concept to completion, we craft spaces that inspire and endure.
              </p>
            </div>
          </div>

          {/* Right column — 40% (2 of 5 cols) */}
          <div className="md:col-span-2 flex items-center">
            <div
              className="about-image relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gradient-to-br from-accent/20 to-secondary"
              style={{ clipPath: "inset(100% 0 0 0)" }}
            >
              <NextImage
                src="/images/about/hero.jpg"
                alt="Architectural interior showcase"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>

        {/* ── Gold divider ── */}
        <div
          className="about-divider mx-auto mt-20 h-px w-full origin-left bg-accent/20 md:mt-24"
          aria-hidden="true"
        />

        {/* ── Statistics row ── */}
        <div className="stats-row mt-16 grid grid-cols-2 gap-10 md:mt-20 md:grid-cols-4 md:gap-8">
          {statistics.map((stat, i) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
