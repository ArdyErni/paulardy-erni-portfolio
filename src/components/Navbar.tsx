"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, type ViewId } from "@/hooks/useView";

interface NavbarProps {
  activeView: ViewId;
  onViewChange: (view: ViewId) => void;
}

export function Navbar({ activeView, onViewChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleNav(id: ViewId) {
    onViewChange(id);
    setIsOpen(false);
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto max-w-7xl px-6 flex items-center h-16">
        {/* Logo — fixed width so it never gets compressed */}
        <button
          onClick={() => handleNav("profile")}
          className="flex-shrink-0 w-48"
          aria-label="Go to Profile"
        >
          <Image
            src="/website_logo/portfolio_logo.png"
            alt="Ardy Portfolio"
            width={118}
            height={30}
            className="object-contain object-left"
          />
        </button>

        {/* Desktop nav — centered in remaining space */}
        <div className="hidden md:flex ml-auto items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              aria-current={activeView === item.id ? "page" : undefined}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeView === item.id
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <div className="flex-1 flex justify-end md:hidden">
          <button
            className="p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 top-16 bg-background md:hidden transition-transform duration-300 ease-in-out z-40 px-6 py-8",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col space-y-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              aria-current={activeView === item.id ? "page" : undefined}
              className={cn(
                "text-2xl font-bold text-left py-2 transition-colors",
                activeView === item.id ? "text-primary" : "hover:text-primary",
              )}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("services")}
            className="bg-primary text-white py-4 rounded-xl text-center font-bold mt-4"
          >
            Get in touch
          </button>
        </div>
      </div>
    </nav>
  );
}
