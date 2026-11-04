"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
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
  const [modalVisible, setModalVisible] = useState(false);
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

  useEffect(() => {
    if (showModal) {
      const t = setTimeout(() => setModalVisible(true), 16);
      return () => clearTimeout(t);
    } else {
      setModalVisible(false);
    }
  }, [showModal]);

  const advance = useCallback(() => {
    if (N < 2) return;
    setCarousel((c) => ({
      active: (c.active + 1) % N,
      jumping: (c.active - 2 + N) % N,
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
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const interval = setInterval(advance, 3000);
    return () => clearInterval(interval);
  }, [showModal, advance]);

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setShowModal(false), 280);
  };

  const stack = isMobile ? STACK_MOBILE : STACK;
  const stackW = isMobile ? 320 : 560;
  const stackH = isMobile ? 224 : 390;

  return (
    <>
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
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%);
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
                className="float-photo relative overflow-hidden bg-white border border-[#dfe3df]"
                style={{
                  width: isMobile ? 170 : 300,
                  height: isMobile ? 170 : 300,
                  borderRadius: isMobile ? 24 : 28,
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
                  <button
                    onClick={() => setShowModal(true)}
                    aria-label={labels.more}
                    className="w-[44px] h-[44px] rounded-full border border-[#cfd6cf] bg-white flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors"
                  >
                    <MoreHorizontal size={18} />
                  </button>
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
                    className="inline-block w-[3px] bg-primary ml-1 align-middle animate-pulse"
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
                    style={{ backgroundColor: "#0a8a47" }}
                  >
                    {labels.viewProjects}
                  </button>
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-shimmer px-[18px] py-[13px] md:py-[10px] rounded-full text-[15px] md:text-[14px] font-semibold border text-center"
                    style={{ color: "#0a8a47", borderColor: "#0a8a47" }}
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
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          style={{
            backgroundColor: modalVisible
              ? "rgba(0,0,0,0.45)"
              : "rgba(0,0,0,0)",
            transition: "background-color 280ms ease",
          }}
          onClick={closeModal}
        >
          <div
            className="relative bg-white w-full md:w-auto overflow-y-auto"
            style={{
              borderRadius: isMobile ? "24px 24px 0 0" : 24,
              boxShadow: "rgba(0,0,0,0.35) 0px 30px 80px 0px",
              padding: isMobile ? "32px 20px 40px" : "52px 44px",
              maxWidth: isMobile ? "100%" : 1040,
              maxHeight: isMobile ? "90dvh" : "calc(100vh - 48px)",
              opacity: modalVisible ? 1 : 0,
              transform: modalVisible
                ? "scale(1) translateY(0)"
                : isMobile
                  ? "translateY(40px)"
                  : "scale(0.94) translateY(16px)",
              transition:
                "opacity 280ms ease, transform 280ms cubic-bezier(0.32,0.72,0,1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute flex items-center justify-center rounded-full border border-[#e4e6e4] bg-white hover:bg-gray-50 transition-colors"
              style={{ top: 16, right: 16, width: 40, height: 40 }}
            >
              <X size={18} />
            </button>

            {/* Mobile: single column | Desktop: two-column grid */}
            <div
              className="flex flex-col gap-8 md:grid md:items-center"
              style={{
                gridTemplateColumns: isMobile ? undefined : "1fr 1fr",
                gap: isMobile ? undefined : 40,
              }}
            >
              {/* Text */}
              <div className="flex flex-col" style={{ gap: 14 }}>
                <h2
                  style={{
                    font: '700 clamp(22px,6vw,36px) "DM Sans", system-ui, sans-serif',
                    letterSpacing: "-1px",
                    margin: 0,
                  }}
                >
                  {labels.aboutMe}
                </h2>
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
                      <span style={{ fontWeight: 600 }}>{formatContent(value, values)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo stack */}
              <div className="flex flex-col items-center" style={{ gap: 14 }}>
                <div
                  className="relative cursor-pointer"
                  style={{ width: stackW, height: stackH }}
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
                    const middle = Math.floor(N / 2);
                    const offset = ((i - active + middle + N) % N) - middle;
                    if (offset < -2 || offset > 2) return null;
                    const slot = stack[offset + 2];
                    const isJumping = jumping === i;
                    return (
                      <div
                        key={i}
                        className="absolute overflow-hidden"
                        style={{
                          width: slot.w,
                          height: slot.h,
                          borderRadius: 16,
                          border: "3px solid white",
                          boxShadow: "rgba(10,60,30,0.15) 0px 6px 18px 0px",
                          top: "50%",
                          left: "50%",
                          transform: `translate(calc(-50% + ${slot.tx}px), calc(-50% + ${slot.ty}px)) rotate(${slot.rotate}deg)`,
                          zIndex: slot.z,
                          opacity: isJumping ? 0 : 1,
                          transition: isJumping
                            ? "none"
                            : "transform 500ms cubic-bezier(0.32,0.72,0,1), width 500ms cubic-bezier(0.32,0.72,0,1), height 500ms cubic-bezier(0.32,0.72,0,1), opacity 300ms ease",
                        }}
                      >
                        <Image
                          src={src}
                          alt={alt}
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
          </div>
        </div>
      )}
    </>
  );
}
