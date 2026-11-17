"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { navLinks, companyInfo } from "@/data/content";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Background blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Lock escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsMenuOpen(false);

      const targetId = href.replace("#", "");
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "instant" });
      }
    },
    []
  );

  return (
    <div>
      {/* ===== Main Navigation Bar ===== */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-[1000] ${
          isScrolled || isMenuOpen ? "bg-secondary/95 backdrop-blur-md shadow-md" : "bg-secondary/70 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
          <div className="flex h-20 items-center justify-between md:h-24">
            {/* ----- Logo ----- */}
            <a
              href="#"
              className="group flex items-center gap-3"
              aria-label={`${companyInfo.name} — Home`}
            >
              {companyInfo.logo ? (
                <Image
                  src={companyInfo.logo}
                  alt={companyInfo.name}
                  width={220}
                  height={52}
                  priority
                  className="h-9 w-auto md:h-11 object-contain"
                />
              ) : (
                <div className="flex flex-col">
                  <span className="font-heading text-lg font-semibold tracking-[0.15em] text-white md:text-xl">
                    WHITE ROCK
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="h-px w-5 bg-accent opacity-70" />
                    <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/60 md:text-[10px]">
                      Builders &amp; Interiors
                    </span>
                  </div>
                </div>
              )}
            </a>

            {/* ----- Desktop Nav Links ----- */}
            <div className="hidden items-center gap-8 lg:flex xl:gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="link-underline text-[13px] font-medium uppercase tracking-[0.15em] text-white/80 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* ----- CTA + Hamburger ----- */}
            <div className="flex items-center gap-4">
              {/* CTA Button — Desktop only */}
              <a
                href={companyInfo.consultationForm}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-full border border-accent bg-accent/15 px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-accent hover:bg-accent hover:text-secondary lg:inline-flex"
                aria-label="Book Consultation (opens Google Form)"
              >
                Book Consultation
              </a>

              {/* Hamburger — Mobile / Tablet */}
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="relative z-[1001] flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <span
                  className={`block h-[1.5px] w-6 bg-white ${
                    isMenuOpen ? "translate-y-[4.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-6 bg-white ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-6 bg-white ${
                    isMenuOpen ? "-translate-y-[4.5px] -rotate-45" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== Full-screen Mobile Overlay Menu ===== */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-secondary/98 backdrop-blur-xl"
        >
          <nav
            className="flex flex-col items-center gap-6 md:gap-8"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {companyInfo.logo && (
              <div className="mb-2">
                <Image
                  src={companyInfo.logo}
                  alt={companyInfo.name}
                  width={200}
                  height={48}
                  className="h-10 w-auto object-contain"
                />
              </div>
            )}
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-heading text-3xl font-medium tracking-wide text-white/90 hover:text-accent sm:text-4xl md:text-5xl"
              >
                {link.label}
              </a>
            ))}

            {/* CTA in overlay */}
            <a
              href={companyInfo.consultationForm}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 rounded-full border border-accent bg-accent/20 px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-accent hover:bg-accent hover:text-secondary"
              aria-label="Book Consultation (opens Google Form)"
            >
              Book Consultation
            </a>
          </nav>

          {/* Contact info in overlay */}
          <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2 text-center">
            <a
              href={`tel:${companyInfo.phone}`}
              className="text-sm text-white/40 hover:text-accent"
              aria-label={`Call us at ${companyInfo.phone}`}
            >
              {companyInfo.phone}
            </a>
            <a
              href={`mailto:${companyInfo.email}`}
              className="text-sm text-white/40 hover:text-accent"
              aria-label={`Email us at ${companyInfo.email}`}
            >
              {companyInfo.email}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
