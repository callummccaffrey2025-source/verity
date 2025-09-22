import React from "react";
type Props = React.HTMLAttributes<HTMLDivElement>;
const CardBase = ({ className="", ...rest }: Props) => {
  const base = "rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_2px_0_0_rgba(255,255,255,0.05)_inset,0_12px_28px_-18px_rgba(0,0,0,0.7)]";
  return <div className={`${base} ${className}`} {...rest} />;
};
export default CardBase;
export { CardBase as Card };
