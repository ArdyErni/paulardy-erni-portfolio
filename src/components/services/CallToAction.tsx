import { Mail, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SocialLinks } from '@/components/profile/SocialLinks';
import type { Profile } from '@/types/portfolio';

interface CallToActionProps {
  profile: Pick<Profile, 'socials' | 'resume'>;
}

export function CallToAction({ profile }: CallToActionProps) {
  const email = profile.socials.email;

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="bg-foreground text-white rounded-3xl p-10 md:p-16 overflow-hidden relative">
          {/* Background glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[80px] -mr-48 -mt-48 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[80px] -ml-48 -mb-48 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div className="space-y-4 max-w-xl">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Ready to build something?
              </h2>
              <p className="text-white/60 leading-relaxed">
                I&apos;m always interested in working on systems that solve meaningful problems. Let&apos;s talk about what you&apos;re building.
              </p>

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-3 group"
                >
                  <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Mail size={20} />
                  </div>
                  <span className="text-lg font-bold group-hover:text-primary transition-colors">
                    {email}
                  </span>
                </a>
              )}
            </div>

            <div className="flex flex-col gap-4 items-start md:items-end flex-shrink-0">
              <Button
                size="lg"
                className="rounded-full px-8 h-12 font-bold bg-primary hover:bg-primary/90 text-white gap-2"
                asChild
              >
                <a href={profile.resume} download>
                  <FileDown size={18} />
                  Download Resume
                </a>
              </Button>

              <SocialLinks
                socials={profile.socials}
                className="[&_a]:border-white/20 [&_a]:text-white/60 [&_a:hover]:text-white [&_a:hover]:border-white/60"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
