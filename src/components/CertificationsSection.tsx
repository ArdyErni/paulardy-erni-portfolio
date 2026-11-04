'use client';

import { portfolio } from "@/lib/portfolio";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

const certifications = portfolio.certifications;

const VISIBLE = 4;

export function CertificationsSection() {
  const [index, setIndex] = useState(0);
  const max = Math.max(0, certifications.length - VISIBLE);

  const prev = () => setIndex(i => Math.max(i - 1, 0));
  const next = () => setIndex(i => Math.min(i + 1, max));

  const visible = certifications.slice(index, index + VISIBLE);

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-primary" size={28} />
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{portfolio.labels.verifiedCredentials}</h2>
              <p className="text-sm text-muted-foreground mt-1">{portfolio.labels.credentialsDescription}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              disabled={index === 0}
              className="h-10 w-10 rounded-full border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              disabled={index >= max}
              className="h-10 w-10 rounded-full border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary disabled:opacity-30 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-300">
          {visible.map((cert) => (
            <div
              key={cert.name}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-border/80 hover:border-primary/30 hover:shadow-md transition-all text-center group"
            >
              <div className="w-14 h-14 rounded-xl bg-muted/50 flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden">
                <Image src={cert.logo} alt={cert.name} width={56} height={56} className="object-contain w-full h-full" />
              </div>
              <span className="text-xs font-bold leading-tight text-foreground/80">{cert.name}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-1.5 mt-8">
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/30'}`}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground bg-muted px-4 py-2 rounded-full inline-block">
            {portfolio.labels.verifiedEducation}
          </p>
        </div>
      </div>
    </section>
  );
}