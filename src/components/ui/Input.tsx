"use client";
import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function cx(...a: Array<string | undefined | null | false>) {
  return a.filter(Boolean).join(" ");
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cx(
          "flex h-10 w-full rounded-md border border-white/10",
          "bg-neutral-900/40 px-3 py-2 text-sm text-neutral-100",
          "placeholder:text-neutral-500",
          "focus:outline-none focus:ring-2 focus:ring-white/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export default Input;
