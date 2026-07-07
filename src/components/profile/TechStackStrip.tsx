interface TechStackStripProps {
  technologies: string[];
}

export function TechStackStrip({ technologies }: TechStackStripProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Tools I work with
      </p>
      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 rounded-full bg-white border border-border text-xs font-semibold text-foreground/70 hover:border-primary/40 hover:text-primary transition-all duration-200"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
