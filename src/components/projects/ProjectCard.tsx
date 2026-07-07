import Image from 'next/image';
import { Bot, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/portfolio';

const MAX_TECH = 3;

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const visibleTech = project.techStack.slice(0, MAX_TECH);
  const overflowCount = project.techStack.length - MAX_TECH;

  return (
    <button
      onClick={() => onClick(project)}
      className="group text-left bg-white rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full overflow-hidden w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      aria-label={`View details for ${project.title}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-muted flex-shrink-0">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 gap-3">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Bot size={28} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary/60">
              Automation Workflow
            </span>
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span
            className={cn(
              'px-2.5 py-1 rounded-full text-xs font-bold capitalize',
              project.status === 'completed'
                ? 'bg-primary text-white'
                : 'bg-secondary text-foreground'
            )}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.categories.map((cat) => (
            <span
              key={cat}
              className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-wider capitalize"
            >
              {cat}
            </span>
          ))}
        </div>

        <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
          {project.title}
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
          {project.summary || project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-4 border-t">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-0.5 rounded"
            >
              {tech}
            </span>
          ))}
          {overflowCount > 0 && (
            <span className="text-[10px] font-bold text-muted-foreground">
              +{overflowCount} more
            </span>
          )}
          <span className="ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs font-bold">
            View details <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </button>
  );
}
