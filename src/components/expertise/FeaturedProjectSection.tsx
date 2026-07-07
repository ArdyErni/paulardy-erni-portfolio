import Image from 'next/image';
import { Github, ExternalLink, CheckCircle2, Zap, Lightbulb, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Project } from '@/types/portfolio';

interface FeaturedProjectSectionProps {
  project: Project;
}

function hasContent(value: string | string[] | undefined): boolean {
  if (!value) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return value.length > 0;
}

export function FeaturedProjectSection({ project }: FeaturedProjectSectionProps) {
  const showProblem = hasContent(project.problem);
  const showSolution = hasContent(project.solution);
  const showHighlights = hasContent(project.highlights);
  const showFeatures = hasContent(project.features);
  const showImpact = hasContent(project.impact);
  const hasCaseStudyContent = showProblem || showSolution || showHighlights || showFeatures || showImpact;

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <h2 className="text-3xl font-black tracking-tight">Featured Project</h2>
        </div>

        <div className="bg-white rounded-[2rem] overflow-hidden border shadow-xl">
          {/* Screenshot */}
          {project.thumbnail && (
            <div className="relative w-full h-72 md:h-96 overflow-hidden bg-muted">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover object-top transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider">
                  {project.status}
                </span>
                {project.categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1 rounded-full bg-primary/80 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="p-8 md:p-12">
            {/* Title + links */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
              <div className="space-y-3">
                <h3 className="text-3xl md:text-4xl font-black leading-tight">{project.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{project.summary}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {project.links.github && (
                  <Button variant="outline" size="sm" className="rounded-full gap-2" asChild>
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <Github size={16} /> Code
                    </a>
                  </Button>
                )}
                {project.links.live && (
                  <Button size="sm" className="rounded-full gap-2 bg-primary hover:bg-primary/90" asChild>
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Description */}
            {hasContent(project.description) && (
              <p className="text-base text-foreground/80 leading-relaxed mb-8 max-w-3xl">
                {project.description}
              </p>
            )}

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-10">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="px-4 py-1.5 rounded-full font-semibold bg-primary/5 text-primary border-primary/10"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Case study content — only rendered when data exists */}
            {hasCaseStudyContent && (
              <div className="border-t pt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                {showProblem && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                      <Lightbulb size={16} className="text-primary" />
                      Problem
                    </div>
                    <p className="text-foreground/80 leading-relaxed">{project.problem}</p>
                  </div>
                )}

                {showSolution && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                      <Zap size={16} className="text-primary" />
                      Solution
                    </div>
                    <p className="text-foreground/80 leading-relaxed">{project.solution}</p>
                  </div>
                )}

                {showImpact && (
                  <div className="space-y-3 md:col-span-2">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                      <BarChart3 size={16} className="text-primary" />
                      Impact
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.impact!.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-foreground/80 text-sm">
                          <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {showHighlights && (
                  <div className="space-y-3 md:col-span-2">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                      <CheckCircle2 size={16} className="text-primary" />
                      Highlights
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.highlights!.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-foreground/80 text-sm">
                          <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {showFeatures && (
                  <div className="space-y-3 md:col-span-2">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                      <Zap size={16} className="text-primary" />
                      Key Features
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.features!.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-foreground/80 text-sm">
                          <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
