import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const profileImage = PlaceHolderImages.find(img => img.id === 'profile');

  return (
    <section id="home" className="relative pt-44 pb-20 overflow-hidden bg-dot-pattern">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6 max-w-2xl text-center md:text-left">
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for opportunities
            </div> */}
            
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
              Hi, I'm <span className="text-primary">Paul Ardy Erni</span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-semibold text-muted-foreground">
              Full-Stack Web Developer
            </p>
            
            <p className="text-lg text-foreground/80 leading-relaxed max-w-xl mx-auto md:mx-0">
              I build workflow-driven web applications using <span className="font-semibold text-foreground">Next.js</span>, <span className="font-semibold text-foreground">Node.js</span>, and modern databases. Focused on efficiency and scalable system design.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
              <Button size="lg" className="h-12 px-8 text-base font-bold rounded-full group" asChild>
                <a href="#projects">
                  View Projects
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base font-bold rounded-full border-2 hover:bg-muted" asChild>
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
          </div>
          
          <div className="flex-shrink-0 relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-500">
              {profileImage && (
                <Image
                  src={profileImage.imageUrl}
                  alt={profileImage.description}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                  data-ai-hint={profileImage.imageHint}
                />
              )}
            </div>
            {/* Decorative Element */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-secondary rounded-[2.5rem] rotate-6" />
          </div>
        </div>
      </div>
    </section>
  );
}