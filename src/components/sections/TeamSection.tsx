"use client";

import Image from "next/image";
import { teamMembers } from "@/data/content";
import type { TeamMember } from "@/types";
import { FaInstagram } from "react-icons/fa";

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
      className="group"
      aria-label={`${member.name}, ${member.role}`}
    >
      {/* Portrait Area */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-5 shadow-lg">
        {/* Gradient background & Image */}
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
          style={{ background: gradient }}
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            unoptimized
            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </div>

        {/* Initials overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0"
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
        <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <p className="text-sm leading-relaxed text-white/80 mb-5">
              {member.bio}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {member.social.instagram && (
                <a
                  href={member.social.instagram}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:border-accent hover:bg-accent hover:text-white transition-colors"
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

      {/* Info Area below portrait */}
      <div>
        <h3 className="font-heading text-xl text-text group-hover:text-accent transition-colors duration-300">
          {member.name}
        </h3>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-accent">
          {member.role}
        </p>
      </div>
    </article>
  );
}

export default function TeamSection() {
  return (
    <section
      id="team"
      className="relative py-24 md:py-32 bg-white"
      aria-labelledby="team-title"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 lg:mb-20">
          <span className="mb-6 block font-heading text-7xl font-bold text-accent/15 lg:text-8xl">
            06
          </span>
          <h2
            id="team-title"
            className="font-heading text-4xl text-text sm:text-5xl lg:text-6xl"
          >
            The Visionaries
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-light lg:text-lg">
            The creative minds and master directors who lead White Rock&apos;s vision across engineering, management, and architectural design.
          </p>
        </div>

        {/* Team Grid — 3 Directors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
