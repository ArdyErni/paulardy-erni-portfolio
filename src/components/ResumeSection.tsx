import React from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, GraduationCap } from 'lucide-react';

export function ResumeSection() {
  return (
    <section className="py-12 bg-white/50 border-y scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-6 text-left">
            <div className="hidden sm:flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/5 text-primary">
              <GraduationCap size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Looking for my detailed history?</h3>
              <p className="text-muted-foreground text-sm max-w-md">
                Download my full professional resume to see more about my education, experience, and certifications in Information Technology.
              </p>
            </div>
          </div>
          <Button size="lg" className="h-14 px-10 text-base font-bold rounded-2xl bg-foreground hover:bg-foreground/90 text-white" asChild>
            <a href="/resume.pdf" download>
              <FileDown className="mr-3 h-5 w-5" />
              Download Resume
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}