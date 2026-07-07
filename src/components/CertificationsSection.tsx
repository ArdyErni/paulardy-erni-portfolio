'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

const certifications = [
  { name: 'IBM Enterprise Design Thinking Practitioner', logo: '/certification_logos/enterprise-design-thinking-practitioner.1.png' },
  { name: 'IC3 Digital Literacy Certification GS6 Level 1', logo: '/certification_logos/ic3-digital-literacy-certification-gs6-level-1.png' },
  { name: 'IT Specialist — Cybersecurity', logo: '/certification_logos/it-specialist-cybersecurity.png' },
  { name: 'IT Specialist — Device Configuration & Management', logo: '/certification_logos/it-specialist-device-configuration-and-management.png' },
  { name: 'IT Specialist — Network Security', logo: '/certification_logos/it-specialist-network-security.png' },
  { name: 'IT Specialist — Software Development', logo: '/certification_logos/it-specialist-software-development.png' },
  { name: 'Microsoft Office Specialist Associate – Microsoft 365 Apps', logo: '/certification_logos/microsoft-office-specialist-associate-microsoft-365-apps.png' },
  { name: 'Microsoft Office Specialist Excel Associate', logo: '/certification_logos/microsoft-office-specialist-excel-associate-microsoft-365-apps.png' },
  { name: 'Microsoft Office Specialist PowerPoint Associate', logo: '/certification_logos/microsoft-office-specialist-powerpoint-associate-microsoft-365-apps.png' },
  { name: 'Microsoft Office Specialist Word Associate', logo: '/certification_logos/microsoft-office-specialist-word-associate-microsoft-365-apps.png' },
  { name: 'PMI Project Management Ready', logo: '/certification_logos/pmi-project-management-ready.png' },
];

const VISIBLE = 4;

export function CertificationsSection() {
  const [index, setIndex] = useState(0);
  const max = certifications.length - VISIBLE;

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
              <h2 className="text-3xl font-bold tracking-tight">Verified Credentials</h2>
              <p className="text-sm text-muted-foreground mt-1">Industry certifications across cybersecurity, development, and project management.</p>
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
            Verified Educational Credentials
          </p>
        </div>
      </div>
    </section>
  );
}