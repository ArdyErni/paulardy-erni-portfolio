import { Fragment } from "react";
import { formatContent } from "@/lib/portfolio";

interface ContentTextProps {
  text: string;
  values?: Record<string, string>;
  emphasisClassName?: string;
}

/** A small, safe subset of formatting: **bold text** and named placeholders. */
export function ContentText({ text, values, emphasisClassName }: ContentTextProps) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <b key={index} className={emphasisClassName}>
        {formatContent(part.slice(2, -2), values)}
      </b>
    ) : (
      <Fragment key={index}>{formatContent(part, values)}</Fragment>
    ),
  );
}
