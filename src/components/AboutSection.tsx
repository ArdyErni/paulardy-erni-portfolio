import React from 'react';
import { User, GraduationCap, Cpu } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            <div className="space-y-4">
              <div className="h-1 w-20 bg-primary rounded-full" />
              <h2 className="text-4xl font-black tracking-tight">Systematic Approach to Development</h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am a graduating Information Technology student from <span className="text-foreground font-semibold">Bataan Peninsula State University</span>. Unlike typical frontend designers, my passion lies in the "how" of software — the intricate pathways data takes through a system and the logic that governs it.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-border/60 hover:border-primary/40 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <GraduationCap size={20} />
                </div>
                <h4 className="font-bold mb-2">Academic Foundation</h4>
                <p className="text-sm text-muted-foreground">Rigorous IT training focusing on software engineering principles and system analysis.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-border/60 hover:border-primary/40 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-secondary/20 text-foreground flex items-center justify-center mb-4">
                  <Cpu size={20} />
                </div>
                <h4 className="font-bold mb-2">Backend Logic First</h4>
                <p className="text-sm text-muted-foreground">I prioritize clean architecture and scalable database schemas before polishing the UI.</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-6 py-2">
              "My goal is to build software that doesn't just look good, but functions flawlessly under load and provides tangible value through efficient data processing."
            </p>
          </div>

          {/* Profile Image on About Section */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="bg-secondary/10 absolute inset-0 -m-8 rounded-[3rem] -rotate-3" />
              <div className="bg-white p-4 rounded-[2.5rem] border shadow-2xl relative">
                <div className="bg-muted rounded-[2rem] aspect-square flex items-center justify-center text-primary/20 p-20">
                  <User size={200} strokeWidth={0.5} />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary text-white p-6 rounded-2xl shadow-xl max-w-[200px]">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Focus</p>
                  <p className="text-sm font-bold">Workflow-driven Architecture & System Design</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}