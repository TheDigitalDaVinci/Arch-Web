"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/types";
import { companyInfo } from "@/data/content";
import {
  HiOutlineKey,
  HiOutlineOfficeBuilding,
  HiOutlineDesktopComputer,
  HiOutlineArrowLeft,
  HiOutlinePhotograph,
  HiOutlineVideoCamera,
  HiOutlineEye,
  HiOutlineCheck,
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
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
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

interface ServiceDetailClientProps {
  service: Service;
  serviceIndex: number;
  allServices: Service[];
  otherServices: Service[];
}

export default function ServiceDetailClient({
  service,
  serviceIndex,
  allServices,
  otherServices,
}: ServiceDetailClientProps) {
  const [activeTab, setActiveTab] = useState<"photos" | "videos" | "360">("photos");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const Icon = iconMap[service.icon] || HiOutlineOfficeBuilding;
  const whatsappNumber = companyInfo.whatsapp.replace(/[^0-9]/g, "");
  const whatsappMessage = encodeURIComponent(
    `Hello White Rock! I am interested in discussing a project for ${service.title}.`
  );

  // Photos array fallback
  const photos = service.photos && service.photos.length > 0
    ? service.photos
    : [
        service.heroImage || "/images/about/hero.jpg",
        "/images/projects/project-1.jpg",
        "/images/interiors/living-room.jpg",
        "/images/interiors/dining.jpg",
      ];

  const videos = service.videos || [];
  const [active360Index, setActive360Index] = useState(0);

  const render360List = service.render360List || (service.render360Url ? [{ title: `${service.title} 360° Tour`, url: service.render360Url }] : []);
  const current360 = render360List[active360Index] || render360List[0];

  const show360 = service.id !== "turnkey-projects";

  return (
    <div className="min-h-screen bg-secondary text-white selection:bg-accent selection:text-white">
      {/* Top Header / Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-secondary/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link
            href="/#services"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-accent transition-colors duration-300"
          >
            <HiOutlineArrowLeft className="text-base transition-transform group-hover:-translate-x-1" />
            <span>Back to All Services</span>
          </Link>

          <Link href="/" className="font-heading text-xl font-bold tracking-wider text-white">
            WHITE ROCK
          </Link>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-accent bg-accent/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-accent hover:bg-accent hover:text-secondary transition-all duration-300"
          >
            <FaWhatsapp size={14} />
            <span>Consult Us</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 bg-black/40 py-20 lg:py-28">
        {/* Background Ambient Glow */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent border border-accent/20">
                  <Icon size={28} />
                </span>
                <span className="font-heading text-2xl font-bold text-accent/60 tracking-widest">
                  SERVICE #{String(serviceIndex + 1).padStart(2, "0")}
                </span>
              </div>

              <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {service.title}
              </h1>

              <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl font-light">
                {service.fullDescription || service.description}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px]">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-secondary hover:bg-accent-light transition-all duration-300 shadow-lg shadow-accent/20"
              >
                <FaWhatsapp size={16} />
                <span>Inquire on WhatsApp</span>
              </a>

              <a
                href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              >
                <FaPhoneAlt size={13} />
                <span>Call {companyInfo.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Media Portfolio Showcase Tabs */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Navigation Tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-white/10 pb-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-1">
                Portfolio Showcase
              </p>
              <h2 className="font-heading text-2xl sm:text-4xl text-white">
                {show360 ? "Photos, Videos & 360° VR" : "Photos & Videos Showcase"}
              </h2>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="inline-flex rounded-xl bg-white/5 p-1 border border-white/10">
              <button
                onClick={() => setActiveTab("photos")}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === "photos"
                    ? "bg-accent text-secondary shadow-md"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <HiOutlinePhotograph size={16} />
                <span>Photos ({photos.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("videos")}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === "videos"
                    ? "bg-accent text-secondary shadow-md"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <HiOutlineVideoCamera size={16} />
                <span>Videos ({videos.length})</span>
              </button>

              {show360 && (
                <button
                  onClick={() => setActiveTab("360")}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    activeTab === "360"
                      ? "bg-accent text-secondary shadow-md"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <HiOutlineEye size={16} />
                  <span>360° VR Renders</span>
                </button>
              )}
            </div>
          </div>

          {/* TAB 1: Photo Gallery */}
          {activeTab === "photos" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-xl transition-all duration-500 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10"
                >
                  <Image
                    src={photo}
                    alt={`${service.title} Portfolio Image ${i + 1}`}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                        View Full Screen
                      </span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent">
                        <HiOutlineEye size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Photo Upload Placeholder Card */}
              <div className="group relative aspect-[4/3] flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-accent/30 bg-accent/[0.03] hover:bg-accent/[0.06] hover:border-accent/60 transition-all duration-300 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent mb-3 border border-accent/20 group-hover:scale-110 transition-transform">
                  <HiOutlinePhotograph size={24} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">
                  + Add Project Photo
                </span>
                <p className="text-[11px] text-white/50 max-w-[200px] leading-relaxed">
                  Place images in <br />
                  <code className="text-accent/80 font-mono">public/media/services/{service.id}/photos/</code>
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Video Showcase */}
          {activeTab === "videos" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {videos.map((videoSrc, idx) => (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl relative"
                  >
                    <video
                      controls
                      className="w-full aspect-video object-cover"
                      src={videoSrc}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}

                {/* Video Upload Placeholder Card */}
                <div className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-accent/30 bg-accent/[0.03] hover:bg-accent/[0.06] hover:border-accent/60 transition-all duration-300 text-center aspect-video">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent mb-4 border border-accent/20">
                    <HiOutlineVideoCamera size={28} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                    + Add Project Video
                  </span>
                  <p className="text-xs text-white/60 max-w-xs leading-relaxed">
                    Place walkthrough videos (.mp4) in <br />
                    <code className="text-accent/90 font-mono text-[11px] block mt-1">public/media/services/{service.id}/videos/</code>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 360° VR Render Viewer */}
          {show360 && activeTab === "360" && (
            <div className="space-y-6">
              {render360List.length > 0 ? (
                <div className="space-y-6">
                  {/* Selector Pills for Multiple 360 Tours */}
                  {render360List.length > 1 && (
                    <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-4">
                      <span className="text-xs uppercase tracking-widest text-white/50 font-semibold mr-2">
                        Select 360° Tour ({render360List.length}):
                      </span>
                      {render360List.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActive360Index(idx)}
                          className={`rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                            active360Index === idx
                              ? "bg-accent border-accent text-secondary shadow-lg shadow-accent/20 scale-105"
                              : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-accent/40"
                          }`}
                        >
                          {item.title || `Tour ${idx + 1}`}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between px-2">
                    <span className="text-xs uppercase tracking-widest text-accent font-semibold flex items-center gap-2">
                      <HiOutlineEye size={16} /> {current360?.title || "Interactive 360° VR Spatial Tour"}
                    </span>
                    <a
                      href={current360?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs uppercase tracking-widest text-white/70 hover:text-accent transition-colors font-semibold underline underline-offset-4 flex items-center gap-1"
                    >
                      <span>Open Full Screen</span> ↗
                    </a>
                  </div>

                  <div className="relative aspect-[16/9] min-h-[500px] lg:min-h-[650px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                    <iframe
                      key={current360?.url}
                      src={current360?.url}
                      title={current360?.title || `360 VR Render - ${service.title}`}
                      className="h-full w-full border-0 absolute inset-0"
                      allow="accelerometer; magnetometer; vr; gyroscope; fullscreen"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-accent/20 bg-gradient-to-b from-white/[0.04] to-black/60 p-8 sm:p-12 text-center max-w-3xl mx-auto relative overflow-hidden">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/20 text-accent mb-6 border border-accent/30 shadow-lg shadow-accent/10">
                    <HiOutlineEye size={40} className="animate-pulse" />
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent block mb-2">
                    Interactive 360° Render Studio
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl text-white mb-4">
                    Embed 360° Walkthrough Renders
                  </h3>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl mx-auto mb-8">
                    We support full embedded panoramic VR renders from **Kuula**, **Matterport**, **Momento360**, or **Pannellum**. Share your 360° links to view interactive spatial walkthroughs directly inside this website.
                  </p>

                  <div className="rounded-xl border border-white/10 bg-black/60 p-6 text-left max-w-lg mx-auto">
                    <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                      💡 How to activate:
                    </p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Simply share your 360° render link (e.g. Kuula or Matterport URL) and it will be embedded into this view for clients to tour in 360 degrees!
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Service Deliverables & Features Grid */}
      <section className="border-t border-white/10 bg-black/30 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
              Deliverables &amp; Specifications
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-white">
              What We Deliver
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.features.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-accent/30 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent font-bold text-xs">
                    <HiOutlineCheck size={16} />
                  </span>
                  <span className="text-xs font-semibold tracking-wider text-accent uppercase">
                    Feature 0{idx + 1}
                  </span>
                </div>
                <h3 className="font-heading text-lg text-white font-medium">
                  {feature}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services Navigator */}
      <section className="border-t border-white/10 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-heading text-xl text-white">
              Explore Other Services
            </h3>
            <Link
              href="/#services"
              className="text-xs uppercase tracking-widest text-accent hover:underline font-semibold"
            >
              View All 10 Services →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((other) => (
              <Link
                key={other.id}
                href={`/services/${other.id}`}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.05] hover:border-accent/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-heading text-lg text-white group-hover:text-accent transition-colors mb-2">
                    {other.title}
                  </h4>
                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                    {other.description}
                  </p>
                </div>
                <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Portfolio →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Image Zoom Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl border border-white/20">
            <Image
              src={selectedPhoto}
              alt="Enlarged Portfolio Photo"
              width={1200}
              height={800}
              unoptimized
              className="object-contain max-h-[85vh] w-auto"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white hover:bg-accent hover:text-secondary transition-colors"
              aria-label="Close photo preview"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
