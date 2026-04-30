import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    techStack: string[];
    status: string;
    links: { github: string; live: string };
    image: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const projectImage = PlaceHolderImages.find(img => img.id === project.image);

  return (
    <div className="group bg-white rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden">
      <div className="relative aspect-video overflow-hidden bg-muted">
        {projectImage && (
          <Image
            src={projectImage.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            data-ai-hint={projectImage.imageHint}
          />
        )}
        <div className="absolute top-4 left-4">
          <Badge className={project.status === 'Completed' ? "bg-primary text-white" : "bg-secondary text-foreground"}>
            {project.status}
          </Badge>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
          {project.description}
        </p>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.techStack.map(tech => (
              <span key={tech} className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-0.5 rounded">
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex gap-2">
              <a href={project.links.github} className="text-sm font-bold flex items-center gap-1.5 hover:text-primary">
                <Github size={16} /> Code
              </a>
              <a href={project.links.live} className="text-sm font-bold flex items-center gap-1.5 hover:text-primary">
                <ExternalLink size={16} /> Live
              </a>
            </div>
            <span className="text-[10px] text-muted-foreground font-medium uppercase">Backend Driven</span>
          </div>
        </div>
      </div>
    </div>
  );
}