'use client';

import { portfolio } from '@/lib/portfolio';

import { useRef, type RefObject } from 'react';
import { Content, Overlay, Title } from '@radix-ui/react-dialog';
import { Dialog, DialogPortal } from '@/components/ui/dialog';
import Image from 'next/image';
import { X, Github, ExternalLink, CheckCircle2, Zap, Lightbulb, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/portfolio';

function hasContent(value: string | string[] | undefined): boolean {
  if (!value) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return value.length > 0;
}

interface ProjectModalProps {
  project: Project;
  trigger: HTMLButtonElement | null;
  fallbackFocusRef: RefObject<HTMLHeadingElement | null>;
  onClose: () => void;
}

export function ProjectModal({ project, trigger, fallbackFocusRef, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const showProblem = hasContent(project.problem);
  const showSolution = hasContent(project.solution);
  const showHighlights = hasContent(project.highlights);
  const showFeatures = hasContent(project.features);
  const showImpact = hasContent(project.impact);
  const hasCaseStudy = showProblem || showSolution || showHighlights || showFeatures || showImpact;

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogPortal>
      {/* Backdrop */}
      <Overlay
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      />

      <div className="pointer-events-none fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Panel */}
      <Content
        data-project-dialog
        aria-modal="true"
        aria-label={project.title}
        aria-describedby={undefined}
        className="pointer-events-auto relative bg-white w-full sm:max-w-3xl max-h-[92dvh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl focus:outline-none"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          closeButtonRef.current?.focus({ preventScroll: true });
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          const target = trigger?.isConnected && !trigger.disabled && trigger.getClientRects().length
            ? trigger
            : fallbackFocusRef.current;
          if (target?.isConnected) target.focus({ preventScroll: true });
        }}
      >
        <style>{`
          @supports (scrollbar-gutter: stable) {
            body[data-scroll-locked]:has([data-project-dialog]) { margin-right: 0 !important; }
          }
        `}</style>
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label={portfolio.labels.closeProject}
          className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X size={18} />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1">
          {/* Hero image */}
          {project.thumbnail ? (
            <div className="relative w-full h-56 sm:h-72 bg-muted flex-shrink-0">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          ) : (
            <div className="w-full h-40 bg-gradient-to-br from-primary/5 to-primary/10 flex-shrink-0" />
          )}

          <div className="p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
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
                {project.categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs font-bold uppercase tracking-wider capitalize"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <Title asChild>
                <h2 className="text-2xl sm:text-3xl font-black leading-tight">{project.title}</h2>
              </Title>
              <p className="text-muted-foreground leading-relaxed">{project.summary}</p>
            </div>

            {/* Description */}
            {hasContent(project.description) && (
              <p className="text-foreground/80 leading-relaxed text-sm">{project.description}</p>
            )}

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="px-3 py-1 rounded-full font-semibold bg-primary/5 text-primary border-primary/10"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Case study sections */}
            {hasCaseStudy && (
              <div className="border-t pt-6 space-y-6">
                {showProblem && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      <Lightbulb size={14} className="text-primary" /> {portfolio.labels.problem}
                    </div>
                    <p className="text-foreground/80 leading-relaxed text-sm">{project.problem}</p>
                  </div>
                )}

                {showSolution && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      <Zap size={14} className="text-primary" /> {portfolio.labels.solution}
                    </div>
                    <p className="text-foreground/80 leading-relaxed text-sm">{project.solution}</p>
                  </div>
                )}

                {showImpact && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      <BarChart3 size={14} className="text-primary" /> {portfolio.labels.impact}
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.impact?.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                          <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {showHighlights && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      <CheckCircle2 size={14} className="text-primary" /> {portfolio.labels.highlights}
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.highlights?.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                          <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {showFeatures && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      <Zap size={14} className="text-primary" /> {portfolio.labels.features}
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.features?.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                          <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Action buttons */}
            {(project.links.github || project.links.live) && (
              <div className="flex flex-wrap gap-3 pt-2 border-t">
                {project.links.github && (
                  <Button variant="outline" className="rounded-full gap-2" asChild>
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <Github size={16} /> {portfolio.labels.viewCode}
                    </a>
                  </Button>
                )}
                {project.links.live && (
                  <Button className="rounded-full gap-2 bg-primary hover:bg-primary/90" asChild>
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} /> {portfolio.labels.liveDemo}
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </Content>
    </div>
      </DialogPortal>
    </Dialog>
  );
}
