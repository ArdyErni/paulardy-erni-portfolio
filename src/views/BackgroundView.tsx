"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/types/portfolio";

const data = portfolioData as unknown as PortfolioData;

// Scroll-reveal: sets initial hidden state then fades+slides up on intersection
function RevealDiv({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial hidden state
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.transition = "none";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function BackgroundView() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <RevealDiv>
          <div className="mb-10">
            <h1 className="text-4xl font-black tracking-tight mb-2">Background</h1>
            <p className="text-muted-foreground text-[17px]">
              AI automation engineer with production experience, currently leading module development.
            </p>
          </div>
        </RevealDiv>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">

          {/* Left — Experience */}
          <div className="flex flex-col gap-6 border-r border-[#cfe9d9] pr-7">
            {data.experience.map((org, orgIdx) => (
              <RevealDiv key={org.id} delay={orgIdx * 80}>
                <section className="bg-white rounded-2xl border border-border p-7 flex flex-col gap-5 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  {/* Org header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3.5">
                      <Image
                        src={org.logo}
                        alt={`${org.organization} logo`}
                        width={56}
                        height={56}
                        className="rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex items-center gap-2">
                        <div className="text-[20px] font-bold">{org.organization}</div>
                        {/* Effect 3 — "Present" pulse badge */}
                        {org.current && (
                          <span className="flex items-center gap-1.5 text-[11px] font-bold text-primary bg-[#e6f4ec] px-2.5 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
                            Present
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Roles */}
                  <div className="flex flex-col gap-2">
                    {org.roles.map((role, i) => (
                      <div
                        key={i}
                        className={
                          i > 0
                            ? "flex flex-col gap-2 border-t border-dashed border-[#cfd6cf] pt-4"
                            : "flex flex-col gap-2"
                        }
                      >
                        <div className="flex flex-wrap justify-between">
                          <strong className="text-[16px]">{role.title}</strong>
                          <span className="text-muted-foreground text-sm">{role.period}</span>
                        </div>
                        <ul className="list-disc pl-5 text-[15px] leading-6 text-[#3b3f3b] m-0">
                          {role.bullets.map((b, j) => (
                            <li key={j}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Effect 2 — Tech stack pill hover */}
                  <div className="flex flex-wrap gap-2">
                    {org.stack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-[#eef1ee] text-[#444] text-[12px] rounded-full px-2.5 py-1 transition-colors duration-200 hover:bg-primary/10 hover:text-primary cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Related project link */}
                  {org.project && (
                    <Link
                      href={org.project.href}
                      className="text-[13px] font-semibold text-primary"
                    >
                      Related projects: {org.project.label} →
                    </Link>
                  )}
                </section>
              </RevealDiv>
            ))}

            {/* Education */}
            {data.education.map((edu, i) => (
              <RevealDiv key={i} delay={data.experience.length * 80 + i * 80}>
                <section className="bg-white rounded-2xl border border-border px-7 py-5 flex flex-wrap items-center justify-between gap-2 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-3.5">
                    {edu.logo && (
                      <Image
                        src={edu.logo}
                        alt={`${edu.institution} seal`}
                        width={56}
                        height={56}
                        className="object-contain flex-shrink-0"
                      />
                    )}
                    <div>
                      <div className="text-[18px] font-bold">{edu.institution}</div>
                      <div className="text-muted-foreground text-[15px]">{edu.degree}&nbsp;</div>
                    </div>
                  </div>
                  <span className="text-muted-foreground text-sm">{edu.duration}</span>
                </section>
              </RevealDiv>
            ))}
          </div>

          {/* Right — Certifications sidebar */}
          <RevealDiv delay={120}>
            <aside className="bg-white rounded-2xl border border-border flex flex-col px-6 pt-6 pb-2.5">
              <div className="flex items-baseline justify-between pb-3">
                <h2 className="text-[20px] font-bold">Certifications</h2>
                <span className="text-muted-foreground text-[13px]">
                  {data.certifications.length} earned
                </span>
              </div>

              {data.certifications.map((cert, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 border-t border-border py-3.5 rounded-lg px-1 transition-colors duration-200 hover:bg-[#f0f7f3] group"
                >
                  <Image
                    src={cert.logo}
                    alt={`${cert.name} badge`}
                    width={44}
                    height={44}
                    className="object-contain flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-bold leading-[1.3]">{cert.name}</span>
                    {cert.issuer && (
                      <span className="text-muted-foreground text-[13px]">{cert.issuer}</span>
                    )}
                  </div>
                </div>
              ))}
            </aside>
          </RevealDiv>
        </div>
      </div>
    </section>
  );
}
