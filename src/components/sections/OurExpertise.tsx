"use client";

import React from "react";
import NextImage from "next/image";
import { HiOutlineOfficeBuilding, HiOutlineKey } from "react-icons/hi";
import {
  MdOutlineDesignServices,
  MdOutlineConstruction,
} from "react-icons/md";
import { GiCrane, GiPalmTree } from "react-icons/gi";
import { expertiseCards } from "@/data/content";
import type { ExpertiseCard } from "@/types";

/* ──────────────────────────────────────────────
   Icon resolver
   ────────────────────────────────────────────── */
const iconMap: Record<string, React.ReactNode> = {
  architecture: <HiOutlineOfficeBuilding size={32} className="text-accent" />,
  interior: <MdOutlineDesignServices size={32} className="text-accent" />,
  construction: <GiCrane size={32} className="text-accent" />,
  renovation: <MdOutlineConstruction size={32} className="text-accent" />,
  landscape: <GiPalmTree size={32} className="text-accent" />,
  turnkey: <HiOutlineKey size={32} className="text-accent" />,
};

/* ──────────────────────────────────────────────
   Lifecycle stages
   ────────────────────────────────────────────── */
const storyStages = [
  {
    step: "01",
    tag: "VISION & BLUEPRINT",
    title: "Architectural Sketch",
    subtitle: "From visionary initial concepts to structural masterplans.",
    detail: "Site analysis, solar orientation mapping, and spatial flow optimization.",
    image: "/images/lifecycle/sketch.jpg",
  },
  {
    step: "02",
    tag: "STRUCTURAL ENGINEERING",
    title: "Wireframe & Engineering",
    subtitle: "Precise 3D spatial modeling and load-bearing calculations.",
    detail: "Sub-millimeter BIM integration and advanced structural analysis.",
    image: "/images/lifecycle/wireframe.jpg",
  },
  {
    step: "03",
    tag: "VIRTUAL WALKTHROUGH",
    title: "3D Photorealistic Render",
    subtitle: "Immersive virtual walkthroughs before a single stone is placed.",
    detail: "Ray-traced lighting simulation and material fidelity verification.",
    image: "/images/lifecycle/3d-model.jpg",
  },
  {
    step: "04",
    tag: "MASTER CRAFTSMANSHIP",
    title: "Precision Construction",
    subtitle: "Craftsmanship executed with sub-millimeter quality control.",
    detail: "On-site engineering supervision and sustainable material assembly.",
    image: "/images/lifecycle/construction.jpg",
  },
  {
    step: "05",
    tag: "BESPOKE DELIVERY",
    title: "Finished Handover",
    subtitle: "The realization of a bespoke, timeless architectural space.",
    detail: "White-glove interior styling, smart automation, and turnkey handover.",
    image: "/images/lifecycle/finished.jpg",
  },
];

/* ──────────────────────────────────────────────
   Single expertise card
   ────────────────────────────────────────────── */
function ExpertiseCardItem({ card }: { card: ExpertiseCard }) {
  return (
    <div
      className="relative bg-white rounded-2xl p-8 md:p-10 border border-border/80 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-accent/40"
      role="article"
      aria-label={card.title}
    >
      <div className="mb-6" aria-hidden="true">
        {iconMap[card.icon] ?? null}
      </div>
      <h3 className="font-heading text-xl text-secondary mb-3">{card.title}</h3>
      <p className="text-text-light text-sm leading-relaxed">{card.description}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main OurExpertise section
   ────────────────────────────────────────────── */
export default function OurExpertise() {
  return (
    <section
      id="expertise"
      className="bg-background relative overflow-hidden"
      aria-labelledby="expertise-heading"
    >
      {/* ── Section Header ─────────────────── */}
      <div className="section-padding">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="relative mb-16 md:mb-24">
            <span
              className="absolute -top-8 md:-top-12 left-0 text-[6rem] md:text-[10rem] font-heading font-bold leading-none select-none pointer-events-none"
              style={{ WebkitTextStroke: "1px rgba(200,168,107,0.18)", color: "transparent" }}
              aria-hidden="true"
            >
              02
            </span>
            <h2 id="expertise-heading" className="font-heading text-4xl md:text-6xl text-secondary mb-4 relative z-10">
              Our Expertise
            </h2>
            <p className="text-text-light max-w-xl text-base md:text-lg relative z-10">
              Six pillars of design and construction excellence, delivered with
              meticulous attention to every detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {expertiseCards.map((card) => (
              <ExpertiseCardItem key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Architectural Lifecycle Section (Static Grid, Zero Pinning) ── */}
      <div className="bg-secondary py-20 md:py-28 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase">
                Methodology
              </span>
            </div>
            <h3 className="font-heading text-3xl md:text-5xl text-white mb-4">
              Architectural Lifecycle
            </h3>
            <p className="text-white/60 max-w-2xl text-sm md:text-base">
              A disciplined, phased journey from foundational sketches to precision turnkey handover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {storyStages.map((stage) => (
              <div
                key={stage.step}
                className="rounded-2xl overflow-hidden bg-white/[0.04] border border-white/10 shadow-xl flex flex-col justify-between"
              >
                <div className="relative w-full aspect-[16/10]">
                  <NextImage
                    src={stage.image}
                    alt={stage.title}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-accent text-xs font-semibold uppercase tracking-wider">
                    Stage {stage.step}
                  </span>
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-accent/80 text-[11px] font-sans tracking-widest uppercase block mb-2 font-medium">
                      {stage.tag}
                    </span>
                    <h4 className="font-heading text-2xl text-white mb-2">
                      {stage.title}
                    </h4>
                    <p className="text-white/80 text-sm mb-3 leading-relaxed">
                      {stage.subtitle}
                    </p>
                  </div>
                  <p className="text-white/45 text-xs border-t border-white/10 pt-3">
                    {stage.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
