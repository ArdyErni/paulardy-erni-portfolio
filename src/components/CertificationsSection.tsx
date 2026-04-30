import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';

export function CertificationsSection() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <ShieldCheck className="text-primary" size={28} />
          <h2 className="text-3xl font-bold tracking-tight">Certifications & Training</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {portfolioData.certifications.map((cert) => (
            <div 
              key={cert} 
              className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-border/80 hover:bg-muted/30 hover:border-primary/20 transition-all group"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award size={18} />
              </div>
              <span className="text-sm font-bold leading-tight">{cert}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground bg-muted px-4 py-2 rounded-full inline-block">
            Verified Educational Credentials
          </p>
        </div>
      </div>
    </section>
  );
}