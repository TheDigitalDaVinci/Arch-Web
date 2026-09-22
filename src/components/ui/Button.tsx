"use client";

import { type ReactNode } from "react";
import MagneticButton from "@/components/animations/MagneticButton";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  magnetic?: boolean;
  "data-cursor"?: string;
  "aria-label"?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
  magnetic = true,
  ...props
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-sans font-medium tracking-wide transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden group";

  const variants = {
    primary:
      "bg-accent text-secondary hover:bg-accent-light rounded-full",
    secondary:
      "bg-secondary text-white hover:bg-secondary/90 rounded-full",
    outline:
      "bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-full",
    ghost:
      "bg-transparent text-text hover:text-accent",
  };

  const sizes = {
    sm: "px-6 py-2.5 text-xs uppercase tracking-[0.15em]",
    md: "px-8 py-3.5 text-sm uppercase tracking-[0.12em]",
    lg: "px-12 py-5 text-sm uppercase tracking-[0.15em]",
  };

  const allStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {/* Ripple effect background */}
      <span className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 rounded-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (magnetic) {
    if (href) {
      return (
        <MagneticButton as="a" href={href} className={allStyles} {...props}>
          {content}
        </MagneticButton>
      );
    }
    return (
      <MagneticButton as="button" onClick={onClick} className={allStyles} {...props}>
        {content}
      </MagneticButton>
    );
  }

  if (href) {
    return (
      <a href={href} className={allStyles} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={allStyles} {...props}>
      {content}
    </button>
  );
}
