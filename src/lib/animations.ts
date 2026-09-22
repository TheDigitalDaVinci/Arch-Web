// Centralized animation presets and easing curves
export const easings = {
  smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
  outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  inOutCirc: "cubic-bezier(0.85, 0, 0.15, 1)",
  gsapSmooth: "power3.out",
  gsapSnap: "power2.inOut",
  gsapElastic: "elastic.out(1, 0.3)",
  gsapBounce: "bounce.out",
};

export const durations = {
  fast: 0.3,
  normal: 0.6,
  slow: 1,
  xSlow: 1.5,
  hero: 2,
};

export const staggerPresets = {
  tight: 0.03,
  normal: 0.08,
  relaxed: 0.15,
  dramatic: 0.25,
};

export const scrollTriggerDefaults = {
  fadeIn: {
    start: "top 85%",
    toggleActions: "play none none none" as const,
  },
  scrub: {
    start: "top bottom",
    end: "bottom top",
    scrub: true as const,
  },
  pin: {
    start: "top top",
    pin: true as const,
    pinSpacing: true as const,
  },
};

// Animation variant objects for sections
export const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
