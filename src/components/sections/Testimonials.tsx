"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaStar, FaGoogle } from "react-icons/fa";
import { testimonials } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate testimonials for seamless infinite loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useGSAP(
    () => {
      // Header animation
      gsap.from(".testimonials-header", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonials-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Google badge animation
      gsap.from(".google-badge", {
        opacity: 0,
        scale: 0.85,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".google-badge",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bg-secondary py-24 md:py-32 xl:py-40 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="testimonials-header mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-accent font-heading text-sm tracking-widest">
              07
            </span>
            <span className="w-12 h-px bg-accent" aria-hidden="true" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              id="testimonials-heading"
              className="font-heading text-4xl md:text-5xl xl:text-6xl text-white"
            >
              Client Stories
            </h2>
            {/* Google Rating Badge */}
            <div className="google-badge flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3">
              <FaGoogle className="text-white text-lg" aria-hidden="true" />
              <div className="flex items-center gap-1" aria-label="5 star rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className="text-accent text-sm"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-white text-sm font-medium">
                5.0 on Google
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Carousel */}
      <div
        className="relative"
        role="region"
        aria-label="Client testimonials carousel"
      >
        {/* Gradient fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-secondary to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-secondary to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        <div className="overflow-hidden">
          <div className="marquee-track gap-6">
            {duplicatedTestimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.id}-${index}`}
                className="glass-card p-8 md:p-10 flex-shrink-0 w-[380px] md:w-[440px] flex flex-col justify-between"
                aria-label={`Testimonial from ${testimonial.name}`}
              >
                {/* Star Rating */}
                <div className="mb-6">
                  <div
                    className="flex items-center gap-1 mb-6"
                    aria-label={`${testimonial.rating} out of 5 stars`}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar
                        key={i}
                        className="text-accent text-base"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="font-heading text-lg md:text-xl italic text-white/90 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Client Info */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-white font-semibold">
                    {testimonial.name}
                  </p>
                  <p className="text-white/50 text-sm">
                    {testimonial.role}
                    {testimonial.company && `, ${testimonial.company}`}
                  </p>
                  <p className="text-accent text-xs mt-1">
                    {testimonial.project}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
