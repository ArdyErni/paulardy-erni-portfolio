import { portfolio as data } from "@/lib/portfolio";
import { ServicesGrid } from "@/components/services/ServicesGrid";
// import { DevelopmentProcess } from '@/components/services/DevelopmentProcess';
// import { CallToAction } from '@/components/services/CallToAction';

export function ServicesView() {
  return (
    <div>
      <ServicesGrid services={data.services} />
      {/* <DevelopmentProcess steps={data.process} />
      <CallToAction profile={data.profile} /> */}
    </div>
  );
}
