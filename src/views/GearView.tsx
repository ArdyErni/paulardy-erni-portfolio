import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/types/portfolio";
import Image from "next/image";

const data = portfolioData as unknown as PortfolioData;

export function GearView() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-2">Gear</h1>
          <p className="text-muted-foreground text-[17px]">
            The hardware I use to build, ship and stay productive. - My desk
            setup.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {data.gear.map((item) => (
            <article
              key={item.id}
              className="flex flex-col rounded-2xl border border-border bg-white overflow-hidden"
            >
              <div className="aspect-square bg-[#e6ece6] flex items-center justify-center text-muted-foreground text-sm">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={260}
                    height={260}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <span>[PRODUCT IMAGE]</span>
                )}
              </div>
              <div className="flex flex-col gap-1.5 border-t border-border px-5 py-[18px]">
                <span className="text-[12px] font-bold uppercase tracking-[1.2px] text-muted-foreground">
                  {item.category}
                </span>
                <h3 className="text-[17px] font-bold leading-snug">
                  {item.name}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
