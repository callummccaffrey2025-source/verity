import * as React from 'react';
function cx(...c:(string|undefined)[]){return c.filter(Boolean).join(' ')}
export const Card = ({className, ...p}: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...p} className={cx("rounded-2xl border border-zinc-800 bg-zinc-900/40", className)} />
);
export const CardHeader = ({className, ...p}: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...p} className={cx("p-4 pb-0", className)} />
);
export const CardTitle = ({className, ...p}: React.HTMLAttributes<HTMLDivElement>) => (
  <h3 {...p} className={cx("text-lg font-semibold", className)} />
);
export const CardDescription = ({className, ...p}: React.HTMLAttributes<HTMLDivElement>) => (
  <p {...p} className={cx("text-sm text-zinc-400", className)} />
);
export const CardContent = ({className, ...p}: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...p} className={cx("p-4", className)} />
);
export const CardFooter = ({className, ...p}: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...p} className={cx("p-4 pt-0", className)} />
);
export default Card;
