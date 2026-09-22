"use client";

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faqItems } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  useGSAP(
    () => {
      // Header animation
      gsap.from(".faq-header", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // FAQ items stagger in
      gsap.from(".faq-item", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-list",
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
      id="faq"
      className="bg-white py-24 md:py-32 xl:py-40"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="faq-header mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-accent font-heading text-sm tracking-widest">
              08
            </span>
            <span className="w-12 h-px bg-accent" aria-hidden="true" />
          </div>
          <h2
            id="faq-heading"
            className="font-heading text-4xl md:text-5xl xl:text-6xl text-text"
          >
            Common Questions
          </h2>
        </div>

        {/* Accordion List */}
        <div className="faq-list" role="list">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="faq-item border-b border-border"
                role="listitem"
              >
                <button
                  className="w-full py-6 md:py-8 flex items-center justify-between text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-question-${item.id}`}
                >
                  <span className="font-heading text-lg md:text-xl text-text pr-8 group-hover:text-accent transition-colors duration-300">
                    {item.question}
                  </span>

                  {/* Plus/Minus icon */}
                  <span
                    className="flex-shrink-0 relative w-6 h-6 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="absolute w-4 h-px bg-text transition-transform duration-500 ease-[var(--ease-smooth)]" />
                    <span
                      className={`absolute w-4 h-px bg-text transition-transform duration-500 ease-[var(--ease-smooth)] ${
                        isOpen ? "rotate-0" : "rotate-90"
                      }`}
                    />
                  </span>
                </button>

                {/* Answer */}
                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  className="accordion-content"
                  style={{
                    maxHeight: isOpen ? "500px" : "0px",
                  }}
                >
                  <p className="text-text-light leading-relaxed pb-6 md:pb-8 pr-12">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
