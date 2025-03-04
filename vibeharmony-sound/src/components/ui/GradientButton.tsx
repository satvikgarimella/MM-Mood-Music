
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "muted";
  size?: "sm" | "md" | "lg";
}

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseClasses = "relative overflow-hidden rounded-full text-white font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 active:scale-95";
    
    const sizeClasses = {
      sm: "px-4 py-1.5 text-sm",
      md: "px-6 py-2.5 text-base",
      lg: "px-8 py-3 text-lg"
    };
    
    const variantClasses = {
      primary: "bg-gradient-to-r from-[#8A4FFF] to-[#4F74FF] hover:shadow-[0_0_20px_rgba(138,79,255,0.5)]",
      secondary: "bg-gradient-to-r from-[#4F74FF] to-[#21A179] hover:shadow-[0_0_20px_rgba(79,116,255,0.5)]",
      muted: "bg-white/10 backdrop-blur-md hover:bg-white/15 border border-white/10"
    };
    
    return (
      <button
        className={cn(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-[#8A4FFF] via-[#4F74FF] to-[#21A179] opacity-0 hover:opacity-100 transition-opacity duration-300 animate-gradient-shift"></div>
      </button>
    );
  }
);

GradientButton.displayName = "GradientButton";

export default GradientButton;
