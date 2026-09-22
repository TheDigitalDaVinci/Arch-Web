"use client";

import React, { useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NextImage from "next/image";
import { HiOutlineOfficeBuilding, HiOutlineKey } from "react-icons/hi";
import {
  MdOutlineDesignServices,
  MdOutlineConstruction,
} from "react-icons/md";
import { GiCrane, GiPalmTree } from "react-icons/gi";
import { expertiseCards } from "@/data/content";
import type { ExpertiseCard } from "@/types";

gsap.registerPlugin(ScrollTrigger);

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
   Lifecycle stages — each has an image
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

const TOTAL_STAGES = storyStages.length;

/* ──────────────────────────────────────────────
   Single expertise card with 3D tilt
   ────────────────────────────────────────────── */
interface TiltCardProps {
  card: ExpertiseCard;
  index: number;
}

function TiltCard({ card, index }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;
      const rotateY = (offsetX / (rect.width / 2)) * 8;
      const rotateX = -(offsetY / (rect.height / 2)) * 8;
      gsap.to(el, {
        rotateX, rotateY, translateY: -5,
        boxShadow: "0 25px 60px rgba(0,0,0,0.12)",
        duration: 0.4, ease: "power2.out", overwrite: "auto",
      });
      if (reflectionRef.current) {
        const pctX = ((e.clientX - rect.left) / rect.width) * 100;
        const pctY = ((e.clientY - rect.top) / rect.height) * 100;
        reflectionRef.current.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255,255,255,0.25) 0%, transparent 60%)`;
        reflectionRef.current.style.opacity = "1";
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateX: 0, rotateY: 0, translateY: 0,
      boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
      duration: 0.6, ease: "elastic.out(1, 0.4)", overwrite: "auto",
    });
    if (reflectionRef.current) reflectionRef.current.style.opacity = "0";
  }, []);

  return (
    <div
      ref={cardRef}
      className="expertise-card relative bg-white rounded-2xl p-8 md:p-10 will-change-transform"
      style={{ perspective: "1000px", transformStyle: "preserve-3d", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="article"
      aria-label={card.title}
    >
      <div ref={reflectionRef} className="pointer-events-none absolute inset-0 rounded-2xl z-10 transition-opacity duration-300" style={{ opacity: 0 }} aria-hidden="true" />
      <div className="mb-6" aria-hidden="true">{iconMap[card.icon] ?? null}</div>
      <h3 className="font-heading text-xl text-secondary mb-3">{card.title}</h3>
      <p className="text-text-light text-sm leading-relaxed">{card.description}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main OurExpertise section
   ────────────────────────────────────────────── */
export default function OurExpertise() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cinemaRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  /* ── Section header & card entrance ── */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.from(".expertise-card", {
          opacity: 0, y: 60, duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".expertise-grid", start: "top 82%", toggleActions: "play none none none" },
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.from(".expertise-card", {
          opacity: 0, y: 40, duration: 0.6, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: ".expertise-grid", start: "top 90%", toggleActions: "play none none none" },
        });
      });

      gsap.from(".expertise-header", {
        opacity: 0, y: 50, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".expertise-header", start: "top 85%", toggleActions: "play none none none" },
      });
    },
    { scope: sectionRef }
  );

  /* ═══════════════════════════════════════════════
     PINNED IMAGE MORPH SEQUENCE
     
     Each stage has a full-bleed background image.
     All images are stacked absolutely. GSAP timeline
     crossfades opacity between them as you scroll.
     Text overlays crossfade in sync at fixed center.
     
     No video — pure CSS image crossfade = zero stutter.
   ═══════════════════════════════════════════════ */
  useGSAP(
    () => {
      if (!cinemaRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cinemaRef.current,
            start: "top top",
            end: "+=4000",
            pin: true,
            scrub: 1.5,
            pinSpacing: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const idx = Math.min(
                TOTAL_STAGES - 1,
                Math.floor(self.progress * TOTAL_STAGES)
              );
              setActiveStage(idx);
            },
          },
        });

        const STAGE_DUR = 10 / TOTAL_STAGES; // 2 units per stage

        storyStages.forEach((_, i) => {
          const base = i * STAGE_DUR;

          if (i > 0) {
            // Crossfade: fade OUT previous image, fade IN current image
            tl.to(
              `.morph-img-${i - 1}`,
              { opacity: 0, scale: 1.08, duration: STAGE_DUR * 0.35, ease: "power2.inOut" },
              base
            );
            tl.fromTo(
              `.morph-img-${i}`,
              { opacity: 0, scale: 1.05 },
              { opacity: 1, scale: 1, duration: STAGE_DUR * 0.35, ease: "power2.inOut" },
              base
            );
          }

          // Text: fade in
          tl.fromTo(
            `.cinema-stage-${i}`,
            { opacity: 0 },
            { opacity: 1, duration: STAGE_DUR * 0.15, ease: "power1.out" },
            i === 0 ? 0 : base + STAGE_DUR * 0.1
          );

          // Text: fade out (skip final stage)
          if (i < TOTAL_STAGES - 1) {
            tl.to(
              `.cinema-stage-${i}`,
              { opacity: 0, duration: STAGE_DUR * 0.2, ease: "power1.in" },
              base + STAGE_DUR * 0.75
            );
          }
        });
      });
    },
    { scope: cinemaRef }
  );

  const progressPct = ((activeStage + 1) / TOTAL_STAGES) * 100;

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="bg-background relative overflow-hidden"
      aria-labelledby="expertise-heading"
    >
      {/* ── Section Header ─────────────────── */}
      <div className="section-padding">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="expertise-header relative mb-16 md:mb-24">
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

          <div className="expertise-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {expertiseCards.map((card, i) => (
              <TiltCard key={card.id} card={card} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Pinned Image Morph Section ──────── */}
      <div ref={cinemaRef} className="relative">
        {/* Desktop */}
        <div className="hidden md:block">
          <div className="relative w-full h-screen overflow-hidden bg-black select-none">

            {/* ── Stacked Morphing Images ── */}
            {storyStages.map((stage, i) => (
              <div
                key={stage.step}
                className={`morph-img-${i} absolute inset-0 z-0`}
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <NextImage
                  src={stage.image}
                  alt={stage.title}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="100vw"
                  priority={i === 0}
                />
              </div>
            ))}

            {/* Cinematic overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 z-10 pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.7) 100%)" }} aria-hidden="true" />

            {/* ── Top HUD ── */}
            <div className="absolute top-8 left-10 right-10 z-30 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent" style={{ animation: "pulse 2s ease-in-out infinite" }} />
                <span className="text-white/60 text-[11px] font-sans tracking-[0.25em] uppercase">
                  Architectural Lifecycle
                </span>
              </div>
              <span className="text-white/40 text-[11px] font-mono tracking-wider">
                {storyStages[activeStage]?.step} / {String(TOTAL_STAGES).padStart(2, "0")}
              </span>
            </div>

            {/* ── FIXED CENTER stage text overlays ── */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {storyStages.map((stage, i) => (
                <div
                  key={stage.step}
                  className={`cinema-stage-${i} absolute inset-0 flex flex-col items-center justify-center text-center px-10`}
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  {/* Tag */}
                  <span className="text-accent/90 text-[10px] md:text-xs tracking-[0.4em] uppercase font-sans font-medium mb-5">
                    {stage.tag}
                  </span>

                  {/* Title */}
                  <h3
                    className="font-heading text-4xl md:text-6xl lg:text-7xl text-white font-bold tracking-tight leading-[1.1] mb-6 drop-shadow-lg"
                    style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
                  >
                    {stage.title}
                  </h3>

                  {/* Subtitle */}
                  <p
                    className="text-white/85 text-base md:text-lg font-sans max-w-lg leading-relaxed mb-2"
                    style={{ textShadow: "0 2px 15px rgba(0,0,0,0.6)" }}
                  >
                    {stage.subtitle}
                  </p>

                  {/* Detail */}
                  <p className="text-white/50 text-xs md:text-sm font-sans max-w-md tracking-wide">
                    {stage.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* ── Bottom progress bar ── */}
            <div className="absolute bottom-8 left-10 right-10 z-30 pointer-events-none">
              <div className="h-[1px] bg-white/15 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-accent/80 rounded-full"
                  style={{ width: `${progressPct}%`, transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {storyStages.map((stage, i) => (
                    <span
                      key={stage.step}
                      className="text-[10px] font-sans uppercase tracking-widest transition-all duration-500"
                      style={{
                        color: activeStage >= i ? "#C8A86B" : "rgba(255,255,255,0.25)",
                        fontWeight: activeStage === i ? 600 : 400,
                      }}
                    >
                      {stage.step}
                    </span>
                  ))}
                </div>
                <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase hidden sm:block">
                  Scroll to explore
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden px-6 pb-20 pt-10">
          <p className="text-text-light text-sm uppercase tracking-[0.15em] mb-6 font-semibold">
            Architectural Lifecycle
          </p>
          <div className="space-y-6">
            {storyStages.map((stage) => (
              <div key={stage.step} className="rounded-2xl overflow-hidden bg-secondary border border-white/10 shadow-xl">
                <div className="relative w-full aspect-[16/10]">
                  <NextImage
                    src={stage.image}
                    alt={stage.title}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <span className="text-accent text-xs font-sans tracking-widest uppercase block mb-2 font-semibold">
                    Stage {stage.step} · {stage.tag}
                  </span>
                  <h3 className="font-heading text-2xl text-white mb-2">{stage.title}</h3>
                  <p className="text-white/80 text-sm mb-2">{stage.subtitle}</p>
                  <p className="text-white/50 text-xs">{stage.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
