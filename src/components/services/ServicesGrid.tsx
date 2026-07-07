import { ServiceCard } from "./ServiceCard";
import type { Service } from "@/types/portfolio";

interface ServicesGridProps {
  services: Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-2">Services</h1>
          <p className="text-muted-foreground max-w-xl">
            Practical solutions built around your business goals — not just
            technology for its own sake.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
