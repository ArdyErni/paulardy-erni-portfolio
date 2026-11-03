import { ProjectCard } from './ProjectCard';
import { Reveal } from '@/components/Reveal';
import type { Project } from '@/types/portfolio';

interface ProjectsGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function ProjectsGrid({ projects, onProjectClick }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Reveal key={project.id}>
          <ProjectCard
            project={project}
            onClick={onProjectClick}
          />
        </Reveal>
      ))}
    </div>
  );
}
