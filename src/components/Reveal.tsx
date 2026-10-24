"use client";

import { MotionConfig, motion } from "motion/react";

/**
 * Fades content up as it scrolls into view, once. Reduced motion keeps the fade and drops the movement.
 * Do not wrap the above-the-fold headline: it delays LCP until hydration. Use the `.rise` class there.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    // reducedMotion="user" drops the movement but keeps the fade, and renders the same on server and client.
    <MotionConfig reducedMotion="user">
      <Tag
        className={className}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }}
      >
        {children}
      </Tag>
    </MotionConfig>
  );
}
