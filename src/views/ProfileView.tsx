import { portfolio as data } from "@/lib/portfolio";
import type { ViewId } from "@/hooks/useView";
import { HeroSection } from "@/components/profile/HeroSection";

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
