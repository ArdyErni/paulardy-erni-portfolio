import React from 'react';
import portfolioData from '@/data/portfolio.json';

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-muted/20 scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-black mb-4">Technical Proficiency</h2>
          <p className="text-muted-foreground">Tools and technologies I use to architect robust web applications and data-driven systems.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {portfolioData.skills.map((skillGroup) => (
            <div key={skillGroup.category} className="bg-white p-8 rounded-3xl border shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {skillGroup.category}
              </h3>
              <ul className="space-y-4">
                {skillGroup.items.map((skill) => (
                  <li key={skill} className="flex items-center justify-between group">
                    <span className="font-medium text-foreground/80 group-hover:text-foreground transition-colors">{skill}</span>
                    <div className="h-1 w-12 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary/40 group-hover:bg-primary transition-all duration-500 w-[70%]" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}