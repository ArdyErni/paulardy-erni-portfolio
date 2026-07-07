import { ProcessStep } from "./ProcessStep";
import type { ProcessStep as ProcessStepType } from "@/types/portfolio";

const FALLBACK_STEPS: ProcessStepType[] = [
  {
    id: "discover",
    title: "Discover",
    description:
      "Understand the business problem, goals, and constraints before proposing a solution.",
  },
  {
    id: "design",
    title: "Design",
    description:
      "Plan the system architecture, user experience, and technical approach.",
  },
  {
    id: "build",
    title: "Build",
    description:
      "Develop scalable, maintainable solutions through iterative implementation.",
  },
  {
    id: "deploy",
    title: "Deploy",
    description:
      "Launch, monitor, and continuously improve the solution based on feedback.",
  },
];

interface DevelopmentProcessProps {
  steps: ProcessStepType[];
}

export function DevelopmentProcess({ steps }: DevelopmentProcessProps) {
  const processSteps = steps.length > 0 ? steps : FALLBACK_STEPS;

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-3">
              How I Work
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              A straightforward process focused on understanding your problem
              before writing a single line of code.
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
