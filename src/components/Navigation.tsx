"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { navLinks, companyInfo } from "@/data/content";
import { useIsMobile } from "@/hooks/useMediaQuery";

export default function Navigation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLAnchorElement[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const isMobile = useIsMobile();

  // ----- Scroll behavior: glass bg + hide/show -----
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Glass background after scrolling 50px
      setIsScrolled(currentScrollY > 50);

      // Hide on scroll down, show on scroll up (only after 200px)
      if (currentScrollY > 200) {
        if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 5) {
          setIsHidden(true);
        } else if (lastScrollY.current - currentScrollY > 5) {
          setIsHidden(false);
        }
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ----- Mobile menu animations -----
  useGSAP(
    () => {
      if (!overlayRef.current) return;

      if (isMenuOpen) {
        // Prevent body scroll
        document.body.style.overflow = "hidden";

        gsap.set(overlayRef.current, { display: "flex" });
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        });

        // Stagger menu items
        gsap.fromTo(
          menuItemsRef.current,
          {
            y: 60,
            opacity: 0,
            rotateX: -15,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.2,
          }
        );
      } else {
        document.body.style.overflow = "";

        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power3.inOut",
          onComplete: () => {
            if (overlayRef.current) {
              gsap.set(overlayRef.current, { display: "none" });
            }
          },
        });
      }
    },
    { scope: containerRef, dependencies: [isMenuOpen] }
  );

  // ----- Lock escape key to close menu -----
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

      // Smooth scroll to section
      const targetId = href.replace("#", "");
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  const setMenuItemRef = useCallback(
    (el: HTMLAnchorElement | null, index: number) => {
      if (el) {
        menuItemsRef.current[index] = el;
      }
    },
    []
  );

  return (
    <div ref={containerRef}>
      {/* ===== Main Navigation Bar ===== */}
      <nav
        ref={navRef}
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          isHidden && !isMenuOpen ? "-translate-y-full" : "translate-y-0"
        } ${isScrolled && !isMenuOpen ? "glass-dark" : "bg-transparent"}`}
      >
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
          <div className="flex h-20 items-center justify-between md:h-24">
            {/* ----- Logo ----- */}
            <a
              href="#"
              className="group flex items-center gap-3"
              aria-label={`${companyInfo.name} — Home`}
              data-cursor="link"
            >
              {companyInfo.logo ? (
                <Image
                  src={companyInfo.logo}
                  alt={companyInfo.name}
                  width={220}
                  height={52}
                  priority
                  className="h-9 w-auto md:h-11 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
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
                  className="link-underline text-[13px] font-medium uppercase tracking-[0.15em] text-white/80 transition-colors duration-300 hover:text-white"
                  data-cursor="link"
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
                className="magnetic-btn hidden rounded-full border border-accent bg-accent/10 px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-accent transition-all duration-300 hover:bg-accent hover:text-secondary lg:inline-flex"
                data-cursor="link"
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
                  className={`block h-[1.5px] w-6 bg-white transition-all duration-300 ease-[var(--ease-smooth)] ${
                    isMenuOpen ? "translate-y-[4.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-6 bg-white transition-all duration-300 ease-[var(--ease-smooth)] ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-6 bg-white transition-all duration-300 ease-[var(--ease-smooth)] ${
                    isMenuOpen ? "-translate-y-[4.5px] -rotate-45" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== Full-screen Mobile Overlay Menu ===== */}
      <div
        ref={overlayRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className="fixed inset-0 z-[999] hidden flex-col items-center justify-center bg-secondary/95 backdrop-blur-xl"
        style={{ opacity: 0 }}
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
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              ref={(el) => setMenuItemRef(el, i)}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-heading text-3xl font-medium tracking-wide text-white/90 transition-colors duration-300 hover:text-accent sm:text-4xl md:text-5xl"
              data-cursor="link"
            >
              {link.label}
            </a>
          ))}

          {/* CTA in overlay */}
          <a
            ref={(el) => setMenuItemRef(el, navLinks.length)}
            href={companyInfo.consultationForm}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 rounded-full border border-accent bg-accent/10 px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-accent transition-all duration-300 hover:bg-accent hover:text-secondary"
            data-cursor="link"
            aria-label="Book Consultation (opens Google Form)"
          >
            Book Consultation
          </a>
        </nav>

        {/* Contact info in overlay */}
        <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2 text-center">
          <a
            href={`tel:${companyInfo.phone}`}
            className="text-sm text-white/40 transition-colors hover:text-accent"
            aria-label={`Call us at ${companyInfo.phone}`}
          >
            {companyInfo.phone}
          </a>
          <a
            href={`mailto:${companyInfo.email}`}
            className="text-sm text-white/40 transition-colors hover:text-accent"
            aria-label={`Email us at ${companyInfo.email}`}
          >
            {companyInfo.email}
          </a>
        </div>
      </div>
    </div>
  );
}
