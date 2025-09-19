"use client";
import * as React from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium disabled:opacity-50 disabled:pointer-events-none transition-colors";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-white text-neutral-900 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
  secondary:
    "bg-neutral-800 text-neutral-100 hover:bg-neutral-700 border border-white/10",
  outline:
    "border border-white/15 bg-transparent text-neutral-100 hover:bg-white/5",
  ghost: "bg-transparent text-neutral-100 hover:text-white hover:bg-white/5",
};

const sizeClass: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cx(base, variantClass[variant], sizeClass[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
