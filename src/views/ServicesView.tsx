import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/types/portfolio";
import { ServicesGrid } from "@/components/services/ServicesGrid";
// import { DevelopmentProcess } from '@/components/services/DevelopmentProcess';
// import { CallToAction } from '@/components/services/CallToAction';

const data = portfolioData as unknown as PortfolioData;

export function ServicesView() {
  return (
    <div>
      <ServicesGrid services={data.services} />
      {/* <DevelopmentProcess steps={data.process} />
      <CallToAction profile={data.profile} /> */}
    </div>
  );
}
