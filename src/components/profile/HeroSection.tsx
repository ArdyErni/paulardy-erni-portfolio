"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, MoreHorizontal, X } from "lucide-react";
import type { Profile } from "@/types/portfolio";
import type { ViewId } from "@/hooks/useView";

interface HeroSectionProps {
  profile: Profile;
  onNavigate: (view: ViewId) => void;
}

const FACTS = (profile: Profile) => [
  { label: "Based in", value: profile.location },
  { label: "Now", value: "Lead AI Automation Engineer, AgentGenius.ai" },
  { label: "Education", value: "BSIT, Bataan Peninsula State University" },
  { label: "Recognition", value: "Dean's Lister, 2022–2025" },
  { label: "Outside work", value: profile.interests },
];

const PHOTOS = [
  "/shuffle_imgs/grad_guitar.JPG",
  "/shuffle_imgs/grad_formal.jpg",
  "/shuffle_imgs/food.jpg",
  "/shuffle_imgs/pc_setup.jpg",
  "/shuffle_imgs/with_shane.jpg",
];

const STACK = [
  { z: 8,  w: 152, h: 210, bg: "rgb(207,224,212)", rotate: -7, tx: -155, ty: -20 },
  { z: 9,  w: 196, h: 268, bg: "rgb(217,230,220)", rotate: -4, tx: -100, ty: -10 },
  { z: 10, w: 252, h: 340, bg: "rgb(227,236,229)", rotate:  0, tx:    0, ty:   0 },
  { z: 9,  w: 196, h: 268, bg: "rgb(217,230,220)", rotate:  4, tx:  100, ty: -10 },
  { z: 8,  w: 152, h: 210, bg: "rgb(207,224,212)", rotate:  7, tx:  155, ty: -20 },
];

const STACK_MOBILE = [
  { z: 8,  w: 91,  h: 126, bg: "rgb(207,224,212)", rotate: -7, tx: -93, ty: -12 },
  { z: 9,  w: 118, h: 161, bg: "rgb(217,230,220)", rotate: -4, tx: -60, ty: -6  },
  { z: 10, w: 151, h: 204, bg: "rgb(227,236,229)", rotate:  0, tx:   0, ty:  0  },
  { z: 9,  w: 118, h: 161, bg: "rgb(217,230,220)", rotate:  4, tx:  60, ty: -6  },
  { z: 8,  w: 91,  h: 126, bg: "rgb(207,224,212)", rotate:  7, tx:  93, ty: -12 },
];

