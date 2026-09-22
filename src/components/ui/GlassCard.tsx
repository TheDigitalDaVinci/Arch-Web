"use client";

import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  hover?: boolean;
  onClick?: () => void;
  "data-cursor"?: string;
}

export default function GlassCard({
  children,
  className = "",
  dark = false,
  hover = true,
  onClick,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        ${dark
          ? "bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl"
          : "bg-white/70 border border-white/40 backdrop-blur-xl"
        }
        ${hover
          ? "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-xl"
          : ""
        }
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {/* Subtle gradient shimmer overlay */}
      <div
        className={`
          absolute inset-0 opacity-0 transition-opacity duration-500
          ${hover ? "group-hover:opacity-100" : ""}
          bg-gradient-to-br from-white/[0.05] via-transparent to-white/[0.02]
          pointer-events-none
        `}
      />
      {children}
    </div>
  );
}
