import { portfolio as data, formatContent } from "@/lib/portfolio";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { GearDetailModal } from "@/components/gear/GearDetailModal";

export function GearView() {
  return (
    <section className="pt-6 pb-[calc(5rem_+_max(env(safe-area-inset-bottom),12px))] md:py-12">
      <div className="page-container">
        <Reveal className="mb-6 md:mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-2">
            {data.labels.gear}
          </h1>
          <p className="text-muted-foreground text-[17px]">
            {data.labels.gearDescription}
          </p>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {data.gear.map((item) => (
            <Reveal key={item.id}>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    aria-label={formatContent(data.labels.viewDetails, {
                      title: item.name,
                    })}
                    className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-white text-left shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
                  >
                    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-white">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(min-width: 1280px) 293px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                          className="object-contain"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                          {data.labels.productImage}
                        </div>
                      )}
                    </div>

                    <div className="flex w-full flex-col gap-1.5 border-t border-border p-3 sm:p-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        {item.category}
                      </span>

                      <h2 className="min-w-0 text-[15px] font-bold leading-snug transition-colors group-hover:text-primary group-focus-visible:text-primary motion-reduce:transition-none sm:text-base">
                        {item.name}
                      </h2>
                    </div>
                  </button>
                </DialogTrigger>

                <GearDetailModal item={item} />
              </Dialog>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
