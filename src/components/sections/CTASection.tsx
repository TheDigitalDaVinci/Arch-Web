"use client";

import { companyInfo } from "@/data/content";

export default function CTASection() {
  return (
    <section
      className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-secondary"
      aria-labelledby="cta-heading"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-[#0d0d0d]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-12 py-24 md:py-32 max-w-5xl mx-auto">
        <h2
          id="cta-heading"
          className="font-heading text-4xl md:text-6xl xl:text-7xl text-white text-center mb-8 leading-tight"
        >
          Let&apos;s Build Something Extraordinary.
        </h2>

        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-12">
          Your vision, our expertise. Together, we create spaces that stand the
          test of time.
        </p>

        <div className="flex flex-col items-center gap-6">
          <a
            href={companyInfo.consultationForm}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-secondary font-semibold text-lg rounded-full px-12 py-5 transition-colors duration-200 hover:bg-accent-light focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
            aria-label="Start Your Project (opens Consultation Form)"
          >
            Start Your Project
          </a>

          <p className="text-white/50 text-sm">
            or call us at{" "}
            <a
              href={`tel:${companyInfo.phone.replace(/\s|\(|\)|-/g, "")}`}
              className="text-white/70 hover:text-accent transition-colors"
            >
              {companyInfo.phone}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
