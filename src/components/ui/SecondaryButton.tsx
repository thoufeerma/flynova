import React from "react";
import Link from "next/link";

export interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export default function SecondaryButton({
  href,
  icon,
  children,
  className = "",
  external = false,
  ...buttonProps
}: SecondaryButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm font-medium tracking-wider uppercase bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-gold-base transition-all duration-300 cursor-pointer select-none active:scale-[0.98]";

  const combinedClasses = `${baseClasses} ${className}`.trim();

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          <span>{children}</span>
          {icon}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        <span>{children}</span>
        {icon}
      </Link>
    );
  }

  return (
    <button {...buttonProps} className={combinedClasses}>
      <span>{children}</span>
      {icon}
    </button>
  );
}
