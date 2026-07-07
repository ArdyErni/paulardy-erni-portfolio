import Image from "next/image";
import { SocialLinks } from "./SocialLinks";
import { TechStackStrip } from "./TechStackStrip";
import type { Profile } from "@/types/portfolio";
import { GithubActivity } from "./GithubActivity";

interface HeroSectionProps {
  profile: Profile;
  onNavigate: (view: "projects" | "services") => void;
}

export function HeroSection({ profile, onNavigate }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl min-h-[calc(100vh-4rem-8rem)] flex items-center">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 w-full">
          {/* Profile image — static, no rotation */}
          {/* LEFT COLUMN */}
          <div className="flex flex-col items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl">
                <Image
                  src="/user_profile/Formal Picture.jpg"
                  alt={profile.name}
                  width={800}
                  height={800}
                />
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-[2.5rem] rotate-3" />
            </div>

            {/* Social links */}
            <SocialLinks
              socials={profile.socials}
              className="justify-center md:justify-start"
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Text content */}
            <div className="flex-1 space-y-5 text-center md:text-left">
              <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight">
                  Hi, I&apos;m{" "}
                  <span className="text-primary">{profile.name}</span>
                </h1>
                <p className="text-xl md:text-2xl font-semibold text-muted-foreground">
                  {profile.title}
                </p>
              </div>

              <p className="text-base text-foreground/80 leading-relaxed max-w-md mx-auto md:mx-0">
                {profile.introduction}
              </p>

              {/* Compact tech stack */}
              <TechStackStrip technologies={profile.techStack} />
              <GithubActivity username="ArdyErni" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
