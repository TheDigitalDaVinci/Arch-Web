"use client";

import { useState } from "react";
import Image from "next/image";
import { FaInstagram, FaYoutube, FaArrowUp, FaMapMarkerAlt, FaDirections } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { companyInfo, navLinks, services } from "@/data/content";

export default function Footer() {
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  const socialLinks = [
    { Icon: FaInstagram, href: companyInfo.social.instagram, label: "Follow us on Instagram" },
    { Icon: FaYoutube, href: companyInfo.social.youtube, label: "Watch on YouTube" },
  ];

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-secondary"
      role="contentinfo"
    >
      {/* ===== Decorative Top Border Line ===== */}
      <div className="w-full h-px bg-accent/30" />

      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        {/* ===== Large Brand Text ===== */}
        <div className="border-b border-white/5 pb-12 pt-20 md:pb-16 md:pt-28">
          <h2 className="font-heading text-5xl font-bold leading-none tracking-tight text-white/[0.04] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]">
            WHITE ROCK
          </h2>
        </div>

        {/* ===== Main Footer Grid ===== */}
        <div className="grid gap-10 border-b border-white/5 py-12 md:py-16 sm:grid-cols-2 lg:grid-cols-4">
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
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-accent hover:text-accent"
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
                      className="text-sm text-white/50 transition-colors hover:text-white"
                      aria-label={`Navigate to ${link.label}`}
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
                      href={`/services/${service.id}`}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                      aria-label={`Learn about ${service.title}`}
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
                className="text-sm text-white/50 transition-colors hover:text-white"
                aria-label={`Call us at ${companyInfo.phone}`}
              >
                {companyInfo.phone}
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                className="text-sm text-white/50 transition-colors hover:text-white"
                aria-label={`Email us at ${companyInfo.email}`}
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
                  className="w-full border border-r-0 border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-accent/50"
                />
                <button
                  type="submit"
                  className="shrink-0 border border-accent bg-accent px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-secondary transition-colors hover:bg-accent-light"
                  aria-label="Subscribe to newsletter"
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
                className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-secondary"
              >
                <FaMapMarkerAlt className="text-xs" />
                <span>Open in Google Maps</span>
                <HiOutlineExternalLink className="text-xs" />
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=White+Rock+Foundations+Penta+Plaza+North+Paravur"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/80 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
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
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-accent/40">
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
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-accent/40">
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
        <div className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <p className="text-[12px] text-white/40">
            © {currentYear} {companyInfo.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-[12px] text-white/40 transition-colors hover:text-white/70"
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[12px] text-white/40 transition-colors hover:text-white/70"
              aria-label="Terms of Service"
            >
              Terms of Service
            </a>

            {/* Back to top */}
            <button
              onClick={handleBackToTop}
              className="group flex items-center gap-2 text-[12px] text-white/40 transition-colors hover:text-accent"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <FaArrowUp className="text-[10px]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
