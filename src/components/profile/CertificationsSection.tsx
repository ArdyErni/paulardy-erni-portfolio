"use client";

import Image from "next/image";
import { ShieldCheck, Award } from "lucide-react";
import type { Certification } from "@/types/portfolio";

interface CertificationsSectionProps {
  certifications: Certification[];
}

export function CertificationsSection({
  certifications,
}: CertificationsSectionProps) {
  if (certifications.length === 0) {
    return (
      <section className="py-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="text-primary" size={24} />
            <h2 className="text-3xl font-black">Certifications</h2>
          </div>

          <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-border bg-muted/20 gap-4">
            <Award size={40} className="text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              Certifications will appear here.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // duplicate for seamless looping
  const marqueeItems = [...certifications, ...certifications];

  return (
    <section className="py-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="overflow-hidden">
          <div className="marquee group flex gap-6">
            {marqueeItems.map((cert, index) => (
              <div
                key={`${cert.name}-${index}`}
                className="
                  w-64
                  flex-shrink-0
                  rounded-2xl
                  border
                  bg-white
                  p-6
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-primary/40
                  hover:shadow-lg
                "
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-muted/40 flex items-center justify-center overflow-hidden">
                    <Image
                      src={cert.logo}
                      alt={cert.name}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm leading-tight">
                      {cert.name}
                    </h3>

                    {"issuer" in cert && cert.issuer && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {cert.issuer}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
