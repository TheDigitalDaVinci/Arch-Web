"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NextImage from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: string;
  label: string;
  image: string;
  gradient: string;
  colSpan: number;
  rowSpan: number;
}

const galleryItems: GalleryItem[] = [
  {
    id: "living-room",
    label: "Living Room",
    image: "/images/interiors/living-room.jpg",
    gradient: "linear-gradient(135deg, #2C3E50 0%, #3498DB 50%, #1A252F 100%)",
    colSpan: 2,
    rowSpan: 2,
  },
  {
    id: "kitchen",
    label: "Kitchen",
    image: "/images/interiors/kitchen.jpg",
    gradient: "linear-gradient(135deg, #4A3728 0%, #8B6F47 50%, #3A2A1A 100%)",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: "bedroom",
    label: "Bedroom",
    image: "/images/interiors/bedroom.jpg",
    gradient: "linear-gradient(135deg, #1A1A2E 0%, #533483 50%, #0F0F1A 100%)",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: "staircase",
    label: "Staircase",
    image: "/images/interiors/staircase.jpg",
    gradient: "linear-gradient(135deg, #0D4D4D 0%, #2C7873 50%, #0A3A3A 100%)",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    id: "study",
    label: "Study",
    image: "/images/interiors/study.jpg",
    gradient: "linear-gradient(135deg, #3D2B1F 0%, #C8A86B 50%, #2A1D14 100%)",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: "terrace",
    label: "Terrace",
    image: "/images/interiors/terrace.jpg",
    gradient: "linear-gradient(135deg, #134E5E 0%, #71B280 50%, #0C3C4A 100%)",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: "dining",
    label: "Dining Hall",
    image: "/images/interiors/dining.jpg",
    gradient: "linear-gradient(135deg, #4A3728 0%, #C8A86B 50%, #2A1D14 100%)",
    colSpan: 1,
    rowSpan: 1,
  },
];

export default function InteriorsGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Heading animation
      gsap.from(".ig-heading", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".ig-heading",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".ig-subtext", {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".ig-heading",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Staggered card entrance
      const cards = gsap.utils.toArray<HTMLElement>(".gallery-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <section
        className="relative bg-background section-padding overflow-hidden"
        aria-label="Interior Design Gallery"
      >
        {/* Heading */}
        <div className="text-center mb-12 md:mb-20 px-6">
          <p className="ig-subtext text-accent text-sm uppercase tracking-[0.3em] mb-4">
            Interiors
          </p>
          <h2 className="ig-heading font-heading text-4xl md:text-6xl lg:text-7xl text-text text-balance">
            Interior Excellence
          </h2>
          <p className="ig-subtext text-text-light text-lg mt-6 max-w-xl mx-auto">
            Spaces where every surface, texture, and detail is curated to
            perfection.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Desktop grid */}
          <div
            className="hidden md:grid gap-4 lg:gap-5"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              gridAutoRows: "220px",
            }}
          >
            {galleryItems.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>

          {/* Mobile: single column */}
          <div className="md:hidden space-y-4">
            {galleryItems.map((item) => (
              <GalleryCard key={item.id} item={item} mobile />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function GalleryCard({
  item,
  mobile = false,
}: {
  item: GalleryItem;
  mobile?: boolean;
}) {
  return (
    <article
      className={`gallery-card group relative rounded-xl overflow-hidden ${
        mobile
          ? "aspect-[4/3]"
          : ""
      }`}
      style={
        mobile
          ? undefined
          : {
              gridColumn: `span ${item.colSpan}`,
              gridRow: `span ${item.rowSpan}`,
            }
      }
      aria-label={`${item.label} interior design`}
    >
      {/* Background image & gradient fallback */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ background: item.gradient }}
      >
        <NextImage
          src={item.image}
          alt={item.label}
          fill
          unoptimized
          className="object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
          onError={(e) => {
            (e.target as HTMLElement).style.display = "none";
          }}
        />
      </div>

      {/* Always-visible bottom gradient label */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 pointer-events-none" />
      <span className="absolute bottom-4 left-5 z-20 text-white font-heading text-lg md:text-xl pointer-events-none">
        {item.label}
      </span>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          transform: "perspective(1000px) rotateY(0deg)",
          transition:
            "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <h3 className="font-heading text-2xl md:text-3xl text-white mb-3">
          {item.label}
        </h3>
        <span className="text-accent text-sm uppercase tracking-widest font-semibold">
          View
        </span>
      </div>

      {/* Subtle 3D tilt on hover via CSS */}
      <style jsx>{`
        .gallery-card:hover {
          transform: perspective(1000px) rotateY(2deg);
          transition: transform 0.5s ease;
        }
        .gallery-card {
          transition: transform 0.5s ease;
        }
      `}</style>
    </article>
  );
}
