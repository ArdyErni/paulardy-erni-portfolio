import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/types/portfolio";
import { EducationSection } from "@/components/profile/EducationSection";
import { CertificationsSection } from "@/components/profile/CertificationsSection";

const data = portfolioData as unknown as PortfolioData;

export function BackgroundView() {
  return (
    <div>
      <div className="pt-12 pb-2">
        <div className="container mx-auto px-6 max-w-5xl">
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Background
          </h1>
        </div>
      </div>
      <EducationSection education={data.education} />
      <CertificationsSection certifications={data.certifications} />
    </div>
  );
}
