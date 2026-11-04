import { portfolio, profileValues } from "@/lib/portfolio";
import React from "react";
import { ContactTrigger } from "@/components/contact/ContactProvider";
import { ContentText } from "@/components/ContentText";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative pt-40 pb-20 overflow-hidden bg-dot-pattern"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-shrink-0 relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-500">
              <Image
                src={portfolio.profile.avatar}
                alt={portfolio.profile.name}
                width={400}
                height={400}
                className="object-cover object-top w-full h-full"
                priority
              />
            </div>
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-secondary/60 rounded-[2.5rem] rotate-6" />
          </div>

          <div className="flex-1 space-y-5 max-w-2xl text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight">
              {portfolio.profile.greeting} <span className="text-primary">{portfolio.profile.name}</span>
            </h1>

            <p className="text-xl md:text-2xl font-semibold text-muted-foreground">
              {portfolio.profile.title}
            </p>

            <p className="text-base text-foreground/80 leading-relaxed max-w-md mx-auto md:mx-0">
              <ContentText text={portfolio.profile.introduction} values={profileValues(portfolio.profile)} />
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 pt-2">
              <Button
                size="lg"
                className="h-11 px-7 text-sm font-bold rounded-full group"
                asChild
              >
                <a href="#projects">
                  {portfolio.labels.viewProjects}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 px-7 text-sm font-bold rounded-full border-2 hover:bg-muted"
                asChild
              >
                <ContactTrigger>{portfolio.labels.contactMe}</ContactTrigger>
              </Button>
              <a
                href={portfolio.profile.resume}
                download="resume.pdf"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4"
              >
                <Download className="h-4 w-4" />
                {portfolio.labels.downloadResume}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
