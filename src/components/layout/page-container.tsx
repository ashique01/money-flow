"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  /** Show a back button – pass the href to navigate to */
  backHref?: string;
}

export default function PageContainer({
  children,
  title,
  subtitle,
  className,
}: PageContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn("mx-auto w-full max-w-7xl space-y-6", className)}
    >
      {(title || subtitle) && (
        <div className="space-y-1">
          {title && (
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}

      <div className="space-y-6">{children}</div>
    </motion.div>
  );
}