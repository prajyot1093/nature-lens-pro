import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const GlassCard = ({ className, hover = false, children, ...props }: GlassCardProps) => {
  return (
    <div
      className={cn(
        hover ? "glass-card-hover" : "glass-card",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
