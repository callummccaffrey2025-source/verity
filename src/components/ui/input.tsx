import * as React from 'react';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props }, ref
) {
  return (
    <input
      ref={ref}
      className={[
        "w-full rounded-lg border border-zinc-700 bg-zinc-900/40 px-3 py-2 text-sm",
        "outline-none focus:ring-2 focus:ring-white/30",
        className
      ].filter(Boolean).join(" ")}
      {...props}
    />
  );
});
export default Input;
