import React from "react";

export interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "div" | "p";
}

export default function SectionEyebrow({
  children,
  className = "",
  as = "span",
}: SectionEyebrowProps) {
  const Component = as;
  const baseClasses =
    "font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#dcb037] inline-flex items-center gap-2 mb-3 select-none";

  return <Component className={`${baseClasses} ${className}`.trim()}>{children}</Component>;
}
