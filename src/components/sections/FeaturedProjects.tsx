"use client";

import NextImage from "next/image";
import { projects } from "@/data/content";

export default function FeaturedProjects() {
  return (
    <section
      id="projects"
      className="relative bg-secondary py-24 md:py-32 overflow-hidden"
      aria-label="Featured Projects"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="relative mb-16 md:mb-20">
          <span
            className="absolute -top-10 md:-top-14 left-0 text-[5rem] md:text-[8rem] font-heading font-bold leading-none select-none pointer-events-none"
            style={{
              WebkitTextStroke: "1px rgba(200,168,107,0.25)",
              color: "transparent",
            }}
            aria-hidden="true"
          >
            04
          </span>

          <p className="text-accent text-xs md:text-sm uppercase tracking-[0.3em] mb-2 font-semibold relative z-10">
            Portfolio
          </p>
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-white mb-3 relative z-10">
            Featured Projects
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-xl leading-relaxed relative z-10">
            A curated selection of luxury residences, villas, and commercial spaces.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 shadow-2xl flex flex-col justify-between transition-all duration-300 hover:border-accent/40"
              aria-label={`Project: ${project.title}`}
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[16/10] bg-black overflow-hidden">
                <NextImage
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Category Pill */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10 text-accent text-xs font-semibold uppercase tracking-wider">
                  {project.category}
                </div>
              </div>

              {/* Project Meta & Details */}
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h3 className="font-heading text-2xl md:text-3xl text-white group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-accent text-xs font-mono font-semibold">
                    {project.year}
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs md:text-sm text-white/60 mb-6">
                  <span>{project.location}</span>
                  <span>•</span>
                  <span>{project.area}</span>
                  <span>•</span>
                  <span>{project.style}</span>
                </div>

                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                    Verified Craftsmanship
                  </span>
                  <a
                    href={`#contact`}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/80 hover:text-accent font-semibold transition-colors"
                  >
                    Inquire About This Style &rarr;
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
