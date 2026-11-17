"use client";

interface SectionHeadingProps {
  number?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  number,
  title,
  subtitle,
  align = "left",
  light = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 md:mb-16 lg:mb-20 ${align === "center" ? "text-center" : ""} ${className}`}
    >
      {number && (
        <span
          className={`block text-sm font-sans font-medium tracking-[0.3em] uppercase mb-4 text-accent`}
        >
          {number}
        </span>
      )}
      <h2
        className={`font-heading text-4xl md:text-5xl lg:text-6xl ${
          light ? "text-white" : "text-secondary"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 md:mt-6 text-base md:text-lg max-w-2xl leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-white/60" : "text-text-light"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
