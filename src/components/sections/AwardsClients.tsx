"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clientLogos } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

// Duplicate for seamless infinite loop
const duplicatedLogos = [...clientLogos, ...clientLogos];

export default function AwardsClients() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Clients heading reveal
      gsap.from(".clients-heading", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".clients-heading",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bg-background py-20 md:py-28"
      aria-labelledby="clients-heading"
    >
      {/* Client Logos Section */}
      <div className="overflow-hidden">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-accent text-xs md:text-sm uppercase tracking-[0.3em] font-semibold mb-2">
            Partners &amp; Collaborations
          </p>
          <h2
            id="clients-heading"
            className="clients-heading font-heading text-3xl md:text-5xl text-text"
          >
            Trusted By
          </h2>
        </div>

        {/* Gradient fade edges */}
        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"
            aria-hidden="true"
          />

          <div
            className="overflow-hidden"
            role="region"
            aria-label="Client logos"
          >
            <div className="marquee-track gap-6 md:gap-8">
              {duplicatedLogos.map((client, index) => (
                <div
                  key={`${client.id}-${index}`}
                  className="flex-shrink-0 px-8 md:px-12 py-4 border border-border rounded-lg transition-all duration-300 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 hover:border-accent/40 bg-white/50 shadow-sm"
                >
                  <span className="text-lg md:text-xl font-heading text-text-muted whitespace-nowrap select-none font-medium">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
