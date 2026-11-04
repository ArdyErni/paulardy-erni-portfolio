"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { portfolio as data } from "@/lib/portfolio";

function TechnologyBadges({ technologies }: { technologies: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5 md:gap-2">
      {technologies.map((tech) => (
        <span
          key={tech}
          className="max-w-full break-words bg-[#eef1ee] text-[#444] text-[12px] rounded-full px-2 py-0.5 md:px-2.5 md:py-1 transition-colors duration-200 hover:bg-primary/10 hover:text-primary cursor-default"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

export function BackgroundView() {
  return (
    <section className="pt-6 pb-[calc(5rem_+_max(env(safe-area-inset-bottom),12px))] md:py-12">
      <div className="page-container">
        {/* Header */}
        <Reveal>
          <div className="mb-6 md:mb-10">
            <h1 className="text-4xl font-black tracking-tight mb-2">{data.labels.background}</h1>
            <p className="text-muted-foreground text-[17px]">
              {data.labels.backgroundDescription}
            </p>
          </div>
        </Reveal>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">

          {/* Left — Experience */}
          <div className="flex flex-col gap-4 md:gap-6 md:border-r border-[#cfe9d9] md:pr-7">
            {data.experience.map((org, orgIdx) => (
              <Reveal key={org.id} delay={orgIdx * 80}>
                <section
                  aria-labelledby={`experience-${org.id}`}
                  className="bg-white rounded-2xl border border-border p-4 md:p-6 flex min-w-0 flex-col gap-3 md:gap-4 shadow-sm"
                >
                  {/* Org header */}
                  <div className="flex min-w-0 items-center gap-3">
                    <Image
                      src={org.logo}
                      alt={`${org.organization} logo`}
                      width={56}
                      height={56}
                      className="h-11 w-11 md:h-12 md:w-12 rounded-xl object-contain flex-shrink-0"
                    />
                    <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                      <h2 id={`experience-${org.id}`} className="min-w-0 break-words text-[18px] leading-snug md:text-[20px] md:leading-normal font-bold">
                        {org.organization}
                      </h2>
                      {org.current && (
                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-primary bg-[#e6f4ec] px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse motion-reduce:animate-none inline-block" />
                          {data.labels.present}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Roles */}
                  <ol className="min-w-0">
                    {org.roles.map((role, i) => (
                      <li
                        key={`${role.title}-${role.period}`}
                        className={org.roles.length > 1
                          ? "relative min-w-0 pb-5 pl-5 last:pb-0 md:pl-6"
                          : "min-w-0"}
                      >
                        {org.roles.length > 1 && (
                          <>
                            {i < org.roles.length - 1 && (
                              <span aria-hidden="true" className="absolute left-[3.5px] top-3 -bottom-3 w-px bg-primary/20" />
                            )}
                            <span aria-hidden="true" className="absolute left-0 top-2 h-2 w-2 rounded-full bg-primary/60" />
                          </>
                        )}
                        <div className="flex min-w-0 flex-col gap-1.5 md:gap-2">
                          <div className="flex min-w-0 flex-col gap-0.5 md:flex-row md:flex-wrap md:items-baseline md:justify-between md:gap-x-4 md:gap-y-1">
                            <h3 className="min-w-0 break-words text-[16px] font-bold">{role.title}</h3>
                            <span className="shrink-0 text-muted-foreground text-sm">{role.period}</span>
                          </div>
                          <ul className="list-disc pl-5 text-[15px] leading-[1.375rem] md:leading-6 text-[#3b3f3b] m-0">
                            {role.bullets.map((b, j) => (
                              <li key={j}>{b}</li>
                            ))}
                          </ul>
                          <TechnologyBadges
                            technologies={role.stack?.length ? role.stack : org.stack}
                          />
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              </Reveal>
            ))}

            {/* Education */}
            {data.education.map((edu, i) => (
              <Reveal key={i} delay={data.experience.length * 80 + i * 80}>
                <section className="bg-white rounded-2xl border border-border p-4 md:px-7 md:py-5 flex flex-wrap items-center justify-between gap-2 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex min-w-0 items-center gap-3.5">
                    {edu.logo && (
                      <Image
                        src={edu.logo}
                        alt={`${edu.institution} seal`}
                        width={56}
                        height={56}
                        className="h-11 w-11 md:h-auto md:w-14 object-contain flex-shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <div className="text-[18px] font-bold">{edu.institution}</div>
                      <div className="text-muted-foreground text-[15px]">{edu.degree}&nbsp;</div>
                    </div>
                  </div>
                  <span className="text-muted-foreground text-sm">{edu.duration}</span>
                  {edu.achievements.length > 0 && (
                    <div className="flex basis-full flex-wrap gap-2 mt-1">
                      {edu.achievements.map((achievement) => (
                        <span
                          key={achievement}
                          className="rounded-full bg-[#e6f4ec] px-2.5 py-1 text-[12px] font-semibold text-primary"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  )}
                  {edu.description && (
                    <p className="basis-full text-sm leading-relaxed text-muted-foreground">
                      {edu.description}
                    </p>
                  )}
                  {edu.stack && edu.stack.length > 0 && (
                    <div className="basis-full">
                      <TechnologyBadges technologies={edu.stack} />
                    </div>
                  )}
                </section>
              </Reveal>
            ))}
          </div>

          {/* Right — Certifications sidebar */}
          <Reveal delay={120}>
            <aside className="bg-white rounded-2xl border border-border flex flex-col px-6 pt-6 pb-2.5">
              <div className="flex items-baseline justify-between pb-3">
                <h2 className="text-[20px] font-bold">{data.labels.certifications}</h2>
                <span className="text-muted-foreground text-[13px]">
                  {data.certifications.length} {data.labels.earned}
                </span>
              </div>

              {data.certifications.map((cert) => {
                const Card = cert.credentialUrl ? "a" : "div";
                return (
                  <Card
                    key={cert.name}
                    {...(cert.credentialUrl ? {
                      href: cert.credentialUrl,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      "aria-label": cert.name,
                    } : {})}
                    className="flex items-center gap-3 border-t border-border py-3.5 rounded-lg px-1 transition-colors duration-200 hover:bg-[#f0f7f3] focus-visible:bg-[#f0f7f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none group"
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
                  </Card>
                );
              })}
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
