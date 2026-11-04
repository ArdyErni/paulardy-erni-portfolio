"use client";

import { createContext, forwardRef, useCallback, useContext, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Dialog } from "@/components/ui/dialog";
import { ContactModal } from "./ContactModal";

const ContactContext = createContext<((trigger: HTMLElement) => void) | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLElement | null>(null);
  const openContact = useCallback((element: HTMLElement) => {
    trigger.current = element;
    setOpen(true);
  }, []);

  return (
    <ContactContext.Provider value={openContact}>
      <Dialog open={open} onOpenChange={setOpen}>
        {children}
        <ContactModal onRestoreFocus={() => {
          if (trigger.current?.isConnected) trigger.current.focus();
        }} />
      </Dialog>
    </ContactContext.Provider>
  );
}

export const ContactTrigger = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  function ContactTrigger({ onClick, children, ...props }, ref) {
    const openContact = useContext(ContactContext);
    if (!openContact) throw new Error("ContactTrigger requires ContactProvider");
    return (
      <button {...props} ref={ref} type="button" aria-haspopup="dialog" onClick={event => {
        onClick?.(event);
        if (!event.defaultPrevented) openContact(event.currentTarget);
      }}>
        {children}
      </button>
    );
  },
);