const SOCIAL_ICONS = (profile: Profile) => [
  { href: profile.socials.github,            icon: <Github size={18} />,   label: "GitHub"   },
  { href: profile.socials.linkedin,          icon: <Linkedin size={18} />, label: "LinkedIn" },
  { href: `mailto:${profile.socials.email}`, icon: <Mail size={18} />,     label: "Email"    },
];

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    const t = setTimeout(() => {
      el.style.transition = "opacity 550ms ease, transform 550ms ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}

export function HeroSection({ profile, onNavigate }: HeroSectionProps) {
  const [showModal, setShowModal]       = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeIdx, setActiveIdx]       = useState(2);
  const [photoIdx, setPhotoIdx]         = useState(0);
  const [fading, setFading]             = useState(false);
  const [isMobile, setIsMobile]         = useState(false);

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

  useEffect(() => {
    if (!showModal) return;
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setPhotoIdx((i) => (i + 1) % PHOTOS.length);
        setActiveIdx((i) => (i + 1) % STACK.length);
        setFading(false);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, [showModal]);

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setShowModal(false), 280);
  };

  const shuffleStack = () => {
    setFading(true);
    setTimeout(() => {
      setPhotoIdx((i) => (i + 1) % PHOTOS.length);
      setActiveIdx((i) => (i + 1) % STACK.length);
      setFading(false);
    }, 300);
  };

  const stack  = isMobile ? STACK_MOBILE : STACK;
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
        <div className="mx-auto w-full px-5 py-8 md:px-6 md:py-14" style={{ maxWidth: 1100 }}>

          {/* Mobile: single column centered | Desktop: two-column grid */}
          <div
            className="flex flex-col items-center text-center gap-3 md:grid md:items-center md:gap-14 md:text-left"
            style={{ gridTemplateColumns: "340px 1fr" }}
          >
            {/* LEFT */}
            <Reveal delay={0} className="flex flex-col items-center gap-3 md:gap-5">
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
                  src="/user_profile/Formal Picture.jpg"
                  alt={`Portrait of ${profile.name}`}
                  fill
                  className="object-cover object-bottom"
                />
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-[10px]">
                {SOCIAL_ICONS(profile).map(({ href, icon, label }, i) => (
                  <Reveal key={label} delay={200 + i * 60}>
                    <a
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                      aria-label={label}
                      className="w-[44px] h-[44px] rounded-full border border-[#cfd6cf] bg-white flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors"
                    >
                      {icon}
                    </a>
                  </Reveal>
                ))}
                <Reveal delay={200 + 3 * 60}>
                  <button
                    onClick={() => setShowModal(true)}
                    aria-label="More"
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
                  style={{ backgroundColor: "rgb(217,242,227)", color: "rgb(7,100,58)" }}
                >
                  ● Open to opportunities
                </span>
              </Reveal>

              <Reveal delay={150}>
                <h1
                  className="font-bold leading-[1.08] tracking-[-1px] md:font-black md:leading-[1.05] md:tracking-[-2px]"
                  style={{ fontSize: "clamp(30px, 8vw, 60px)" }}
                >
                  Hi, I&apos;m{" "}
                  <span className="text-primary">{profile.name}</span>
                  <span
                    className="inline-block w-[3px] bg-primary ml-1 align-middle animate-pulse"
                    style={{ height: "clamp(26px, 7vw, 52px)", borderRadius: 2, animationDuration: "900ms" }}
                  />
                </h1>
              </Reveal>

              <Reveal delay={220}>
                <div
                  className="font-medium"
                  style={{ fontSize: "clamp(14px, 3.5vw, 22px)", color: "rgb(91,98,91)" }}
                >
                  {profile.title}
                </div>
              </Reveal>

              <Reveal delay={290}>
                <p
                  className="leading-[1.6]"
                  style={{ fontSize: "clamp(13.5px, 3.2vw, 17px)", color: "rgb(59,63,59)", maxWidth: 560 }}
                >
                  Based in <b>{profile.location}</b>, I&apos;m currently{" "}
                  <b>Lead AI Automation Engineer</b> at AgentGenius.ai.{" "}
                  {profile.introduction.split(". ").slice(1).join(". ")}
                </p>
              </Reveal>

              <Reveal delay={360}>
                <div className="flex flex-col w-full gap-[10px] md:flex-row md:flex-wrap md:w-auto">
                  <button
                    onClick={() => onNavigate("projects")}
                    className="cta-shimmer px-[18px] py-[13px] md:py-[10px] rounded-full text-[15px] md:text-[14px] font-semibold text-white text-center"
                    style={{ backgroundColor: "#0a8a47" }}
                  >
                    View Projects
                  </button>
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-shimmer px-[18px] py-[13px] md:py-[10px] rounded-full text-[15px] md:text-[14px] font-semibold border text-center"
                    style={{ color: "#0a8a47", borderColor: "#0a8a47" }}
                  >
                    Download Resume
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
            backgroundColor: modalVisible ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0)",
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
                : isMobile ? "translateY(40px)" : "scale(0.94) translateY(16px)",
              transition: "opacity 280ms ease, transform 280ms cubic-bezier(0.32,0.72,0,1)",
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
              style={{ gridTemplateColumns: isMobile ? undefined : "1fr 1fr", gap: isMobile ? undefined : 40 }}
            >
              {/* Text */}
              <div className="flex flex-col" style={{ gap: 14 }}>
                <h2 style={{ font: '700 clamp(22px,6vw,36px) "DM Sans", system-ui, sans-serif', letterSpacing: "-1px", margin: 0 }}>
                  More about me
                </h2>
                <p style={{ fontSize: 15, lineHeight: "24px", color: "rgb(91,98,91)", margin: 0 }}>
                  {profile.about}
                </p>
                <div style={{ marginTop: 6, borderBottom: "1px solid rgb(228,230,228)" }}>
                  {FACTS(profile).map(({ label, value }) => (
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
                      <span style={{ color: "rgb(91,98,91)", flexShrink: 0, width: 96 }}>{label}</span>
                      <span style={{ fontWeight: 600 }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo stack */}
              <div className="flex flex-col items-center" style={{ gap: 14 }}>
                <div className="relative" style={{ width: stackW, height: stackH }}>
                  {stack.map((card, i) => {
                    const isFront = i === activeIdx;
                    return (
                      <div
                        key={i}
                        onClick={shuffleStack}
                        className="absolute flex items-center justify-center cursor-pointer overflow-hidden"
                        style={{
                          width: card.w,
                          height: card.h,
                          backgroundColor: card.bg,
                          borderRadius: 16,
                          border: "3px solid white",
                          boxShadow: "rgba(10,60,30,0.15) 0px 6px 18px 0px",
                          top: "50%",
                          left: "50%",
                          transform: `translate(calc(-50% + ${card.tx}px), calc(-50% + ${card.ty}px)) rotate(${card.rotate}deg)`,
                          zIndex: isFront ? 11 : card.z,
                          transition: "z-index 0s",
                        }}
                      >
                        {isFront && (
                          <Image
                            src={PHOTOS[photoIdx]}
                            alt={`Photo ${photoIdx + 1}`}
                            fill
                            className="object-cover object-center"
                            style={{
                              opacity: fading ? 0 : 1,
                              transform: fading ? "scale(1.04)" : "scale(1)",
                              transition: "opacity 300ms ease, transform 300ms ease",
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center" style={{ gap: 6 }}>
                  {STACK.map((_, i) => (
                    <span
                      key={i}
                      style={{
                        display: "block",
                        width: i === activeIdx ? 22 : 6,
                        height: 6,
                        borderRadius: 999,
                        backgroundColor: i === activeIdx ? "rgb(10,138,71)" : "rgb(207,214,207)",
                        transition: "width 0.2s",
                      }}
                    />
                  ))}
                </div>

                <div style={{ fontSize: 13, color: "rgb(91,98,91)" }}>Click the stack to shuffle</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
