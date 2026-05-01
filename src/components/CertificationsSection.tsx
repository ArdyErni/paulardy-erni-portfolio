import React from 'react';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';

interface Certification {
  name: string;
  logo: string;
}

const certifications: Certification[] = [
  {
    name: 'Enterprise Design Thinking Practitioner',
    logo: '/certification_logos/enterprise-design-thinking-practitioner.1.png',
  },
  {
    name: 'IC3 Digital Literacy Certification GS6 Level 1',
    logo: '/certification_logos/ic3-digital-literacy-certification-gs6-level-1.png',
  },
  {
    name: 'IT Specialist Cybersecurity',
    logo: '/certification_logos/it-specialist-cybersecurity.png',
  },
  {
    name: 'IT Specialist Device Configuration and Management',
    logo: '/certification_logos/it-specialist-device-configuration-and-management.png',
  },
  {
    name: 'IT Specialist Network Security',
    logo: '/certification_logos/it-specialist-network-security.png',
  },
  {
    name: 'IT Specialist Software Development',
    logo: '/certification_logos/it-specialist-software-development.png',
  },
  {
    name: 'Microsoft Office Specialist Associate – Microsoft 365 Apps',
    logo: '/certification_logos/microsoft-office-specialist-associate-microsoft-365-apps.png',
  },
  {
    name: 'Microsoft Office Specialist Excel Associate – Microsoft 365 Apps',
    logo: '/certification_logos/microsoft-office-specialist-excel-associate-microsoft-365-apps.png',
  },
  {
    name: 'Microsoft Office Specialist PowerPoint Associate – Microsoft 365 Apps',
    logo: '/certification_logos/microsoft-office-specialist-powerpoint-associate-microsoft-365-apps.png',
  },
  {
    name: 'Microsoft Office Specialist Word Associate – Microsoft 365 Apps',
    logo: '/certification_logos/microsoft-office-specialist-word-associate-microsoft-365-apps.png',
  },
  {
    name: 'PMI Project Management Ready',
    logo: '/certification_logos/pmi-project-management-ready.png',
  },
];

export function CertificationsSection() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <ShieldCheck className="text-primary" size={28} />
          <h2 className="text-3xl font-bold tracking-tight">Certifications & Training</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-border/80 hover:bg-muted/30 hover:border-primary/20 transition-all group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden">
                <Image
                  src={cert.logo}
                  alt={cert.name}
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="text-sm font-bold leading-tight">{cert.name}</span>
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