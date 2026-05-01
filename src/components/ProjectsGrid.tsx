import React from 'react';
import { ProjectCard } from './ProjectCard';
import portfolioData from '@/data/portfolio.json';

export function ProjectsGrid() {
  const otherProjects = portfolioData.projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 bg-muted/30 scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight">More Projects</h2>
            <p className="text-muted-foreground max-w-lg">
              A selection of web applications and experimental projects focusing on data flow and user interaction.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}