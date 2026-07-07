import { Search, PenLine, Hammer, Rocket } from 'lucide-react';
import type { ProcessStep as ProcessStepType } from '@/types/portfolio';

const STEP_ICONS: Record<string, React.ReactNode> = {
  discover: <Search size={20} />,
  design: <PenLine size={20} />,
  build: <Hammer size={20} />,
  deploy: <Rocket size={20} />,
};

interface ProcessStepProps {
  step: ProcessStepType;
  index: number;
  isLast: boolean;
}

export function ProcessStep({ step, index, isLast }: ProcessStepProps) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
          {STEP_ICONS[step.id] ?? <Search size={20} />}
        </div>
        {!isLast && (
          <div className="w-px flex-1 bg-border mt-3 min-h-[2rem]" />
        )}
      </div>
      <div className="pb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h3 className="text-lg font-black tracking-tight mb-1">{step.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
      </div>
    </div>
  );
}
