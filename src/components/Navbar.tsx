"use client";

import Image from "next/image";
import {
  Briefcase,
  LayoutGrid,
  Monitor,
  User,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, type NavId, type ViewId } from "@/hooks/useView";

interface NavbarProps {
  activeView: ViewId;
  onViewChange: (view: ViewId) => void;
}

const ICONS: Record<NavId, LucideIcon> = {
  profile: User,
  background: Briefcase,
  projects: LayoutGrid,
  gear: Monitor,
};

export function Navbar({ activeView, onViewChange }: NavbarProps) {
  return (
    <>
      {/* Top bar: logo on every screen, pill tabs from md and up */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:h-16 md:px-6">
          <button
            onClick={() => onViewChange("profile")}
            className="flex-shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Go to Profile"
          >
            <Image
              src="/website_logo/portfolio_logo_trimmed.png"
              alt="erknst."
              width={447}
              height={314}
              priority
              className="h-10 w-auto md:h-12"
            />
          </button>

          <nav
            aria-label="Main"
            className="hidden items-center gap-1.5 md:flex"
          >
            {NAV_ITEMS.map((item) => {
              const active = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "bg-primary font-semibold text-primary-foreground"
                      : "font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Bottom tab bar: phones only */}
      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-50 flex border-t bg-background/95 px-2 pt-2 shadow-[0_-4px_16px_rgba(0,0,0,0.05)] backdrop-blur md:hidden pb-[max(env(safe-area-inset-bottom),12px)]"
      >
        {NAV_ITEMS.map((item) => {
          const active = activeView === item.id;
          const Icon = ICONS[item.id];
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-lg text-[11px]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "font-bold text-primary"
                  : "font-medium text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "flex h-[30px] w-14 items-center justify-center rounded-full transition-colors",
                  active && "bg-secondary",
                )}
              >
                <Icon size={22} aria-hidden="true" />
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}
