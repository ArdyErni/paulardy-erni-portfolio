import { portfolio } from "@/lib/portfolio";
import { GraduationCap, Calendar, Award, Briefcase } from "lucide-react";
import type { Education } from "@/types/portfolio";

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section className="py-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <GraduationCap className="text-primary" size={26} />
          <div>
            <h2 className="text-3xl font-black">{portfolio.labels.education}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {portfolio.labels.educationDescription}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {education.map((edu) => (
            <div
              key={edu.institution}
              className="rounded-3xl border border-border bg-white shadow-sm p-8"
            >
              <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
                {/* LEFT */}

                <div>
                  <h3 className="text-2xl font-bold">{edu.institution}</h3>

                  <p className="text-lg text-muted-foreground mt-1">
                    {edu.degree}
                  </p>

                  <div className="flex items-center gap-2 mt-5 text-sm text-muted-foreground">
                    <Calendar size={16} />
                    {edu.duration}
                  </div>

                  {edu.achievements.length > 0 && (
                    <div className="mt-8">
                      <div className="flex items-center gap-2 mb-3">
                        <Award size={18} className="text-primary" />
                        <span className="font-semibold">{portfolio.labels.highlights}</span>
                      </div>

                      <ul className="space-y-2">
                        {edu.achievements.map((achievement) => (
                          <li
                            key={achievement}
                            className="flex items-start gap-2 text-sm text-foreground/80"
                          >
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* RIGHT */}

                <div className="rounded-2xl bg-muted/30 p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <Briefcase size={18} className="text-primary" />
                    <span className="font-semibold">{portfolio.labels.academicSnapshot}</span>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{portfolio.labels.degree}</p>
                      <p className="font-semibold mt-1">{edu.degree}</p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{portfolio.labels.institution}</p>
                      <p className="font-semibold mt-1">{edu.institution}</p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{portfolio.labels.duration}</p>
                      <p className="font-semibold mt-1">{edu.duration}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
