import { portfolio } from "@/lib/portfolio";
import { ProcessStep } from "./ProcessStep";
import type { ProcessStep as ProcessStepType } from "@/types/portfolio";

interface DevelopmentProcessProps {
  steps: ProcessStepType[];
}

export function DevelopmentProcess({ steps }: DevelopmentProcessProps) {
  const processSteps = steps;

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-3">
              {portfolio.labels.processHeading}
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              {portfolio.labels.processDescription}
            </p>
          </div>

          <div>
            {processSteps.map((step, i) => (
              <ProcessStep
                key={step.id}
                step={step}
                index={i}
                isLast={i === processSteps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
