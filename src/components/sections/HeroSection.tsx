"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { companyInfo } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

/* ─── Particle system ─── */
interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeDirection: number;
}

function createParticle(canvasWidth: number, canvasHeight: number): Particle {
  return {
    x: Math.random() * canvasWidth,
    y: canvasHeight + Math.random() * 40,
    size: Math.random() * 2.5 + 0.5,
    speedY: Math.random() * 0.6 + 0.2,
    speedX: (Math.random() - 0.5) * 0.3,
    opacity: Math.random() * 0.5 + 0.1,
    fadeDirection: 1,
  };
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  /* ─── Canvas particle loop ─── */
  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((p) => {
      // Move
      p.y -= p.speedY;
      p.x += p.speedX;

      // Pulse opacity
      p.opacity += p.fadeDirection * 0.003;
      if (p.opacity >= 0.6) p.fadeDirection = -1;
      if (p.opacity <= 0.08) p.fadeDirection = 1;

      // Reset when off-screen
      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }

      // Draw gold-tinted circle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 168, 107, ${p.opacity})`;
      ctx.fill();
    });

    animationFrameRef.current = requestAnimationFrame(drawParticles);
  }, []);

  /* ─── Initialise & resize canvas ─── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();

    // Seed particles (~30)
    particlesRef.current = Array.from({ length: 30 }, () =>
      createParticle(canvas.width, canvas.height)
    );
    // Spread initial positions across the full height
    particlesRef.current.forEach((p) => {
      p.y = Math.random() * canvas.height;
    });

    animationFrameRef.current = requestAnimationFrame(drawParticles);

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [drawParticles]);

  /* ─── GSAP animations ─── */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ── Ken Burns zoom on background ── */
        gsap.fromTo(
          ".hero-bg",
          { scale: 1 },
          {
            scale: 1.12,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        /* ── Heading words stagger ── */
        gsap.from(".hero-word", {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.4,
        });

        /* ── Subheading fade-up ── */
        gsap.from(".hero-subheading", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: 1.1,
        });

        /* ── Buttons fade-up ── */
        gsap.from(".hero-btn", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 1.5,
        });

        /* ── Scroll indicator fade-in ── */
        gsap.from(".hero-scroll-indicator", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          delay: 2,
        });

        /* ── Mouse dot bounce ── */
        gsap.to(".mouse-dot", {
          y: 8,
          duration: 1.2,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });

        /* ── Decorative corner lines ── */
        gsap.from(".corner-line", {
          scaleX: 0,
          scaleY: 0,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          delay: 1.8,
        });

        /* ── Parallax fade-out on scroll ── */
        gsap.to(".hero-content", {
          opacity: 0,
          scale: 0.96,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "60% top",
            scrub: true,
          },
        });
      });

      /* ── Disable canvas particles on mobile ── */
      mm.add("(max-width: 768px)", () => {
        if (canvasRef.current) {
          canvasRef.current.style.display = "none";
        }
        cancelAnimationFrame(animationFrameRef.current);
      });

      mm.add("(min-width: 769px)", () => {
        if (canvasRef.current) {
          canvasRef.current.style.display = "block";
        }
      });
    },
    { scope: containerRef }
  );

  /* ─── Heading split into words ─── */
  const headingText = "Crafting Timeless Spaces.";
  const words = headingText.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Animated gradient background & Drone Video ── */}
      <div
        className="hero-bg gpu-accelerated absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #1a1510 25%, #111111 50%, #0d1117 75%, #0a0a0a 100%)",
          backgroundSize: "400% 400%",
          animation: "heroGradientShift 12s ease infinite",
        }}
        aria-hidden="true"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="/videos/hero-drone.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Dark overlay gradient ── */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 50%, rgba(0,0,0,0.4) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Canvas particles ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[2] pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Decorative corner lines ── */}
      {/* Top-left */}
      <div className="absolute top-8 left-8 z-[3] hidden md:block" aria-hidden="true">
        <div className="corner-line h-px w-16 bg-accent/40 origin-left" />
        <div className="corner-line mt-0 w-px h-16 bg-accent/40 origin-top" />
      </div>
      {/* Top-right */}
      <div className="absolute top-8 right-8 z-[3] hidden md:block" aria-hidden="true">
        <div className="corner-line h-px w-16 bg-accent/40 origin-right ml-auto" />
        <div className="corner-line mt-0 w-px h-16 bg-accent/40 origin-top ml-auto" />
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-8 left-8 z-[3] hidden md:block" aria-hidden="true">
        <div className="corner-line w-px h-16 bg-accent/40 origin-bottom" />
        <div className="corner-line h-px w-16 bg-accent/40 origin-left" />
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-8 right-8 z-[3] hidden md:block" aria-hidden="true">
        <div className="corner-line w-px h-16 bg-accent/40 origin-bottom ml-auto" />
        <div className="corner-line h-px w-16 bg-accent/40 origin-right ml-auto" />
      </div>

      {/* ── Main hero content ── */}
      <div className="hero-content relative z-[4] flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Heading */}
        <h1 className="max-w-4xl font-heading text-5xl font-bold leading-[1.05] text-white md:text-7xl xl:text-8xl">
          {words.map((word, i) => (
            <span key={i} className="hero-word inline-block mr-[0.25em] last:mr-0">
              {word}
            </span>
          ))}
        </h1>

        {/* Subheading */}
        <p className="hero-subheading mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:mt-8 md:text-xl">
          We design and build premium residences, villas, commercial spaces and
          luxury interiors.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6 md:mt-12">
          <a
            href="#projects"
            className="hero-btn magnetic-btn inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-widest text-secondary transition-colors hover:bg-accent-light"
          >
            Explore Projects
          </a>
          <a
            href={companyInfo.consultationForm}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn magnetic-btn inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:border-accent hover:text-accent"
            aria-label="Book Consultation (opens Google Form)"
          >
            Book Consultation
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero-scroll-indicator absolute bottom-10 left-1/2 z-[4] flex -translate-x-1/2 flex-col items-center gap-3">
        {/* Mouse shape */}
        <div
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 pt-2"
          aria-hidden="true"
        >
          <div className="mouse-dot h-1.5 w-1.5 rounded-full bg-accent" />
        </div>
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
          Scroll to explore
        </span>
      </div>

      {/* ── Gradient keyframes (injected via style tag) ── */}
      <style jsx>{`
        @keyframes heroGradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
}
