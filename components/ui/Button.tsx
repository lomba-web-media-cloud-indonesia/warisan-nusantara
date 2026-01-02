"use client";
import Link from "next/link";
import clsx from "clsx";

type ButtonProps = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function Button({
  label,
  href,
  variant = "primary",
  size = "md",
  className,
}: ButtonProps) {
  const isAnchor = href.startsWith("#");

  const baseStyle =
    "inline-flex items-center justify-center rounded-lg font-body font-medium transition-all duration-300 ease-in-out hover:scale-[1.03] hover:bg-[var(--color-accent)]";

  const variantStyle = {
    primary: "bg-[var(--color-primary)] text-[var(--color-background)]",
    secondary: "bg-[var(--color-secondary)] text-[var(--color-background)]",
    accent: "bg-[var(--color-accent)] text-[var(--color-background)]",
  };
  const sizeStyle = {
    sm: "text-sm px-4 py-2",
    md: "text-md px-6 py-3",
    lg: "text-lg px-8 py-4",
  };

  const classes = clsx(
    baseStyle,
    variantStyle[variant],
    sizeStyle[size],
    className
  );

  if (isAnchor) {
    return (
      <a href={href} className={classes}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  );
}
