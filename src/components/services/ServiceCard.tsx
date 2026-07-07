import { CheckCircle2 } from 'lucide-react';
import type { Service } from '@/types/portfolio';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-3xl border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-8 flex flex-col gap-6">
      <div className="space-y-2">
        <h3 className="text-xl font-black tracking-tight">{service.title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Deliverables</p>
        <ul className="space-y-1.5">
          {service.deliverables.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-foreground/80">
              <CheckCircle2 size={14} className="text-primary flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2 mt-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Technologies</p>
        <div className="flex flex-wrap gap-2">
          {service.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-full bg-muted text-foreground/80 text-xs font-semibold hover:bg-primary/10 hover:text-primary transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
