"use client";

import React from "react";
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
      className="relative flex items-start gap-6 md:gap-0 md:items-center w-full"
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
            <span className="text-accent font-heading text-sm tracking-widest font-semibold">
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
          className="w-[14px] h-[14px] rounded-full border-2 border-accent bg-white shadow-sm"
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
            <span className="text-accent font-heading text-sm tracking-widest font-semibold">
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
            className="w-[12px] h-[12px] rounded-full border-2 border-accent bg-white"
            aria-hidden="true"
          />
          {index < processSteps.length - 1 && (
            <div
              className="w-[2px] bg-accent/30 flex-1 min-h-[60px]"
              aria-hidden="true"
            />
          )}
        </div>

        <div className="pb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-accent">
              {iconMap[step.icon] ?? null}
            </div>
            <span className="text-accent font-heading text-sm tracking-widest font-semibold">
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
  return (
    <section
      id="process"
      className="bg-white relative overflow-hidden py-24 md:py-32"
      aria-labelledby="process-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* ── Section Header ─────────────────── */}
        <div className="relative mb-20 md:mb-28 text-center max-w-2xl mx-auto">
          <span
            className="block text-accent font-heading text-sm tracking-[0.3em] uppercase mb-3 font-semibold"
          >
            How We Work
          </span>
          <h2
            id="process-heading"
            className="font-heading text-4xl md:text-6xl text-secondary mb-4"
          >
            Our 8-Step Process
          </h2>
          <p className="text-text-light text-base md:text-lg">
            From initial dialogue to final handover, every milestone is managed
            with transparency, rigor, and craft.
          </p>
        </div>

        {/* ── Timeline Container ─────────────── */}
        <div className="relative">
          {/* Central vertical line — Desktop only */}
          <div
            className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-accent/25"
            aria-hidden="true"
          />

          {/* Steps */}
          <div
            className="flex flex-col gap-12 md:gap-20"
            role="list"
            aria-label="Process steps"
          >
            {processSteps.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                index={index}
                side={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
