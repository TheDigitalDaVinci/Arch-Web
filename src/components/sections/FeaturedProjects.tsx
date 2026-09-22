"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NextImage from "next/image";
import { projects } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

const projectGradients = [
  "linear-gradient(135deg, #1a2a3a 0%, #2c4a6a 40%, #1a3050 100%)",
  "linear-gradient(135deg, #2a1a1a 0%, #5a3030 40%, #3a1a1a 100%)",
  "linear-gradient(135deg, #1a1a2a 0%, #303060 40%, #1a1a3a 100%)",
  "linear-gradient(135deg, #2a2a1a 0%, #5a5a30 40%, #3a3a1a 100%)",
  "linear-gradient(135deg, #1a2a1a 0%, #305a30 40%, #1a3a1a 100%)",
  "linear-gradient(135deg, #2a1a2a 0%, #5a3060 40%, #3a1a3a 100%)",
];

export default function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ---- Desktop: horizontal scroll ----
      mm.add("(min-width: 769px)", () => {
        const wrapper = scrollWrapperRef.current;
        if (!wrapper) return;

        const panels = gsap.utils.toArray<HTMLElement>(
          ".project-panel",
          wrapper
        );
        if (panels.length === 0) return;

        // Heading entrance
        if (headingRef.current) {
          gsap.from(headingRef.current.querySelectorAll(".reveal-item"), {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }

        // Horizontal scroll — translate exact distance across all 6 panels
        const getScrollDistance = () => wrapper.scrollWidth - window.innerWidth;

        const scrollTween = gsap.to(wrapper, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                panels.length - 1,
                Math.floor(self.progress * panels.length)
              );
              setActiveIndex(idx);
              if (counterRef.current) {
                counterRef.current.textContent = String(idx + 1).padStart(
                  2,
                  "0"
                );
              }
            },
          },
        });

        // Stagger in panel content
        panels.forEach((panel) => {
          const items = panel.querySelectorAll<HTMLElement>(".panel-reveal");
          gsap.from(items, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 85%",
              toggleActions: "play none none none",
            },
          });
        });
      });

      // ---- Mobile: vertical stack ----
      mm.add("(max-width: 768px)", () => {
        if (headingRef.current) {
          gsap.from(headingRef.current.querySelectorAll(".reveal-item"), {
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }

        const cards = gsap.utils.toArray<HTMLElement>(".project-panel");
        cards.forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <section
        ref={sectionRef}
        id="projects"
        className="relative bg-secondary min-h-screen flex flex-col justify-between overflow-hidden"
        aria-label="Featured Projects"
      >
        {/* Section Header */}
        <div
          ref={headingRef}
          className="relative z-10 px-6 md:px-12 lg:px-20 pt-6 md:pt-8 pb-1"
        >
          {/* Section 04 Badge */}
          <span
            className="absolute -top-6 md:-top-10 left-6 md:left-12 text-[5rem] md:text-[8rem] font-heading font-bold leading-none select-none pointer-events-none"
            style={{
              WebkitTextStroke: "1px rgba(200,168,107,0.25)",
              color: "transparent",
            }}
            aria-hidden="true"
          >
            04
          </span>

          <p className="reveal-item text-accent text-xs md:text-sm uppercase tracking-[0.3em] mb-2 font-semibold relative z-10">
            Portfolio
          </p>
          <h2 className="reveal-item font-heading text-3xl md:text-5xl lg:text-6xl text-white mb-3 relative z-10">
            Featured Projects
          </h2>
          <p className="reveal-item text-white/60 text-sm md:text-base max-w-xl leading-relaxed">
            A curated selection of luxury residences, villas, and commercial spaces.
          </p>
        </div>

        {/* ---- Desktop: Horizontal Scroll Gallery ---- */}
        <div className="hidden md:block relative z-10 flex-1 my-auto">
          {/* Project counter indicator */}
          <div className="absolute top-0 right-12 md:right-20 z-30 flex items-baseline gap-1 text-white/70 font-heading text-lg">
            <span
              ref={counterRef}
              className="text-accent text-2xl md:text-3xl font-semibold"
            >
              01
            </span>
            <span className="mx-1">/</span>
            <span>{String(projects.length).padStart(2, "0")}</span>
          </div>

          {/* Progress Bar */}
          <div className="absolute top-6 left-12 right-12 md:left-20 md:right-20 h-[2px] bg-white/10 z-30">
            <div
              className="h-full bg-accent transition-all duration-300 ease-out"
              style={{
                width: `${((activeIndex + 1) / projects.length) * 100}%`,
              }}
            />
          </div>

          {/* Horizontal Scroll Track */}
          <div
            ref={scrollWrapperRef}
            className="horizontal-scroll-wrapper pt-2 pb-2"
          >
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="project-panel horizontal-scroll-panel w-screen flex-shrink-0 px-8 md:px-16 lg:px-24 flex flex-col pt-6"
                aria-label={`Project: ${project.title}`}
              >
                <div className="max-w-5xl mx-auto w-full">
                  {/* Full uncropped image container */}
                  <div
                    className="relative w-full aspect-[16/9] max-h-[48vh] rounded-2xl overflow-hidden group shadow-2xl bg-black"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    data-cursor="view"
                  >
                    {/* Blurred background fill — same image, scaled up & frosted */}
                    <div className="absolute inset-0 z-0">
                      <NextImage
                        src={project.image}
                        alt=""
                        fill
                        className="object-cover scale-110 blur-2xl brightness-50 saturate-150"
                        sizes="(max-width: 1400px) 100vw, 1400px"
                        aria-hidden="true"
                      />
                      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
                    </div>

                    {/* Sharp image — full, uncropped, centered */}
                    <div className="absolute inset-0 z-[1] flex items-center justify-center">
                      <NextImage
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-contain transform transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 1400px) 100vw, 1400px"
                        priority={index === 0}
                      />
                    </div>

                    {/* Gradient Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />

                    {/* Overlay Info Card on Hover */}
                    <div
                      className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
                        hoveredIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="text-center text-white space-y-3 px-6">
                        <span className="text-accent text-xs uppercase tracking-[0.3em] font-semibold">
                          {project.category}
                        </span>
                        <h4 className="font-heading text-3xl lg:text-4xl text-white">
                          {project.title}
                        </h4>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-white/70">
                          <span>{project.location}</span>
                          <span>•</span>
                          <span>{project.area}</span>
                          <span>•</span>
                          <span>{project.style}</span>
                          <span>•</span>
                          <span>{project.year}</span>
                        </div>
                        <a
                          href={`#project-${project.id}`}
                          className="inline-flex items-center gap-2 mt-4 text-accent text-sm uppercase tracking-widest font-semibold group/link"
                          aria-label={`View project: ${project.title}`}
                        >
                          View Project Details
                          <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Below Image Title Bar */}
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="panel-reveal text-accent text-xs uppercase tracking-widest block font-semibold">
                        {project.category}
                      </span>
                      <h3 className="panel-reveal font-heading text-2xl md:text-3xl text-white mt-1">
                        {project.title}
                      </h3>
                    </div>
                    <div className="text-right text-white/60 text-xs md:text-sm hidden sm:block">
                      <p>{project.location}</p>
                      <p className="text-accent/80 font-medium">{project.area}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ---- Mobile: Responsive Vertical Stack ---- */}
        <div className="md:hidden px-6 pt-4 pb-20 space-y-10">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="project-panel"
              aria-label={`Project: ${project.title}`}
            >
              {/* Centered Image Card */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-xl bg-black/40">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      projectGradients[index % projectGradients.length],
                  }}
                >
                  <NextImage
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                {/* Info Overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/80">
                    <span>{project.location}</span>
                    <span>•</span>
                    <span>{project.area}</span>
                    <span>•</span>
                    <span>{project.year}</span>
                  </div>
                </div>
              </div>

              <span className="text-accent text-xs uppercase tracking-widest font-semibold">
                {project.category}
              </span>
              <h3 className="font-heading text-2xl text-white mt-1">
                {project.title}
              </h3>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
