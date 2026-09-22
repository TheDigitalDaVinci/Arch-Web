"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import gsap from "gsap";
import { useIsMobile } from "@/hooks/useMediaQuery";

type CursorState = "default" | "view" | "play" | "drag" | "open" | "link";

const CURSOR_LABELS: Record<CursorState, string> = {
  default: "",
  view: "View",
  play: "Play",
  drag: "Drag",
  open: "Open",
  link: "View",
};

export default function CustomCursor() {
  const isMobile = useIsMobile();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const isVisible = useRef(false);

  const updateCursorStyle = useCallback((state: CursorState) => {
    const ring = ringRef.current;
    const text = textRef.current;
    const dot = dotRef.current;
    if (!ring || !text || !dot) return;

    if (state === "default") {
      gsap.to(ring, {
        width: 40,
        height: 40,
        borderColor: "rgba(200, 168, 107, 0.5)",
        backgroundColor: "transparent",
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(dot, {
        width: 8,
        height: 8,
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(text, {
        opacity: 0,
        duration: 0.2,
      });
    } else {
      gsap.to(ring, {
        width: 80,
        height: 80,
        borderColor: "rgba(200, 168, 107, 0.8)",
        backgroundColor: "rgba(200, 168, 107, 0.1)",
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(dot, {
        width: 4,
        height: 4,
        opacity: 0.5,
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(text, {
        opacity: 1,
        duration: 0.3,
        delay: 0.1,
      });
      text.textContent = CURSOR_LABELS[state] || "";
    }
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const text = textRef.current;
    if (!dot || !ring || !text) return;

    // ---- Mouse tracking ----
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
        // Snap to initial position immediately
        dotPos.current = { x: e.clientX, y: e.clientY };
        ringPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
      gsap.to([dot, ring, text], { opacity: 0, duration: 0.3 });
    };

    const handleMouseEnter = () => {
      isVisible.current = true;
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    // ---- Animation loop ----
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      // Dot follows more closely
      dotPos.current.x = lerp(dotPos.current.x, mousePos.current.x, 0.35);
      dotPos.current.y = lerp(dotPos.current.y, mousePos.current.y, 0.35);

      // Ring follows with more easing
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.15);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.15);

      dot.style.transform = `translate(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px)`;
      ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      text.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    // ---- data-cursor attribute listeners ----
    const handleElementEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const cursorType = target.getAttribute("data-cursor") as CursorState;
      if (cursorType) {
        setCursorState(cursorType);
        updateCursorStyle(cursorType);
      }
    };

    const handleElementLeave = () => {
      setCursorState("default");
      updateCursorStyle("default");
    };

    // Also handle links and buttons without explicit data-cursor
    const handleLinkEnter = () => {
      setCursorState("link");
      updateCursorStyle("link");
    };

    const handleLinkLeave = () => {
      setCursorState("default");
      updateCursorStyle("default");
    };

    const attachListeners = () => {
      // Elements with data-cursor attribute
      const cursorElements = document.querySelectorAll("[data-cursor]");
      cursorElements.forEach((el) => {
        el.addEventListener("mouseenter", handleElementEnter);
        el.addEventListener("mouseleave", handleElementLeave);
      });

      // Links and buttons without data-cursor
      const interactiveElements = document.querySelectorAll(
        "a:not([data-cursor]), button:not([data-cursor])"
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleLinkEnter);
        el.addEventListener("mouseleave", handleLinkLeave);
      });
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Attach cursor listeners initially and observe for DOM changes
    attachListeners();

    const observer = new MutationObserver(() => {
      attachListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();

      const cursorElements = document.querySelectorAll("[data-cursor]");
      cursorElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementEnter);
        el.removeEventListener("mouseleave", handleElementLeave);
      });

      const interactiveElements = document.querySelectorAll(
        "a:not([data-cursor]), button:not([data-cursor])"
      );
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkEnter);
        el.removeEventListener("mouseleave", handleLinkLeave);
      });
    };
  }, [isMobile, updateCursorStyle]);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <div aria-hidden="true">
      {/* Dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: 0 }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: 0 }}
      />
      {/* Text label */}
      <div
        ref={textRef}
        className="cursor-text"
        style={{ opacity: 0 }}
      >
        {CURSOR_LABELS[cursorState]}
      </div>
    </div>
  );
}
