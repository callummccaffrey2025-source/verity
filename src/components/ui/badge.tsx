import * as React from "react";
export function Badge({ className="", ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={`inline-flex items-center rounded-md border border-white/12 px-2 py-0.5 text-xs ${className}`} {...props} />;
}
export default Badge;
