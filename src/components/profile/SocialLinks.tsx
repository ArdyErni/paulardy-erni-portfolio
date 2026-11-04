import { ContactTrigger } from "@/components/contact/ContactProvider";
import { portfolio } from "@/lib/portfolio";
import { Github, Linkedin, Mail, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SocialLinks as SocialLinksType } from '@/types/portfolio';

interface SocialLinksProps {
  socials: SocialLinksType;
  className?: string;
  iconSize?: number;
}

export function SocialLinks({ socials, className, iconSize = 20 }: SocialLinksProps) {
  const links = [
    { href: socials.github, icon: <Github size={iconSize} />, label: portfolio.labels.github },
    { href: socials.linkedin, icon: <Linkedin size={iconSize} />, label: portfolio.labels.linkedin },
    { href: socials.email, contact: true, icon: <Mail size={iconSize} />, label: portfolio.labels.email },
    { href: socials.website, icon: <Globe size={iconSize} />, label: portfolio.labels.website },
  ].filter((l) => l.href);

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {links.map((link) => (
        link.contact ? (
          <ContactTrigger
            key={link.label}
            aria-label={link.label}
            className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-200"
          >
            {link.icon}
          </ContactTrigger>
        ) : (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-200"
          >
            {link.icon}
          </a>
        )
      ))}
    </div>
  );
}
