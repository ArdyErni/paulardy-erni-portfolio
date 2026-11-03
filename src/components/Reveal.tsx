"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** The shared fade-and-slide entrance, replayed when a view mounts. */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;

    const showImmediately = () => {
      observer?.disconnect();
      el.style.transition = "none";
      el.style.opacity = "1";
      el.style.transform = "none";
    };

    if (motion.matches) {
      showImmediately();
      return;
    }

    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer?.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);

    const onMotionChange = () => {
      if (motion.matches) showImmediately();
    };
    motion.addEventListener("change", onMotionChange);

    return () => {
      observer?.disconnect();
      motion.removeEventListener("change", onMotionChange);
    };
  }, [delay]);

  return <div ref={ref} className={className}>{children}</div>;
}
