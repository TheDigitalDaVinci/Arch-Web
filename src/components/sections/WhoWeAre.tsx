"use client";

import { statistics } from "@/data/content";
import NextImage from "next/image";

function StatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
      <div className="flex items-baseline gap-0.5">
        <span className="font-heading text-5xl font-bold text-accent md:text-6xl">
          {value}
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
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-secondary text-white"
      aria-label="About White Rock Builders"
    >
      <div className="section-padding mx-auto max-w-7xl px-6 lg:px-12">
        {/* ── Section number ── */}
        <span
          className="mb-12 block font-heading text-[8rem] font-bold leading-none text-transparent md:mb-16 md:text-[12rem]"
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
            <h2 className="max-w-2xl font-heading text-4xl font-bold leading-[1.1] md:text-5xl lg:text-6xl">
              We Build Dreams
              <br />
              Into Reality
            </h2>

            <div className="mt-8 max-w-xl space-y-6 md:mt-10">
              <p className="text-base leading-relaxed text-white/70 md:text-lg">
                White Rock Builders &amp; Interiors is a premier design-build
                firm specializing in luxury residences, bespoke interiors, and
                high-end commercial spaces. With over 10 years of experience, we
                have established ourselves as a trusted name in architectural
                excellence, bringing visionary concepts to life with
                uncompromising quality.
              </p>
              <p className="text-base leading-relaxed text-white/70 md:text-lg">
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
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gradient-to-br from-accent/20 to-secondary shadow-2xl">
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
          className="mx-auto mt-20 h-px w-full bg-accent/20 md:mt-24"
          aria-hidden="true"
        />

        {/* ── Statistics row ── */}
        <div className="mt-16 grid grid-cols-2 gap-10 md:mt-20 md:grid-cols-4 md:gap-8">
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
