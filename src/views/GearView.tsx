import { portfolio as data } from "@/lib/portfolio";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";

export function GearView() {
  return (
    <section className="py-12">
      <div className="page-container">
        <Reveal className="mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-2">{data.labels.gear}</h1>
          <p className="text-muted-foreground text-[17px]">
            {data.labels.gearDescription}
          </p>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {data.gear.map((item) => (
            <Reveal key={item.id}>
              <article
                className="group flex h-full flex-col rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="aspect-square bg-[#e6ece6] flex items-center justify-center text-muted-foreground text-sm overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={260}
                      height={260}
                      className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="transition-transform duration-500 group-hover:scale-105">{data.labels.productImage}</span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5 border-t border-border px-5 py-[18px]">
                  <span className="text-[12px] font-bold uppercase tracking-[1.2px] text-muted-foreground">
                    {item.category}
                  </span>
                  <h3 className="text-[17px] font-bold leading-snug group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                  {item.specifications && item.specifications.length > 0 && (
                    <dl className="space-y-1 text-sm">
                      {item.specifications.map((spec) => (
                        <div key={spec.label}><dt className="font-semibold">{spec.label}</dt><dd className="text-muted-foreground">{spec.value}</dd></div>
                      ))}
                    </dl>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
