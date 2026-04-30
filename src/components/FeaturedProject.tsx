import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Workflow } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function FeaturedProject() {
  const project = portfolioData.projects.find(p => p.featured);
  if (!project) return null;

  const projectImage = PlaceHolderImages.find(img => img.id === project.image);

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <h2 className="text-3xl font-bold tracking-tight">Featured System</h2>
        </div>

        <div className="bg-white rounded-[2rem] overflow-hidden border shadow-xl flex flex-col lg:flex-row">
          <div className="lg:w-1/2 relative h-80 lg:h-auto overflow-hidden bg-muted">
            {projectImage && (
              <Image
                src={projectImage.imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                data-ai-hint={projectImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none lg:hidden" />
          </div>
          
          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-4">
              <Workflow size={16} />
              Workflow Logic Focus
            </div>
            
            <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
              {project.title}
            </h3>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {project.longDescription || project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-10">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="px-4 py-1.5 rounded-full font-semibold bg-primary/5 text-primary border-primary/10">
                  {tech}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <Button size="lg" className="rounded-xl px-8 h-12 font-bold bg-primary hover:bg-primary/90">
                View Details
              </Button>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" className="rounded-full hover:bg-muted" asChild>
                  <a href={project.links.github} aria-label="Github Repo">
                    <Github size={20} />
                  </a>
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full hover:bg-muted" asChild>
                  <a href={project.links.live} aria-label="Live Demo">
                    <ExternalLink size={20} />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}