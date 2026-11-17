"use client";

import { clientLogos } from "@/data/content";

export default function AwardsClients() {
  return (
    <section
      className="bg-background py-20 md:py-28"
      aria-labelledby="clients-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-accent text-xs md:text-sm uppercase tracking-[0.3em] font-semibold mb-2">
            Partners &amp; Collaborations
          </p>
          <h2
            id="clients-heading"
            className="font-heading text-3xl md:text-5xl text-text"
          >
            Trusted By
          </h2>
        </div>

        {/* Clean Static Grid of Partner Logos */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
          role="region"
          aria-label="Client logos"
        >
          {clientLogos.map((client) => (
            <div
              key={client.id}
              className="px-8 md:px-10 py-4 border border-border rounded-xl transition-colors duration-300 bg-white shadow-sm hover:border-accent/50"
            >
              <span className="text-base md:text-lg font-heading text-text whitespace-nowrap select-none font-medium">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
