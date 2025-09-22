"use client";
import React from "react";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary"|"ghost" };
const ButtonBase = ({ className="", variant="primary", ...rest }: Props) => {
  const base = "rounded-xl px-4 py-2 font-medium transition";
  const variants = variant==="ghost"
    ? "bg-transparent border border-white/15 hover:bg-white/5"
    : "bg-emerald text-[#0b0f14] hover:opacity-90";
  return <button className={`${base} ${variants} ${className}`} {...rest} />;
};
export default ButtonBase;
export { ButtonBase as Button };
