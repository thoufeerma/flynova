import React from "react";
import Link from "next/link";

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export default function PrimaryButton({
  href,
  icon,
  children,
  className = "",
  external = false,
  ...buttonProps
}: PrimaryButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase bg-gold-base hover:bg-gold-light text-black shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer select-none active:scale-[0.98]";

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
