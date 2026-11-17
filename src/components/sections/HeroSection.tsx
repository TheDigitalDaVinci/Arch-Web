"use client";

import { companyInfo } from "@/data/content";

export default function HeroSection() {
  const headingText = "Crafting Timeless Spaces.";
  const words = headingText.split(" ");

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-secondary"
      aria-label="Hero"
    >
      {/* ── Background & Drone Video ── */}
      <div className="absolute inset-0" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="/videos/hero-drone.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Dark overlay gradient ── */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 50%, rgba(0,0,0,0.4) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Decorative corner lines ── */}
      {/* Top-left */}
      <div className="absolute top-8 left-8 z-[3] hidden md:block" aria-hidden="true">
        <div className="h-px w-16 bg-accent/40" />
        <div className="w-px h-16 bg-accent/40" />
      </div>
      {/* Top-right */}
      <div className="absolute top-8 right-8 z-[3] hidden md:block" aria-hidden="true">
        <div className="h-px w-16 bg-accent/40 ml-auto" />
        <div className="w-px h-16 bg-accent/40 ml-auto" />
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-8 left-8 z-[3] hidden md:block" aria-hidden="true">
        <div className="w-px h-16 bg-accent/40" />
        <div className="h-px w-16 bg-accent/40" />
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-8 right-8 z-[3] hidden md:block" aria-hidden="true">
        <div className="w-px h-16 bg-accent/40 ml-auto" />
        <div className="h-px w-16 bg-accent/40 ml-auto" />
      </div>

      {/* ── Main hero content ── */}
      <div className="relative z-[4] flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Heading */}
        <h1 className="max-w-4xl font-heading text-5xl font-bold leading-[1.05] text-white md:text-7xl xl:text-8xl">
          {words.map((word, i) => (
            <span key={i} className="inline-block mr-[0.25em] last:mr-0">
              {word}
            </span>
          ))}
        </h1>

        {/* Subheading */}
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:mt-8 md:text-xl">
          We design and build premium residences, villas, commercial spaces and
          luxury interiors.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6 md:mt-12">
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-widest text-secondary transition-colors hover:bg-accent-light"
          >
            Explore Projects
          </a>
          <a
            href={companyInfo.consultationForm}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:border-accent hover:text-accent"
            aria-label="Book Consultation (opens Google Form)"
          >
            Book Consultation
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-10 left-1/2 z-[4] flex -translate-x-1/2 flex-col items-center gap-3">
        {/* Mouse shape */}
        <div
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 pt-2"
          aria-hidden="true"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-accent" />
        </div>
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
          Scroll to explore
        </span>
      </div>
    </section>
  );
}
