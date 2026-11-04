import { Github, Linkedin } from 'lucide-react';
import { portfolio } from '@/lib/portfolio';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { github, linkedin } = portfolio.profile.socials;

  return (
    <footer className="py-8 bg-foreground text-white border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xl font-black tracking-tighter text-primary">
            {portfolio.site.brand}<span className="text-white">{portfolio.site.brandSuffix}</span>
          </span>

          <p className="text-xs text-white/40 font-medium order-last md:order-none">
            {portfolio.site.footerCredit}
          </p>

          <div className="flex items-center gap-3">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={portfolio.labels.github}
                className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
              >
                <Github size={16} />
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={portfolio.labels.linkedin}
                className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
              >
                <Linkedin size={16} />
              </a>
            )}
            <span className="text-xs text-white/30 ml-2">
              &copy; {currentYear} {portfolio.profile.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
