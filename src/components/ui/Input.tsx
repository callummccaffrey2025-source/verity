import { cn } from "./cn";
export function Input({ className, ...rest }: React.InputHTMLAttributes<HTMLInputElement>){
  return <input className={cn("input", className)} {...rest} />;
}
