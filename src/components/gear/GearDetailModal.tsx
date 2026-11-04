"use client";

import Image from "next/image";
import { Content } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import {
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { portfolio } from "@/lib/portfolio";
import type { GearItem } from "@/types/portfolio";

export function GearDetailModal({ item }: { item: GearItem }) {
  const description = item.description?.trim();

  return (
    <DialogPortal>
      <DialogOverlay className="z-[100] bg-black/45 motion-reduce:!animate-none" />
      <Content
        data-gear-details
        {...(!description ? { "aria-describedby": undefined } : {})}
        className="fixed left-1/2 top-1/2 z-[101] max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border bg-white p-5 shadow-xl focus:outline-none sm:p-6"
      >
        <style>{`
          @supports (scrollbar-gutter: stable) {
            body[data-scroll-locked]:has([data-gear-details]) { margin-right: 0 !important; }
          }
        `}</style>
        <DialogClose
          aria-label="Close gear details"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </DialogClose>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(min-width: 544px) 464px, calc(100vw - 72px)"
              className="object-contain p-5 sm:p-6"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              {portfolio.labels.productImage}
            </div>
          )}
        </div>
        <div className="mt-5 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {item.category}
          </p>
          <DialogTitle className="text-xl font-bold leading-snug">
            {item.name}
          </DialogTitle>
          {description && (
            <DialogDescription className="leading-relaxed">
              {description}
            </DialogDescription>
          )}
        </div>
      </Content>
    </DialogPortal>
  );
}
