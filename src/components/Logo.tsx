import { DollarSign } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo: React.FC<LogoProps> = ({ className, size = "md" }) => {
  const textSize = size === "sm" ? "text-xl" : size === "lg" ? "text-4xl" : "text-2xl";
  const iconSize = size === "sm" ? "h-5 w-5" : size === "lg" ? "h-8 w-8" : "h-6 w-6";

  return (
    <div className={cn("flex items-center font-bold tracking-tight", className)}>
      <DollarSign className={cn("text-primary mr-1", iconSize)} />
      <span className={cn("text-foreground", textSize)}>Aqui</span>
      <span className={cn("text-primary", textSize)}>Fin</span>
    </div>
  );
};

export default Logo;