"use client";

import Image from "next/image";
import { Content as DialogContent } from "@radix-ui/react-dialog";
import { Reveal } from "@/components/Reveal";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContactTrigger } from "@/components/contact/ContactProvider";
import { ContentText } from "@/components/ContentText";
import { portfolio, formatContent, profileValues } from "@/lib/portfolio";
import { useState, useEffect, useCallback } from "react";
import { Github, Linkedin, Mail, MoreHorizontal, X } from "lucide-react";
import type { Profile } from "@/types/portfolio";
import type { ViewId } from "@/hooks/useView";

interface HeroSectionProps {
  profile: Profile;
  onNavigate: (view: ViewId) => void;
}

// Photo geometry is presentation; photo content lives in portfolio.json.
const STACK = [
  { z: 8, w: 152, h: 210, rotate: -7, tx: -155, ty: -20 },
  { z: 9, w: 196, h: 268, rotate: -4, tx: -100, ty: -10 },
  { z: 10, w: 252, h: 340, rotate: 0, tx: 0, ty: 0 },
  { z: 9, w: 196, h: 268, rotate: 4, tx: 100, ty: -10 },
  { z: 8, w: 152, h: 210, rotate: 7, tx: 155, ty: -20 },
];

const STACK_MOBILE = [
  { z: 8, w: 91, h: 126, rotate: -7, tx: -93, ty: -12 },
  { z: 9, w: 118, h: 161, rotate: -4, tx: -60, ty: -6 },
  { z: 10, w: 151, h: 204, rotate: 0, tx: 0, ty: 0 },
  { z: 9, w: 118, h: 161, rotate: 4, tx: 60, ty: -6 },
  { z: 8, w: 91, h: 126, rotate: 7, tx: 93, ty: -12 },
];

// Verified alternatives for legacy numbered labels; custom JSON alternatives take precedence.
const ABOUT_PHOTO_ALTS: Record<string, string> = {
  "/shuffle_imgs/grad_guitar.JPG": "Graduation portrait holding an acoustic guitar.",
  "/shuffle_imgs/grad_formal.jpg": "Formal graduation portrait in a cap and gown.",
  "/shuffle_imgs/food.jpg": "Rice bowls and side dishes on a wooden table.",
  "/shuffle_imgs/pc_setup.jpg": "Desk setup with two monitors, a keyboard, and a PC tower.",
  "/shuffle_imgs/with_shane.jpg": "Two people taking a selfie in a round outdoor mirror.",
};

const SOCIAL_ICONS = (profile: Profile) => [
  { href: profile.socials.github, icon: <Github size={18} />, label: portfolio.labels.github },
  {
    href: profile.socials.linkedin,
    icon: <Linkedin size={18} />,
    label: portfolio.labels.linkedin,
  },
  {
    href: profile.socials.email,
    contact: true,
    icon: <Mail size={18} />,
    label: portfolio.labels.email,
  },
];

