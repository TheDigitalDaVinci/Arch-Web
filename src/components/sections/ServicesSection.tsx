"use client";

import Link from "next/link";
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

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || HiOutlineOfficeBuilding;

  return (
    <article
      className="group rounded-2xl p-8 lg:p-10 border bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-accent/40 shadow-xl flex flex-col justify-between transition-colors duration-300"
      aria-label={service.title}
    >
      <div>
        {/* Icon & Number Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center justify-center rounded-xl p-3.5 bg-white/5 text-accent group-hover:bg-accent/15 transition-colors duration-300">
            <Icon
              size={32}
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
              className="flex items-center gap-3 text-sm text-white/80"
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
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent group-hover:text-white transition-colors duration-300"
          aria-label={`View ${service.title} portfolio and 360 renders`}
        >
          <span>View Portfolio &amp; 360° Renders</span>
          <svg
            className="w-4 h-4 text-accent"
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
  return (
    <section
      id="services"
      className="relative py-24 md:py-32 bg-secondary"
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

          <p className="text-accent text-xs md:text-sm uppercase tracking-[0.3em] mb-2 font-semibold relative z-10">
            Capabilities &amp; Solutions
          </p>

          <h2
            id="services-title"
            className="font-heading text-4xl text-white sm:text-5xl lg:text-6xl relative z-10"
          >
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 lg:text-lg relative z-10">
            Comprehensive architectural, interior, and turnkey solutions engineered for enduring luxury and flawless execution.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
