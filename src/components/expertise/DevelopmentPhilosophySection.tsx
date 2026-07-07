import { Quote } from 'lucide-react';
import type { Philosophy } from '@/types/portfolio';

interface DevelopmentPhilosophySectionProps {
  philosophy: Philosophy;
}

export function DevelopmentPhilosophySection({ philosophy }: DevelopmentPhilosophySectionProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="bg-white rounded-3xl border shadow-sm p-10 md:p-14 flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Quote size={28} />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-black tracking-tight">{philosophy.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {philosophy.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
