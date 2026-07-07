import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/types/portfolio";
import type { ViewId } from "@/hooks/useView";
import { HeroSection } from "@/components/profile/HeroSection";
import { GithubActivity } from "@/components/profile/GithubActivity";

const data = portfolioData as unknown as PortfolioData;

interface ProfileViewProps {
  onNavigate: (view: ViewId) => void;
}

export function ProfileView({ onNavigate }: ProfileViewProps) {
  return (
    <div>
      <HeroSection profile={data.profile} onNavigate={onNavigate} />
    </div>
  );
}
