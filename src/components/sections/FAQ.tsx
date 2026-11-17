"use client";

import { useState, useCallback } from "react";
import { faqItems } from "@/data/content";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      id="faq"
      className="bg-white py-24 md:py-32 xl:py-40"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-accent font-heading text-sm tracking-widest font-semibold">
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
        <div role="list">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="border-b border-border"
                role="listitem"
              >
                <button
                  className="w-full py-6 md:py-8 flex items-center justify-between text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-question-${item.id}`}
                >
                  <span className="font-heading text-lg md:text-xl text-text pr-8 group-hover:text-accent transition-colors duration-200">
                    {item.question}
                  </span>

                  {/* Plus/Minus icon */}
                  <span
                    className="flex-shrink-0 relative w-6 h-6 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="absolute w-4 h-px bg-text" />
                    <span
                      className={`absolute w-4 h-px bg-text ${
                        isOpen ? "rotate-0" : "rotate-90"
                      }`}
                    />
                  </span>
                </button>

                {/* Answer */}
                {isOpen && (
                  <div
                    id={`faq-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${item.id}`}
                  >
                    <p className="text-text-light leading-relaxed pb-6 md:pb-8 pr-12">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
