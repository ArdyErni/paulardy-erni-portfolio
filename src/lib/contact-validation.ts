import { z } from "zod";

export const CONTACT_LIMITS = { name: 100, email: 254, message: 5000, bodyBytes: 32768 };

const singleLine = (value: string) => !/[\u0000-\u001f\u007f-\u009f]/.test(value);
const messageCharacters = (value: string) => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/.test(value);

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(CONTACT_LIMITS.name).refine(singleLine),
  email: z.string().trim().min(1).max(CONTACT_LIMITS.email).email().refine(singleLine),
  message: z.string().transform(value => value.replace(/\r\n?/g, "\n").trim())
    .pipe(z.string().min(1).max(CONTACT_LIMITS.message).refine(messageCharacters)),
  company: z.string().max(200).optional().default(""),
}).strict();

export type ContactField = "name" | "email" | "message";
export type ContactFieldError = "required" | "tooLong" | "invalid";

export function contactFieldErrors(error: z.ZodError): Partial<Record<ContactField, ContactFieldError>> {
  const fields: Partial<Record<ContactField, ContactFieldError>> = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if ((field === "name" || field === "email" || field === "message") && !fields[field]) {
      fields[field] = issue.code === "too_small" ? "required" : issue.code === "too_big" ? "tooLong" : "invalid";
    }
  }
  return fields;
}