export function HeroSection({ profile, onNavigate }: HeroSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [carousel, setCarousel] = useState({ active: 0, jumping: -1 });
  const { active, jumping } = carousel;
  const photos = profile.photos;
  const N = photos.length;
  const values = profileValues(profile);
  const { labels } = portfolio;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const advance = useCallback(() => {
    if (N < 2) return;
    setCarousel((c) => ({
      active: (c.active + 1) % N,
      jumping: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? -1
        : (c.active - 2 + N) % N,
    }));
  }, [N]);

  // Clear the jumping flag after one frame so the card can fade back in
  useEffect(() => {
    if (jumping === -1) return;
    const t = setTimeout(() => setCarousel((c) => ({ ...c, jumping: -1 })), 30);
    return () => clearTimeout(t);
  }, [jumping]);

  useEffect(() => {
    if (!showModal) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval: ReturnType<typeof setInterval> | undefined;
    const syncPlayback = () => {
      clearInterval(interval);
      if (!motion.matches) interval = setInterval(advance, 3000);
    };
    syncPlayback();
    motion.addEventListener("change", syncPlayback);
    return () => {
      clearInterval(interval);
      motion.removeEventListener("change", syncPlayback);
    };
  }, [showModal, advance]);

  const stack = isMobile ? STACK_MOBILE : STACK;
  const stackW = isMobile ? 320 : 560;
  const stackH = isMobile ? 224 : 390;

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          from { transform: translateX(-100%) skewX(-12deg); }
          to   { transform: translateX(220%) skewX(-12deg); }
        }
        .cta-shimmer { position: relative; overflow: hidden; }
        .cta-shimmer::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%);
          transform: translateX(-100%) skewX(-12deg);
          pointer-events: none;
        }
        .cta-shimmer:hover::before { animation: shimmer 600ms ease forwards; }
        @media (prefers-reduced-motion: reduce) {
          .float-photo { animation: none !important; }
          .cta-shimmer::before { display: none; }
        }
      `}</style>

      {/* HERO */}
      <section className="bg-[#fafbfa] min-h-[calc(100vh-56px)] flex items-start md:items-center pb-20 md:pb-0">
        <div className="page-container py-8 md:py-14">
          {/* Mobile: single column centered | Desktop: two-column grid */}
          <div
            className="flex flex-col items-center text-center gap-3 md:grid md:items-center md:gap-14 md:text-left"
            style={{ gridTemplateColumns: "340px 1fr" }}
          >
            {/* LEFT */}
            <Reveal
              delay={0}
              className="flex flex-col items-center gap-3 md:gap-5"
            >
              {/* Photo */}
              <div
                className="float-photo relative h-[170px] w-[170px] rounded-[24px] overflow-hidden bg-white border border-[#dfe3df] md:h-[300px] md:w-[300px] md:rounded-[28px]"
                style={{
                  boxShadow: "rgba(10,60,30,0.12) 0px 10px 26px 0px",
                  animation: "float 4s ease-in-out infinite",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={profile.avatar}
                  alt={formatContent(labels.portraitAlt, values)}
                  fill
                  className="object-cover object-bottom"
                />
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-[10px]">
                {SOCIAL_ICONS(profile).map(({ href, icon, label, contact }, i) => (
                  <Reveal key={label} delay={200 + i * 60}>
                    {contact ? (
                      <ContactTrigger
                        aria-label={label}
                        className="w-[44px] h-[44px] rounded-full border border-[#cfd6cf] bg-white flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors"
                      >
                        {icon}
                      </ContactTrigger>
                    ) : (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-[44px] h-[44px] rounded-full border border-[#cfd6cf] bg-white flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors"
                      >
                        {icon}
                      </a>
                    )}
                  </Reveal>
                ))}
                <Reveal delay={200 + 3 * 60}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      aria-label={labels.more}
                      className="w-[44px] h-[44px] rounded-full border border-[#cfd6cf] bg-white flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <MoreHorizontal size={18} aria-hidden="true" />
                    </button>
                  </DialogTrigger>
                </Reveal>
              </div>
            </Reveal>

            {/* RIGHT */}
            <div className="flex flex-col items-center md:items-start gap-2 md:gap-[18px] w-full">
              <Reveal delay={80}>
                <span
                  className="inline-block text-[12px] font-bold px-[12px] py-[5px] rounded-full"
                  style={{
                    backgroundColor: "rgb(217,242,227)",
                    color: "rgb(7,100,58)",
                  }}
                >
                  {profile.availability}
                </span>
              </Reveal>

              <Reveal delay={150}>
                <h1
                  className="font-bold leading-[1.08] tracking-[-1px] md:font-black md:leading-[1.05] md:tracking-[-2px]"
                  style={{ fontSize: "clamp(30px, 8vw, 60px)" }}
                >
                  {profile.greeting}{" "}
                  <span className="text-primary">{profile.name}</span>
                  <span
                    className="inline-block w-[3px] bg-primary ml-1 align-middle animate-pulse motion-reduce:animate-none"
                    style={{
                      height: "clamp(26px, 7vw, 52px)",
                      borderRadius: 2,
                      animationDuration: "900ms",
                    }}
                  />
                </h1>
              </Reveal>

              <Reveal delay={220}>
                <div
                  className="font-medium"
                  style={{
                    fontSize: "clamp(14px, 3.5vw, 22px)",
                    color: "rgb(91,98,91)",
                  }}
                >
                  {profile.title}
                </div>
              </Reveal>

              <Reveal delay={290}>
                <p
                  className="leading-[1.6]"
                  style={{
                    fontSize: "clamp(13.5px, 3.2vw, 17px)",
                    color: "rgb(59,63,59)",
                    maxWidth: 560,
                  }}
                >
                  <ContentText text={profile.introduction} values={values} />
                </p>
              </Reveal>

              <Reveal delay={360}>
                <div className="flex flex-col w-full gap-[10px] md:flex-row md:flex-wrap md:w-auto">
                  <button
                    onClick={() => onNavigate("projects")}
                    className="cta-shimmer px-[18px] py-[13px] md:py-[10px] rounded-full text-[15px] md:text-[14px] font-semibold text-white text-center"
                    style={{ backgroundColor: "hsl(var(--primary))" }}
                  >
                    {labels.viewProjects}
                  </button>
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-shimmer px-[18px] py-[13px] md:py-[10px] rounded-full text-[15px] md:text-[14px] font-semibold border text-center"
                    style={{ color: "hsl(var(--primary))", borderColor: "hsl(var(--primary))" }}
                  >
                    {labels.downloadResume}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL */}
      <DialogPortal>
        <DialogOverlay className="z-[100] bg-black/45 motion-reduce:!animate-none" />
          <DialogContent
            data-about-dialog
            aria-modal="true"
            className="fixed inset-x-0 bottom-0 z-[101] w-full max-h-[90dvh] overflow-y-auto rounded-t-3xl bg-white px-5 pt-8 pb-10 focus:outline-none data-[state=open]:animate-[about-sheet-in_280ms_ease-out] data-[state=closed]:animate-[about-sheet-out_280ms_ease-in] md:inset-x-auto md:bottom-auto md:left-1/2 md:top-1/2 md:w-[calc(100%_-_3rem)] md:max-w-[1040px] md:max-h-[calc(100dvh_-_48px)] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl md:px-11 md:py-[52px] md:data-[state=open]:animate-[about-dialog-in_280ms_ease-out] md:data-[state=closed]:animate-[about-dialog-out_280ms_ease-in] motion-reduce:!animate-none"
            style={{
              boxShadow: "rgba(0,0,0,0.35) 0px 30px 80px 0px",
            }}
          >
            <style>{`
              @keyframes about-sheet-in {
                from { opacity: 0; transform: translateY(40px); }
                to { opacity: 1; transform: translateY(0); }
              }
              @keyframes about-sheet-out {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(40px); }
              }
              @keyframes about-dialog-in {
                from { opacity: 0; transform: translate(-50%, calc(-50% + 16px)) scale(0.94); }
                to { opacity: 1; transform: translate(-50%, -50%); }
              }
              @keyframes about-dialog-out {
                from { opacity: 1; transform: translate(-50%, -50%); }
                to { opacity: 0; transform: translate(-50%, calc(-50% + 16px)) scale(0.94); }
              }
              @supports (scrollbar-gutter: stable) {
                body[data-scroll-locked]:has([data-about-dialog]) { margin-right: 0 !important; }
              }
            `}</style>
            {/* Close */}
            <DialogClose asChild>
              <button
                type="button"
                aria-label="Close About Me"
                className="absolute flex items-center justify-center rounded-full border border-[#e4e6e4] bg-white hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                style={{ top: 16, right: 16, width: 40, height: 40 }}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </DialogClose>

            {/* Mobile: single column | Desktop: two-column grid */}
            <div className="flex min-w-0 flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:items-center lg:gap-10">
              {/* Text */}
              <div className="flex min-w-0 flex-col" style={{ gap: 14 }}>
                <DialogTitle asChild>
                  <h2
                    style={{
                      font: '700 clamp(22px,6vw,36px) "DM Sans", system-ui, sans-serif',
                      letterSpacing: "-1px",
                      margin: 0,
                    }}
                  >
                    {labels.aboutMe}
                  </h2>
                </DialogTitle>
                <DialogDescription asChild>
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: "24px",
                      color: "rgb(91,98,91)",
                      margin: 0,
                    }}
                  >
                    {profile.about}
                  </p>
                </DialogDescription>
                <div
                  style={{
                    marginTop: 6,
                    borderBottom: "1px solid rgb(228,230,228)",
                  }}
                >
                  {profile.facts.map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex"
                      style={{
                        borderTop: "1px solid rgb(228,230,228)",
                        fontSize: 14,
                        lineHeight: "20.3px",
                        paddingTop: 11,
                        paddingBottom: 11,
                        gap: 16,
                      }}
                    >
                      <span
                        style={{
                          color: "rgb(91,98,91)",
                          flexShrink: 0,
                          width: 96,
                        }}
                      >
                        {label}
                      </span>
                      <span className="min-w-0 break-words" style={{ fontWeight: 600 }}>{formatContent(value, values)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo stack */}
              <div className="flex min-w-0 flex-col items-center" style={{ gap: 14 }}>
                <div
                  className="relative w-full cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  style={{ maxWidth: stackW, aspectRatio: `${stackW} / ${stackH}` }}
                  role="button"
                  tabIndex={0}
                  aria-label={labels.shufflePhotos}
                  onClick={advance}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      advance();
                    }
                  }}
                >
                  {photos.map(({ src, alt }, i) => {
                    const photoAlt = /^Photo\s+\d+$/i.test(alt.trim())
                      ? ABOUT_PHOTO_ALTS[src] ?? alt
                      : alt;
                    const middle = Math.floor(N / 2);
                    const offset = ((i - active + middle + N) % N) - middle;
                    if (offset < -2 || offset > 2) return null;
                    const slot = stack[offset + 2];
                    const isJumping = jumping === i;
                    return (
                      <div
                        key={i}
                        className="absolute overflow-hidden motion-reduce:!transition-none"
                        style={{
                          width: `${(slot.w / stackW) * 100}%`,
                          height: `${(slot.h / stackH) * 100}%`,
                          borderRadius: 16,
                          border: "3px solid white",
                          boxShadow: "rgba(10,60,30,0.15) 0px 6px 18px 0px",
                          top: "50%",
                          left: "50%",
                          transform: `translate(${-50 + (slot.tx / slot.w) * 100}%, ${-50 + (slot.ty / slot.h) * 100}%) rotate(${slot.rotate}deg)`,
                          zIndex: slot.z,
                          opacity: isJumping ? 0 : 1,
                          transition: isJumping
                            ? "none"
                            : "transform 500ms cubic-bezier(0.32,0.72,0,1), width 500ms cubic-bezier(0.32,0.72,0,1), height 500ms cubic-bezier(0.32,0.72,0,1), opacity 300ms ease",
                        }}
                      >
                        <Image
                          src={src}
                          alt={photoAlt}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 767px) 160px, 260px"
                          draggable={false}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center" style={{ gap: 6 }}>
                  {photos.map((_, i) => (
                    <span
                      key={i}
                      className="motion-reduce:!transition-none"
                      style={{
                        display: "block",
                        width: i === active ? 22 : 6,
                        height: 6,
                        borderRadius: 999,
                        backgroundColor:
                          i === active ? "rgb(10,138,71)" : "rgb(207,214,207)",
                        transition: "width 0.2s",
                      }}
                    />
                  ))}
                </div>

                <div style={{ fontSize: 13, color: "rgb(91,98,91)" }}>
                  {labels.shuffleHint}
                </div>
              </div>
            </div>
          </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
