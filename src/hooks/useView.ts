"use client";

import { useCallback, useState } from "react";

/**
 * "services" is no longer a tab, but it stays a valid view so existing code
 * that navigates to it (e.g. a button in ProfileView) keeps compiling.
 */
export type ViewId =
  | "profile"
  | "background"
  | "projects"
  | "gear"
  | "services";

/** The views shown in the navigation, in order. */
export type NavId = Exclude<ViewId, "services">;

export const NAV_ITEMS: { id: NavId; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "background", label: "Background" },
  { id: "projects", label: "Projects" },
  { id: "gear", label: "Gear" },
];

export function useView(initial: ViewId = "profile") {
  const [activeView, setActiveViewState] = useState<ViewId>(initial);

  const setActiveView = useCallback((view: ViewId) => {
    setActiveViewState(view);
    // Each tab is a "page", so start it at the top.
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }, []);

  return { activeView, setActiveView };
}
