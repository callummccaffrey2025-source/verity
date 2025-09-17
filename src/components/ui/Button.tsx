"use client";
import { cn } from "./cn";
export function Button({ children, className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>){
  return <button className={cn("btn", className)} {...rest}>{children}</button>;
}
