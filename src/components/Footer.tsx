"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaYoutube, FaArrowUp, FaMapMarkerAlt, FaDirections } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { companyInfo, navLinks, services } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");

  const currentYear = new Date().getFullYear();

  // Entrance animations
  useGSAP(
    () => {
      // SVG decorative line draw
      if (lineRef.current) {
        const lineLength = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: lineLength,
          strokeDashoffset: lineLength,
        });
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }

      // Brand text reveal
      if (brandRef.current) {
        gsap.fromTo(
          brandRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: brandRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Grid columns stagger
      if (gridRef.current) {
        const columns = gridRef.current.children;
        gsap.fromTo(
          columns,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Bottom bar fade
      if (bottomRef.current) {
        gsap.fromTo(
          bottomRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            delay: 0.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bottomRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  const handleBackToTop = () => {
    // Try lenis first, fallback to native
    const lenisInstance = (window as unknown as { lenis?: { scrollTo: (target: number, options?: object) => void } }).lenis;
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, integrate with email service
    setEmail("");
  };

  const socialLinks = [
    { Icon: FaInstagram, href: companyInfo.social.instagram, label: "Follow us on Instagram" },
    { Icon: FaYoutube, href: companyInfo.social.youtube, label: "Watch on YouTube" },
  ];

  return (
    <footer
      ref={containerRef}
      id="contact"
      className="relative overflow-hidden bg-secondary"
      role="contentinfo"
    >
      {/* ===== Decorative SVG Line ===== */}
      <div className="absolute left-0 right-0 top-0 flex items-center justify-center overflow-hidden">
        <svg
          width="100%"
          height="2"
          viewBox="0 0 1440 2"
          preserveAspectRatio="none"
          className="w-full"
        >
          <path
            ref={lineRef}
            d="M0 1 H1440"
            stroke="#C8A86B"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        {/* ===== Large Brand Text ===== */}
        <div
          ref={brandRef}
          className="border-b border-white/5 pb-12 pt-20 md:pb-16 md:pt-28"
          style={{ opacity: 0 }}
        >
          <h2 className="font-heading text-5xl font-bold leading-none tracking-tight text-white/[0.04] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]">
            WHITE ROCK
          </h2>
        </div>

        {/* ===== Main Footer Grid ===== */}
        <div
          ref={gridRef}
          className="grid gap-10 border-b border-white/5 py-12 md:py-16 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Column 1: About */}
          <div className="flex flex-col gap-5">
            {companyInfo.logo && (
              <div className="mb-1">
                <Image
                  src={companyInfo.logo}
                  alt={companyInfo.name}
                  width={190}
                  height={45}
                  className="h-8 w-auto object-contain"
                />
              </div>
            )}
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">
              About
            </h3>
            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              {companyInfo.description}
            </p>
            <p className="text-sm leading-relaxed text-white/50">
              {companyInfo.tagline}
            </p>

            {/* Social Icons */}
            <div className="mt-2 flex items-center gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-accent hover:text-accent"
                  data-cursor="link"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">
              Quick Links
            </h3>
            <nav aria-label="Footer quick links">
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 transition-colors duration-300 hover:text-white"
                      aria-label={`Navigate to ${link.label}`}
                      data-cursor="link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Services */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">
              Services
            </h3>
            <nav aria-label="Footer services">
              <ul className="flex flex-col gap-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <a
                      href={`#services`}
                      className="text-sm text-white/50 transition-colors duration-300 hover:text-white"
                      aria-label={`Learn about ${service.title}`}
                      data-cursor="link"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 4: Contact + Newsletter */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">
              Contact
            </h3>
            <address className="flex flex-col gap-3 not-italic">
              <a
                href={`tel:${companyInfo.phone}`}
                className="text-sm text-white/50 transition-colors duration-300 hover:text-white"
                aria-label={`Call us at ${companyInfo.phone}`}
                data-cursor="link"
              >
                {companyInfo.phone}
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                className="text-sm text-white/50 transition-colors duration-300 hover:text-white"
                aria-label={`Email us at ${companyInfo.email}`}
                data-cursor="link"
              >
                {companyInfo.email}
              </a>
              <p className="text-sm leading-relaxed text-white/50">
                {companyInfo.address}
              </p>
              <a
                href={companyInfo.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 text-xs text-accent transition-colors hover:text-accent-light"
                aria-label="View White Rock location on Google Maps"
                data-cursor="link"
              >
                <FaMapMarkerAlt className="text-[11px]" />
                <span>View on Google Maps</span>
              </a>
            </address>

            {/* Newsletter */}
            <div className="mt-3">
              <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.15em] text-white/40">
                Newsletter
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex"
                aria-label="Newsletter signup"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-r-0 border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors duration-300 focus:border-accent/50"
                />
                <button
                  type="submit"
                  className="shrink-0 border border-accent bg-accent px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-secondary transition-all duration-300 hover:bg-accent-light"
                  aria-label="Subscribe to newsletter"
                  data-cursor="link"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ===== Google Map Location Widget ===== */}
        <div className="border-t border-white/10 pt-12 pb-14">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                Our Location
              </span>
              <h3 className="mt-1 font-heading text-2xl font-normal text-white md:text-3xl">
                Visit Our Studio & Experience Center
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={companyInfo.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-accent transition-all duration-300 hover:bg-accent hover:text-secondary hover:shadow-lg hover:shadow-accent/20"
                data-cursor="link"
              >
                <FaMapMarkerAlt className="text-xs" />
                <span>Open in Google Maps</span>
                <HiOutlineExternalLink className="text-xs" />
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=White+Rock+Foundations+Penta+Plaza+North+Paravur"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/80 transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white"
                data-cursor="link"
              >
                <FaDirections className="text-xs text-accent" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
            {/* Office Details */}
            <div className="flex flex-col justify-between gap-4 lg:col-span-4">
              {/* Main Office Card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.05]">
                <div className="mb-2 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                    <FaMapMarkerAlt className="text-xs" />
                    Main Office
                  </span>
                  <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-semibold text-accent">
                    HQ
                  </span>
                </div>
                <h4 className="font-heading text-lg font-medium text-white">
                  Penta Plaza
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-white/60">
                  2nd Floor, Penta Plaza, North Paravur, Ernakulam, Kerala - 683513
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3 text-[11px] text-white/50">
                  <span>Mon – Sat: 9:00 AM – 6:30 PM</span>
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="text-accent transition-colors hover:underline"
                  >
                    Call Studio
                  </a>
                </div>
              </div>

              {/* Branch Office Card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.05]">
                <div className="mb-2 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                    <FaMapMarkerAlt className="text-xs" />
                    Branch Office
                  </span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/60">
                    Thrissur
                  </span>
                </div>
                <h4 className="font-heading text-lg font-medium text-white">
                  KGM Arcade
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-white/60">
                  1st Floor, KGM Arcade, Koorkenchery, Thrissur, Kerala
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3 text-[11px] text-white/50">
                  <span>Mon – Sat: 9:00 AM – 6:30 PM</span>
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="text-accent transition-colors hover:underline"
                  >
                    Call Branch
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps Interactive Embed */}
            <div className="relative min-h-[340px] overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-2xl lg:col-span-8 md:min-h-[380px]">
              <iframe
                title="White Rock Foundations Location Map"
                src={companyInfo.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "340px" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full object-cover filter contrast-[1.05]"
              />
              <div className="pointer-events-none absolute bottom-4 left-4 rounded-xl border border-white/10 bg-black/85 px-4 py-2 backdrop-blur-md shadow-lg">
                <p className="text-xs font-semibold text-white">White Rock Foundations</p>
                <p className="text-[11px] text-white/60">Penta Plaza, North Paravur</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Bottom Bar ===== */}
        <div
          ref={bottomRef}
          className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row"
          style={{ opacity: 0 }}
        >
          <p className="text-[12px] text-white/30">
            © {currentYear} {companyInfo.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-[12px] text-white/30 transition-colors hover:text-white/60"
              aria-label="Privacy Policy"
              data-cursor="link"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[12px] text-white/30 transition-colors hover:text-white/60"
              aria-label="Terms of Service"
              data-cursor="link"
            >
              Terms of Service
            </a>

            {/* Back to top */}
            <button
              onClick={handleBackToTop}
              className="group flex items-center gap-2 text-[12px] text-white/30 transition-colors hover:text-accent"
              aria-label="Back to top"
              data-cursor="link"
            >
              <span>Back to Top</span>
              <FaArrowUp className="text-[10px] transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
