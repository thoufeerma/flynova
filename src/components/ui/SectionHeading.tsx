import React from "react";

export interface SectionHeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3;
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  highlight?: React.ReactNode;
}

export default function SectionHeading({
  children,
  level = 2,
  as,
  className = "",
  highlight,
}: SectionHeadingProps) {
  const Component = as || (`h${level}` as "h1" | "h2" | "h3");

  const scaleClasses = {
    1: "font-serif font-playfair text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]",
    2: "font-serif font-playfair text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight",
    3: "font-serif font-playfair text-xl sm:text-2xl font-normal tracking-tight text-white leading-snug",
  }[level];

  return (
    <Component className={`${scaleClasses} ${className}`.trim()}>
      {children}
      {highlight && (
        <>
          {" "}
          <span className="text-[#f3cb6b] font-serif font-normal">{highlight}</span>
        </>
      )}
    </Component>
  );
}
