import React from 'react';
import { GraduationCap, Cpu, Workflow } from 'lucide-react';
import Image from 'next/image';

export function AboutSection() {
  return (
    <section id="about" className="py-24 scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            <div className="space-y-4">
              <div className="h-1 w-20 bg-primary rounded-full" />
              <h2 className="text-4xl font-black tracking-tight">Systematic Approach. Measurable Results.</h2>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm an Information Technology graduate from <span className="text-foreground font-semibold">Bataan Peninsula State University</span>, specializing in full-stack development and AI-powered workflow automation. My approach is backend-first — I focus on how data flows, how processes are structured, and how systems can be made more efficient before touching the interface.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Beyond web development, I design and implement automated business workflows using <span className="text-foreground font-semibold">n8n</span>, integrating AI models, APIs, and databases to eliminate repetitive manual work. I don't just build features — I build systems that scale.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-border/60 hover:border-primary/40 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <GraduationCap size={20} />
                </div>
                <h4 className="font-bold mb-1 text-sm">Academic Foundation</h4>
                <p className="text-xs text-muted-foreground">Software engineering fundamentals, system design, and analytical problem-solving.</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-border/60 hover:border-primary/40 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <Cpu size={20} />
                </div>
                <h4 className="font-bold mb-1 text-sm">Backend Logic First</h4>
                <p className="text-xs text-muted-foreground">Clear architecture, efficient data handling, and scalable database design.</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-border/60 hover:border-primary/40 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <Workflow size={20} />
                </div>
                <h4 className="font-bold mb-1 text-sm">AI Automation</h4>
                <p className="text-xs text-muted-foreground">n8n workflows, LLM integration, and business process automation at scale.</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-6 py-2">
              "I don't just build features — I build systems that are dependable, scalable, and designed with long-term performance in mind."
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="bg-secondary/10 absolute inset-0 -m-8 rounded-[3rem] -rotate-3" />
              <div className="bg-white p-4 rounded-[2.5rem] border shadow-2xl relative">
                <div className="bg-muted rounded-[2rem] overflow-hidden w-64 h-64 mx-auto">
                  <Image src="/user_profile/Formal Picture.jpg" alt="Paul Ardy Erni" width={256} height={256} className="object-cover object-top w-full h-full" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary text-white p-5 rounded-2xl shadow-xl max-w-[200px]">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Focus</p>
                  <p className="text-sm font-bold">Workflow Automation · System Design · AI Integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}