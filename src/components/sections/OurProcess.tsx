"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiOutlineUsers,
  HiOutlineClipboardList,
  HiOutlineLightBulb,
  HiOutlinePencil,
  HiOutlineCube,
  HiOutlineColorSwatch,
  HiOutlineCog,
  HiOutlineKey,
} from "react-icons/hi";
import { processSteps } from "@/data/content";
import type { ProcessStep } from "@/types";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────
   Icon resolver
   ────────────────────────────────────────────── */
const iconMap: Record<string, React.ReactNode> = {
  meeting: <HiOutlineUsers size={28} />,
  planning: <HiOutlineClipboardList size={28} />,
  concept: <HiOutlineLightBulb size={28} />,
  design: <HiOutlinePencil size={28} />,
  visualization: <HiOutlineCube size={28} />,
  materials: <HiOutlineColorSwatch size={28} />,
  execution: <HiOutlineCog size={28} />,
  handover: <HiOutlineKey size={28} />,
};

/* ──────────────────────────────────────────────
   Single timeline step card
   ────────────────────────────────────────────── */
interface StepCardProps {
  step: ProcessStep;
  index: number;
  side: "left" | "right";
}

function StepCard({ step, index, side }: StepCardProps) {
  const stepNum = String(step.id).padStart(2, "0");

  return (
    <div
      className={`process-step process-step-${side} relative flex items-start gap-6 md:gap-0 md:items-center w-full`}
      role="listitem"
    >
      {/* ── DESKTOP layout ─────────────────────── */}
      <div
        className={`hidden md:flex md:w-[calc(50%-28px)] ${
          side === "left" ? "justify-end pr-12" : ""
        }`}
      >
        {side === "left" && (
          <div className="max-w-md text-right">
            <span className="text-accent font-heading text-sm tracking-widest">
              {stepNum}
            </span>
            <h3 className="font-heading text-xl md:text-2xl text-secondary mt-1 mb-2">
              {step.title}
            </h3>
            <p className="text-text-light text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        )}
        {side === "right" && (
          <div className="flex items-center justify-end pr-12">
            <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-accent shadow-sm border border-border">
              {iconMap[step.icon] ?? null}
            </div>
          </div>
        )}
      </div>

      {/* Center dot on timeline */}
      <div className="hidden md:flex flex-shrink-0 items-center justify-center z-10">
        <div
          className={`timeline-dot w-[14px] h-[14px] rounded-full border-2 border-accent bg-white transition-colors duration-500`}
          aria-hidden="true"
        />
      </div>

      {/* Right content (visible on right-side steps) */}
      <div
        className={`hidden md:flex md:w-[calc(50%-28px)] ${
          side === "right" ? "justify-start pl-12" : ""
        }`}
      >
        {side === "right" && (
          <div className="max-w-md">
            <span className="text-accent font-heading text-sm tracking-widest">
              {stepNum}
            </span>
            <h3 className="font-heading text-xl md:text-2xl text-secondary mt-1 mb-2">
              {step.title}
            </h3>
            <p className="text-text-light text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        )}
        {side === "left" && (
          <div className="flex items-center justify-start pl-12">
            <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-accent shadow-sm border border-border">
              {iconMap[step.icon] ?? null}
            </div>
          </div>
        )}
      </div>

      {/* ── MOBILE layout ──── */}
      <div className="md:hidden flex items-start gap-5">
        <div className="relative flex-shrink-0 flex flex-col items-center">
          <div
            className={`timeline-dot w-[12px] h-[12px] rounded-full border-2 border-accent bg-white`}
            aria-hidden="true"
          />
          {index < processSteps.length - 1 && (
            <div
              className="w-[2px] bg-border flex-1 min-h-[60px]"
              aria-hidden="true"
            />
          )}
        </div>

        <div className="pb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-accent">
              {iconMap[step.icon] ?? null}
            </div>
            <span className="text-accent font-heading text-sm tracking-widest">
              {stepNum}
            </span>
          </div>
          <h3 className="font-heading text-lg text-secondary mb-1">
            {step.title}
          </h3>
          <p className="text-text-light text-sm leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main OurProcess section
   ────────────────────────────────────────────── */
export default function OurProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgLineRef = useRef<SVGLineElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      /* ── Header reveal ──────────────────────── */
      gsap.from(".process-header", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      const mm = gsap.matchMedia();

      /* ── Desktop timeline animations ─────────── */
      mm.add("(min-width: 768px)", () => {
        /* SVG line draw */
        const svgLine = svgLineRef.current;
        if (svgLine) {
          const lineLength = svgLine.getTotalLength();
          gsap.set(svgLine, {
            strokeDasharray: lineLength,
            strokeDashoffset: lineLength,
          });

          gsap.to(svgLine, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".process-timeline",
              start: "top 70%",
              end: "bottom 30%",
              scrub: 1,
            },
          });
        }

        /* Step cards stagger in */
        const leftSteps = gsap.utils.toArray<HTMLElement>(".process-step-left");
        leftSteps.forEach((step) => {
          gsap.from(step, {
            opacity: 0,
            x: -60,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          });
        });

        const rightSteps = gsap.utils.toArray<HTMLElement>(".process-step-right");
        rightSteps.forEach((step) => {
          gsap.from(step, {
            opacity: 0,
            x: 60,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          });
        });

        /* Timeline dots fill with gold on scroll */
        const dots = gsap.utils.toArray<HTMLElement>(".timeline-dot");
        dots.forEach((dot) => {
          gsap.to(dot, {
            backgroundColor: "#C8A86B",
            borderColor: "#C8A86B",
            scale: 1.3,
            duration: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: dot,
              start: "top 65%",
              toggleActions: "play none none none",
            },
          });
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="process"
      ref={sectionRef}
      className="bg-white relative overflow-hidden section-padding"
      aria-labelledby="process-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="process-header relative mb-16 md:mb-24">
          <span
            className="absolute -top-8 md:-top-12 left-0 text-[6rem] md:text-[10rem] font-heading font-bold leading-none select-none pointer-events-none"
            style={{
              WebkitTextStroke: "1px rgba(200,168,107,0.18)",
              color: "transparent",
            }}
            aria-hidden="true"
          >
            03
          </span>

          <h2
            id="process-heading"
            className="font-heading text-4xl md:text-6xl text-secondary mb-4 relative z-10"
          >
            Our Process
          </h2>

          <p className="text-text-light max-w-xl text-base md:text-lg relative z-10">
            Eight refined stages that transform your vision into an
            extraordinary built reality.
          </p>
        </div>

        {/* Timeline list */}
        <div className="process-timeline relative" role="list" aria-label="Process steps">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px]">
            <div className="absolute inset-0 bg-border" aria-hidden="true" />
            <svg
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line
                ref={svgLineRef}
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="#C8A86B"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div className="flex flex-col gap-12 md:gap-20">
            {processSteps.map((step, i) => (
              <StepCard
                key={step.id}
                step={step}
                index={i}
                side={i % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
