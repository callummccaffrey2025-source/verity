import * as React from 'react';

type Variant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'success'
  | 'destructive'
  | 'warning'
  | 'muted';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

const base =
  'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium';

const variants: Record<Variant, string> = {
  default: 'bg-zinc-800 text-zinc-100',
  secondary: 'bg-zinc-700/60 text-zinc-100',
  outline: 'ring-1 ring-inset ring-zinc-600 text-zinc-100',
  success: 'bg-emerald-600/20 text-emerald-300',
  destructive: 'bg-red-600/20 text-red-300',
  warning: 'bg-amber-600/20 text-amber-300',
  muted: 'ring-1 ring-zinc-600 text-neutral-200',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', variant = 'default', ...props }, ref) => (
    <span
      ref={ref}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  )
);
Badge.displayName = 'Badge';

export default Badge;
