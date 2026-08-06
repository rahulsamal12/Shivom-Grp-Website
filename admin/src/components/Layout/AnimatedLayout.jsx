import { motion } from "framer-motion";

/**
 * Premium Cubic-Bezier easing curve:
 * Matches cubic-bezier(0.16, 1, 0.3, 1) - snappy, smooth, and highly responsive.
 */
const SNAPPY_EASE = [0.16, 1, 0.3, 1];

// Snappy transition variants optimized for administrative CMS dashboards.
const pageVariants = {
  initial: {
    opacity: 0,
    y: 15,
    scale: 0.99,
    transition: {
      type: "tween",
      ease: SNAPPY_EASE,
      duration: 0.3,
    },
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "tween",
      ease: SNAPPY_EASE,
      duration: 0.35,
      staggerChildren: 0.08,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    scale: 0.99,
    transition: {
      type: "tween",
      ease: SNAPPY_EASE,
      duration: 0.25,
    },
  },
};

/**
 * AnimatedLayout wrapper component for Admin Dashboard pages.
 * 
 * Provides smooth, fluid page transition animations using Framer Motion.
 * Utilizes hardware-accelerated CSS properties to ensure 60fps scrolling and rendering.
 */
export default function AnimatedLayout({ children, className = "" }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`animated-layout-wrapper ${className}`}
      style={{
        // --- HARDWARE ACCELERATION PERFORMANCE OPTIMIZATIONS ---
        willChange: "transform, opacity",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}
