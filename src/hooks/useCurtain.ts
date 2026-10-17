"use client";

import { useRef, useCallback } from "react";
import type { ViewId } from "./useView";

export function useCurtain(setView: (v: ViewId) => void) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  const navigate = useCallback(
    (next: ViewId) => {
      const el = curtainRef.current;
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!el || busy.current) return;
      busy.current = true;

      if (reduced) {
        // Quick fade instead of wipe
        el.style.transition = "opacity 150ms ease";
        el.style.opacity = "1";
        el.style.transform = "translateX(0)";
        el.style.pointerEvents = "all";
        setTimeout(() => {
          setView(next);
          window.scrollTo({ top: 0 });
          el.style.opacity = "0";
          setTimeout(() => {
            el.style.transform = "translateX(-101%)";
            el.style.transition = "none";
            el.style.pointerEvents = "none";
            busy.current = false;
          }, 150);
        }, 150);
        return;
      }

      // Slide in
      el.style.transition = "transform 550ms cubic-bezier(0.32,0.72,0,1)";
      el.style.transform = "translateX(0)";
      el.style.pointerEvents = "all";

      const onIn = () => {
        setView(next);
        window.scrollTo({ top: 0 });

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.transform = "translateX(101%)";
            el.addEventListener(
              "transitionend",
              () => {
                // Reset to left so next wipe comes from the same side
                el.style.transition = "none";
                el.style.transform = "translateX(-101%)";
                el.style.pointerEvents = "none";
                busy.current = false;
              },
              { once: true },
            );
          });
        });
      };

      el.addEventListener("transitionend", onIn, { once: true });
    },
    [setView],
  );

  return { curtainRef, navigate };
}
