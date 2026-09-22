"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/content";
import type { Service } from "@/types";

import {
  HiOutlineKey,
  HiOutlineOfficeBuilding,
  HiOutlineDesktopComputer,
} from "react-icons/hi";
import {
  MdOutlineDesignServices,
  MdOutlineKitchen,
  MdOutlineArchitecture,
  MdOutlineLocalHospital,
  MdOutlineHotel,
  MdOutlineLocalCafe,
} from "react-icons/md";
import { GiPalmTree } from "react-icons/gi";
import type { IconType } from "react-icons";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, IconType> = {
  turnkey: HiOutlineKey,
  interior: MdOutlineDesignServices,
  kitchen: MdOutlineKitchen,
  landscape: GiPalmTree,
  commercial: HiOutlineOfficeBuilding,
  facade: MdOutlineArchitecture,
  office: HiOutlineDesktopComputer,
  hospital: MdOutlineLocalHospital,
  hotel: MdOutlineHotel,
  cafe: MdOutlineLocalCafe,
};

import Link from "next/link";

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || HiOutlineOfficeBuilding;

  return (
    <article
      className="service-card group rounded-2xl p-8 lg:p-10 transition-all duration-500 border bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5 flex flex-col justify-between"
      aria-label={service.title}
    >
      <div>
        {/* Icon & Number Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center justify-center rounded-xl p-3.5 bg-white/5 text-accent group-hover:bg-accent/15 group-hover:scale-105 transition-all duration-300">
            <Icon
              size={32}
              className="transition-transform duration-500 ease-out group-hover:scale-110"
              aria-hidden="true"
            />
          </div>
          <span className="font-heading text-xl font-semibold text-accent/50 tracking-widest select-none">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-2xl text-white mb-3 group-hover:text-accent transition-colors duration-300">
          <Link href={`/services/${service.id}`} className="hover:underline">
            {service.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-white/70 text-sm leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Features List */}
        <ul className="space-y-2.5 mb-6" role="list">
          {service.features.map((feature, featureIndex) => (
            <li
              key={featureIndex}
              className="feature-item flex items-center gap-3 text-sm text-white/80"
            >
              <span
                className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/20"
                aria-hidden="true"
              >
                <svg
                  className="h-3 w-3 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* View Portfolio & 360 Renders Link */}
      <div className="pt-6 border-t border-white/10 mt-2 flex items-center justify-between">
        <Link
          href={`/services/${service.id}`}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent group-hover:text-white transition-colors duration-300 link-underline"
          data-cursor="view"
          aria-label={`View ${service.title} portfolio and 360 renders`}
        >
          <span>View Portfolio &amp; 360° Renders</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-accent"
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
        </Link>
      </div>
    </article>
  );
}

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Section heading
        gsap.fromTo(
          ".services-heading",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".services-heading",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        // Card stagger
        gsap.fromTo(
          ".service-card",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".services-grid",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          ".services-heading",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".services-heading",
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );

        gsap.fromTo(
          ".service-card",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".services-grid",
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative section-padding bg-secondary"
      aria-labelledby="services-title"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 lg:mb-20 relative">
          <span
            className="absolute -top-8 md:-top-12 left-0 text-[6rem] md:text-[10rem] font-heading font-bold leading-none select-none pointer-events-none"
            style={{
              WebkitTextStroke: "1px rgba(200,168,107,0.18)",
              color: "transparent",
            }}
            aria-hidden="true"
          >
            05
          </span>

          <p className="services-heading text-accent text-xs md:text-sm uppercase tracking-[0.3em] mb-2 font-semibold relative z-10">
            Capabilities &amp; Solutions
          </p>

          <h2
            id="services-title"
            className="services-heading font-heading text-4xl text-white sm:text-5xl lg:text-6xl relative z-10"
          >
            Our Services
          </h2>
          <p className="services-heading mt-4 max-w-2xl text-base leading-relaxed text-white/70 lg:text-lg relative z-10">
            Comprehensive architectural, interior, and turnkey solutions engineered for enduring luxury and flawless execution.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
