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
    { href: socials.github, icon: <Github size={iconSize} />, label: 'GitHub' },
    { href: socials.linkedin, icon: <Linkedin size={iconSize} />, label: 'LinkedIn' },
    { href: socials.email ? `mailto:${socials.email}` : '', icon: <Mail size={iconSize} />, label: 'Email' },
    { href: socials.website, icon: <Globe size={iconSize} />, label: 'Website' },
  ].filter((l) => l.href);

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          aria-label={link.label}
          className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-200"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
