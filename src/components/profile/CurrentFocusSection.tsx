import { Zap } from 'lucide-react';

interface CurrentFocusSectionProps {
  items: string[];
}

export function CurrentFocusSection({ items }: CurrentFocusSectionProps) {
  return (
    <section className="py-12 bg-muted/30 border-y">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex items-center gap-2 mb-6">
          <Zap size={16} className="text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Currently focused on
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          {items.map((item) => (
            <span
              key={item}
              className="px-4 py-2 rounded-full bg-white border border-border text-sm font-semibold text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
