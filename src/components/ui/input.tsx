import * as React from "react";
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className="", ...props }, ref) => (
    <input
      ref={ref}
      className={`h-10 w-full rounded-md border border-[#263041] bg-[#0f1622] px-3 text-sm text-[#E6E8EB] placeholder-[#9BA3AF] focus:outline-none focus:ring-2 focus:ring-[#4f46e5] ${className}`}
      {...props}
    />
  )
);
Input.displayName = "Input";
export default Input;
