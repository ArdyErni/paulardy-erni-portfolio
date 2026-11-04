"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Content } from "@radix-ui/react-dialog";
import { CheckCircle2, Loader2, RotateCcw, X } from "lucide-react";
import { z } from "zod";
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTACT_LIMITS,
  contactFieldErrors,
  contactSchema,
  type ContactField,
  type ContactFieldError,
} from "@/lib/contact-validation";
import { portfolio } from "@/lib/portfolio";

const emptyForm = { name: "", email: "", message: "", company: "" };
const responseSchema = z.object({
  ok: z.boolean(),
  code: z.string().optional(),
});

export function ContactModal({
  onRestoreFocus,
}: {
  onRestoreFocus: () => void;
}) {
  const copy = portfolio.contact;
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState<
    Partial<Record<ContactField, ContactFieldError>>
  >({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [failure, setFailure] = useState(copy.error);
  const busy = useRef(false);
  const request = useRef<{ body: string; key: string } | null>(null);
  const fields = useRef<
    Record<ContactField, HTMLInputElement | HTMLTextAreaElement | null>
  >({ name: null, email: null, message: null });
  const confirmation = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (status === "success") confirmation.current?.focus();
  }, [status]);

  function update(field: keyof typeof emptyForm, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const invalid = contactFieldErrors(parsed.error);
      setErrors(invalid);
      const first = (["name", "email", "message"] as const).find(
        (field) => invalid[field],
      );
      if (first) requestAnimationFrame(() => fields.current[first]?.focus());
      return;
    }
    setErrors({});
    const body = JSON.stringify(parsed.data);
    if (request.current?.body !== body)
      request.current = { body, key: crypto.randomUUID() };
    busy.current = true;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": request.current.key,
        },
        body,
        signal: AbortSignal.timeout(20000),
      });
      const result = responseSchema.safeParse(await response.json());
      if (response.ok && result.success && result.data.ok) {
        setStatus("success");
      } else {
        setFailure(
          result.success && result.data.code === "rate_limited"
            ? copy.rateLimited
            : result.success && result.data.code === "invalid"
              ? copy.invalid
              : copy.error,
        );
        setStatus("error");
      }
    } catch {
      setFailure(copy.error);
      setStatus("error");
    } finally {
      busy.current = false;
    }
  }

  return (
    <DialogPortal>
      <DialogOverlay className="z-[100] bg-black/45 motion-reduce:!animate-none" />
      <Content
        data-contact-dialog
        data-success={status === "success"}
        className="fixed left-1/2 top-1/2 z-[101] max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border bg-white p-6 shadow-xl transition-none duration-200 focus:outline-none data-[success=true]:max-w-md data-[state=open]:animate-[contact-fade-in_160ms_ease-out] data-[state=closed]:animate-[contact-fade-out_120ms_ease-in] motion-reduce:!animate-none sm:p-8"
        onOpenAutoFocus={(event) => {
          if (status === "sending") return;
          event.preventDefault();
          if (status === "success") confirmation.current?.focus();
          else fields.current.name?.focus();
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          onRestoreFocus();
        }}
      >
        <style>{`
          @keyframes contact-fade-in { from { opacity: 0; } to { opacity: 1; } }
          @keyframes contact-fade-out { from { opacity: 1; } to { opacity: 0; } }
          @supports (scrollbar-gutter: stable) {
            body[data-scroll-locked]:has([data-contact-dialog]) { margin-right: 0 !important; }
          }
        `}</style>
        <DialogClose className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <X size={18} aria-hidden="true" />
          <span className="sr-only">{copy.close}</span>
        </DialogClose>
        {status === "success" ? (
          <div
            className="space-y-3 focus:outline-none"
            ref={confirmation}
            tabIndex={-1}
            role="status"
          >
            {/* <CheckCircle2 className="text-primary/80" size={24} aria-hidden="true" /> */}
            <DialogHeader className="space-y-2 text-left">
              <DialogTitle className="text-xl font-bold leading-tight">
                {copy.successTitle}
              </DialogTitle>
              <DialogDescription className="leading-relaxed">
                {copy.successDescription}
              </DialogDescription>
            </DialogHeader>
            <Button
              type="button"
              variant="link"
              className="h-auto gap-1.5 px-0 py-1 font-medium text-muted-foreground hover:text-primary"
              onClick={() => {
                setValues(emptyForm);
                setErrors({});
                setFailure(copy.error);
                request.current = null;
                setStatus("idle");
                requestAnimationFrame(() => fields.current.name?.focus());
              }}
            >
              <RotateCcw size={14} aria-hidden="true" />
              {copy.sendAnother}
            </Button>
          </div>
        ) : (
          <>
              <DialogHeader className="pr-8 text-left">
                <DialogTitle className="text-2xl font-bold leading-tight">
                  {copy.title}
                </DialogTitle>
                <DialogDescription className="leading-relaxed">
                  {copy.description}
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={submit}
                noValidate
                className="mt-6 space-y-4"
                aria-busy={status === "sending"}
              >
                {(["name", "email", "message"] as const).map((field) => {
                  const id = `contact-${field}`;
                  const common = {
                    id,
                    name: field,
                    required: true,
                    disabled: status === "sending",
                    maxLength: CONTACT_LIMITS[field],
                    "aria-invalid": Boolean(errors[field]),
                    "aria-describedby": errors[field] ? `${id}-error` : undefined,
                    value: values[field],
                    className: "rounded-xl bg-white",
                  };
                  return (
                    <div key={field} className="space-y-1.5">
                      <label htmlFor={id} className="text-sm font-semibold">
                        {copy.fields[field].label}
                      </label>
                      {field === "message" ? (
                        <Textarea
                          {...common}
                          ref={(element) => {
                            fields.current[field] = element;
                          }}
                          rows={5}
                          className="min-h-32 resize-y rounded-xl bg-white"
                          onChange={(event) => update(field, event.target.value)}
                        />
                      ) : (
                        <Input
                          {...common}
                          ref={(element) => {
                            fields.current[field] = element;
                          }}
                          type={field === "email" ? "email" : "text"}
                          autoComplete={field === "email" ? "email" : "name"}
                          onChange={(event) => update(field, event.target.value)}
                        />
                      )}
                      {errors[field] && (
                        <p
                          id={`${id}-error`}
                          className="text-sm text-destructive"
                        >
                          {copy.fields[field][errors[field]]}
                        </p>
                      )}
                    </div>
                  );
                })}
                <div
                  className="absolute h-px w-px overflow-hidden opacity-0"
                  aria-hidden="true"
                  inert
                >
                  <label htmlFor="contact-company">{copy.honeypotLabel}</label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="off"
                    tabIndex={-1}
                    maxLength={200}
                    value={values.company}
                    onChange={(event) => update("company", event.target.value)}
                  />
                </div>
                {status === "error" && (
                  <p
                    role="alert"
                    className="rounded-xl bg-destructive/5 p-3 text-sm text-destructive"
                  >
                    {failure}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-full font-semibold"
                >
                  {status === "sending" && (
                    <Loader2
                      className="animate-spin motion-reduce:animate-none"
                      aria-hidden="true"
                    />
                  )}
                  {status === "sending" ? copy.sending : copy.send}
                </Button>
              </form>
          </>
        )}
      </Content>
    </DialogPortal>
  );
}
