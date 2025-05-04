// components/ui/Card.tsx
import { cn } from "@/lib/tailwindUtility";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

/* ──────────────── 型定義 ──────────────── */
type CardProps = HTMLAttributes<HTMLDivElement>;
type CardContentProps = HTMLAttributes<HTMLDivElement>;

/* ──────────────── Card ──────────────── */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

/* ──────────────── CardContent ──────────────── */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = "CardContent";
