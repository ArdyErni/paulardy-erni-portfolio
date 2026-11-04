import { portfolio, profileValues } from "@/lib/portfolio";
import React from 'react';
import { GraduationCap, Cpu, Workflow } from 'lucide-react';
import Image from 'next/image';
import { ContentText } from '@/components/ContentText';
import type { LucideIcon } from 'lucide-react';
const PRINCIPLE_ICONS: Record<string, LucideIcon> = { education: GraduationCap, backend: Cpu, automation: Workflow };

export function AboutSection() {
  return (
    <section id="about" className="py-24 scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            <div className="space-y-4">
              <div className="h-1 w-20 bg-primary rounded-full" />
              <h2 className="text-4xl font-black tracking-tight">{portfolio.about.title}</h2>
            </div>

            {portfolio.about.paragraphs.map((text, index) => (
              <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                <ContentText text={text} values={profileValues(portfolio.profile)} emphasisClassName="text-foreground font-semibold" />
              </p>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {portfolio.about.principles.map((item) => {
                const Icon = PRINCIPLE_ICONS[item.icon] ?? Cpu;
                return (
                  <div key={item.title} className="p-5 rounded-2xl bg-white border border-border/60 hover:border-primary/40 transition-colors">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3"><Icon size={20} /></div>
                    <h4 className="font-bold mb-1 text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                );
              })}
            </div>

            <p className="text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-6 py-2">
              {portfolio.about.quote}
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="bg-secondary/10 absolute inset-0 -m-8 rounded-[3rem] -rotate-3" />
              <div className="bg-white p-4 rounded-[2.5rem] border shadow-2xl relative">
                <div className="bg-muted rounded-[2rem] overflow-hidden w-64 h-64 mx-auto">
                  <Image src={portfolio.profile.avatar} alt={portfolio.profile.name} width={256} height={256} className="object-cover object-top w-full h-full" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary text-white p-5 rounded-2xl shadow-xl max-w-[200px]">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">{portfolio.labels.focus}</p>
                  <p className="text-sm font-bold">{portfolio.about.focus}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}