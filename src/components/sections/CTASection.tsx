"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { companyInfo } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Floating gold particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number = 0;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      opacityDir: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const initParticles = () => {
      const count = window.innerWidth < 768 ? 20 : 40;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.1,
        opacityDir: Math.random() > 0.5 ? 0.003 : -0.003,
      }));
    };

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.opacityDir;

        if (p.opacity <= 0.1 || p.opacity >= 0.7) p.opacityDir *= -1;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 168, 107, ${p.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    window.addEventListener("resize", resize);

    // Respect prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      cancelAnimationFrame(animationId);
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Word-by-word text reveal
      const headingEl = containerRef.current?.querySelector(".cta-heading");
      if (headingEl) {
        const text = headingEl.textContent || "";
        const words = text.split(" ");
        headingEl.innerHTML = words
          .map(
            (word) =>
              `<span class="inline-block overflow-hidden"><span class="cta-word inline-block" style="transform: translateY(100%); opacity: 0">${word}</span></span>`
          )
          .join(" ");

        gsap.to(headingEl.querySelectorAll(".cta-word"), {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingEl,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Subtext fade in
      gsap.from(".cta-subtext", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-subtext",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Button fade in
      gsap.from(".cta-button-wrap", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-button-wrap",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // Phone link fade in
      mm.add("(min-width: 1px)", () => {
        gsap.from(".cta-phone", {
          opacity: 0,
          duration: 0.8,
          delay: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-phone",
            start: "top 95%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 bg-secondary"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "linear-gradient(-45deg, #111111, #1a1a2e, #16213e, #0f3460, #111111)",
            backgroundSize: "400% 400%",
            animation: "gradientShift 15s ease infinite",
          }}
        />
      </div>

      {/* Gold particles canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-12 py-24 md:py-32 max-w-5xl mx-auto">
        <h2
          id="cta-heading"
          className="cta-heading font-heading text-4xl md:text-6xl xl:text-7xl text-white text-center mb-8 leading-tight"
        >
          Let&apos;s Build Something Extraordinary.
        </h2>

        <p className="cta-subtext text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12">
          Your vision, our expertise. Together, we create spaces that stand the
          test of time.
        </p>

        <div className="cta-button-wrap flex flex-col items-center gap-6">
          <a
            href="#contact"
            className="magnetic-btn bg-accent text-secondary font-semibold text-lg rounded-full px-12 py-5 transition-all duration-300 hover:bg-accent-light hover:scale-105 hover:shadow-[0_0_40px_rgba(200,168,107,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
          >
            Start Your Project
          </a>

          <p className="cta-phone text-white/40 text-sm">
            or call us at{" "}
            <a
              href={`tel:${companyInfo.phone.replace(/\s|\(|\)|-/g, "")}`}
              className="text-white/60 hover:text-accent transition-colors duration-300 link-underline"
            >
              {companyInfo.phone}
            </a>
          </p>
        </div>
      </div>

      {/* CSS keyframes for gradient animation */}
      <style jsx>{`
        @keyframes gradientShift {
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
