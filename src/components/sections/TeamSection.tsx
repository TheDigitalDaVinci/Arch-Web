"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { teamMembers } from "@/data/content";
import type { TeamMember } from "@/types";
import { FaInstagram } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const portraitGradients = [
  "linear-gradient(135deg, #111827 0%, #1F2937 50%, #111827 100%)",
  "linear-gradient(135deg, #1A1C23 0%, #2D3748 50%, #1A1C23 100%)",
  "linear-gradient(135deg, #1E1B18 0%, #3B2F2F 50%, #1E1B18 100%)",
  "linear-gradient(135deg, #161D1E 0%, #2C3E40 50%, #161D1E 100%)",
];

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  const gradient = portraitGradients[index % portraitGradients.length];

  return (
    <article
      className="team-card group cursor-pointer"
      aria-label={`${member.name}, ${member.role}`}
    >
      {/* Portrait Area */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-5">
        {/* Gradient background & Image */}
        <div
          className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-smooth)] group-hover:scale-105"
          style={{ background: gradient }}
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            unoptimized
            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </div>

        {/* Initials overlay (visible by default) */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-0"
          aria-hidden="true"
        >
          <span className="font-heading text-5xl text-white/10 lg:text-6xl">
            {member.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </span>
        </div>

        {/* Hover overlay with bio */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 ease-[var(--ease-smooth)] opacity-0 group-hover:opacity-100">
          {/* Blur + dark overlay */}
          <div
            className="absolute inset-0 transition-all duration-500 group-hover:backdrop-blur-sm"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)",
            }}
            aria-hidden="true"
          />

          {/* Bio text */}
          <div className="relative z-10">
            <p className="text-sm leading-relaxed text-white/80 mb-5 translate-y-4 transition-transform duration-500 ease-[var(--ease-smooth)] group-hover:translate-y-0">
              {member.bio}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {member.social.instagram && (
                <a
                  href={member.social.instagram}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/70 transition-all duration-300 ease-[var(--ease-smooth)] hover:border-accent hover:bg-accent hover:text-white translate-y-6 group-hover:translate-y-0"
                  style={{ transitionDelay: "100ms" }}
                  aria-label={`${member.name} Instagram profile`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Name & Role */}
      <div className="px-1">
        <h3 className="font-heading text-xl text-text transition-colors duration-300 group-hover:text-accent-dark">
          {member.name}
        </h3>
        <p className="mt-1 text-sm font-medium uppercase tracking-wider text-accent">
          {member.role}
        </p>
      </div>
    </article>
  );
}

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Section number
        gsap.from(".team-number", {
          opacity: 0,
          x: -30,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".team-number",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // Section heading
        gsap.from(".team-heading", {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".team-heading",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // Cards stagger
        gsap.from(".team-card", {
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".team-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.from(".team-heading", {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".team-heading",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        gsap.from(".team-card", {
          opacity: 0,
          y: 40,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".team-grid",
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
      id="team"
      className="relative section-padding bg-white"
      aria-labelledby="team-title"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 lg:mb-20">
          <span className="team-number mb-6 block font-heading text-7xl font-bold text-accent/15 lg:text-8xl">
            06
          </span>
          <h2
            id="team-title"
            className="team-heading font-heading text-4xl text-text sm:text-5xl lg:text-6xl"
          >
            The Visionaries
          </h2>
          <p className="team-heading mt-6 max-w-2xl text-base leading-relaxed text-text-light lg:text-lg">
            The creative minds and master directors who lead White Rock&apos;s vision across engineering, management, and architectural design.
          </p>
        </div>

        {/* Team Grid — 3 Directors */}
        <div className="team-grid grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
