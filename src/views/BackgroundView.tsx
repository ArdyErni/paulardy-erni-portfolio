import Image from "next/image";
import Link from "next/link";
import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/types/portfolio";

const data = portfolioData as unknown as PortfolioData;

export function BackgroundView() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-2">Background</h1>
          <p className="text-muted-foreground text-[17px]">
            AI automation engineer with production experience, currently leading module development.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">

          {/* Left — Experience */}
          <div className="flex flex-col gap-6 border-r border-[#cfe9d9] pr-7">
            {data.experience.map((org) => (
              <section
                key={org.id}
                className="bg-white rounded-2xl border border-border p-7 flex flex-col gap-5"
              >
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
                    <div className="text-[20px] font-bold">{org.organization}</div>
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

                {/* Tech stack pills */}
                <div className="flex flex-wrap gap-2">
                  {org.stack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-[#eef1ee] text-[#444] text-[12px] rounded-full px-2.5 py-1"
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
            ))}

            {/* Education */}
            {data.education.map((edu, i) => (
              <section
                key={i}
                className="bg-white rounded-2xl border border-border px-7 py-5 flex flex-wrap items-center justify-between gap-2"
              >
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
            ))}
          </div>

          {/* Right — Certifications sidebar */}
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
                className="flex items-center gap-3 border-t border-border py-3.5"
              >
                <Image
                  src={cert.logo}
                  alt={`${cert.name} badge`}
                  width={44}
                  height={44}
                  className="object-contain flex-shrink-0"
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
        </div>
      </div>
    </section>
  );
}
