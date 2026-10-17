"use client";

import Image from "next/image";
import { useState } from "react";
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

// Photo stack: 5 cards fanned out, center card is the real photo
const STACK = [
  { z: 8, w: 132, h: 176, bg: "rgb(207,224,212)", rotate: -7, tx: -140, ty: -20 },
  { z: 9, w: 172, h: 228, bg: "rgb(217,230,220)", rotate: -4, tx: -90, ty: -10 },
  { z: 10, w: 220, h: 290, bg: "rgb(227,236,229)", rotate: 0, tx: 0, ty: 0, isPhoto: true },
  { z: 9, w: 172, h: 228, bg: "rgb(217,230,220)", rotate: 4, tx: 90, ty: -10 },
  { z: 8, w: 132, h: 176, bg: "rgb(207,224,212)", rotate: 7, tx: 140, ty: -20 },
];

export function HeroSection({ profile, onNavigate }: HeroSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [activeIdx, setActiveIdx] = useState(2); // center card on top

  const shuffleStack = () => setActiveIdx((i) => (i + 1) % STACK.length);

  return (
    <>
      <section className="bg-[#fafbfa] min-h-[calc(100vh-50px)] flex items-center">
        <div className="mx-auto w-full px-6 py-14" style={{ maxWidth: 1100 }}>
          <div className="grid items-center gap-14" style={{ gridTemplateColumns: "340px 1fr" }}>
            {/* LEFT */}
            <div className="flex flex-col items-center gap-5">
              <div
                className="relative overflow-hidden bg-white rounded-[28px] border border-[#dfe3df]"
                style={{ width: 300, height: 300, boxShadow: "rgba(10,60,30,0.12) 0px 12px 32px 0px" }}
              >
                <Image
                  src="/user_profile/Formal Picture.jpg"
                  alt={`Portrait of ${profile.name}`}
                  fill
                  className="object-cover object-bottom"
                />
              </div>

              <div className="flex items-center gap-3">
                <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="w-[46px] h-[46px] rounded-full border border-[#cfd6cf] bg-white flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors">
                  <Github size={20} />
                </a>
                <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-[46px] h-[46px] rounded-full border border-[#cfd6cf] bg-white flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href={`mailto:${profile.socials.email}`} className="w-[46px] h-[46px] rounded-full border border-[#cfd6cf] bg-white flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors">
                  <Mail size={20} />
                </a>
                <button onClick={() => setShowModal(true)} className="w-[46px] h-[46px] rounded-full border border-[#cfd6cf] bg-white flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-[18px]">
              <span className="self-start text-[13px] font-bold px-[14px] py-[6px] rounded-full" style={{ backgroundColor: "rgb(217,242,227)", color: "rgb(7,100,58)" }}>
                ● Open to opportunities
              </span>
              <h1 className="font-black leading-[1.05] tracking-[-2px]" style={{ fontSize: 60 }}>
                Hi, I&apos;m <span className="text-primary">{profile.name}</span>
              </h1>
              <div className="font-medium" style={{ fontSize: 22, color: "rgb(91,98,91)" }}>
                {profile.title}
              </div>
              <p className="leading-[1.65]" style={{ fontSize: 17, color: "rgb(59,63,59)", maxWidth: 560 }}>
                Based in <b>{profile.location}</b>, I&apos;m currently <b>Lead AI Automation Engineer</b> at AgentGenius.ai.{" "}
                {profile.introduction.split(". ").slice(1).join(". ")}
              </p>
              <div className="flex flex-wrap gap-[10px]">
                <button onClick={() => onNavigate("projects")} className="px-[18px] py-[10px] rounded-full text-[14px] font-semibold text-white" style={{ backgroundColor: "#0a8a47" }}>
                  View Projects
                </button>
                <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="px-[18px] py-[10px] rounded-full text-[14px] font-semibold border" style={{ color: "#0a8a47", borderColor: "#0a8a47" }}>
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full modal overlay */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative bg-white"
            style={{
              borderRadius: 24,
              boxShadow: "rgba(0,0,0,0.35) 0px 30px 80px 0px",
              padding: 44,
              width: 1040,
              maxWidth: "calc(100vw - 32px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute flex items-center justify-center rounded-full border border-[#e4e6e4] bg-white hover:bg-gray-50 transition-colors"
              style={{ top: 16, right: 16, width: 40, height: 40 }}
            >
              <X size={18} />
            </button>

            {/* Two-column grid */}
            <div className="grid items-center" style={{ gridTemplateColumns: "1fr 1fr", gap: 40 }}>
              {/* Left: text */}
              <div className="flex flex-col" style={{ gap: 14 }}>
                <h2 style={{ font: "700 36px \"DM Sans\", system-ui, sans-serif", letterSpacing: "-1px", margin: 0 }}>
                  More about me
                </h2>
                <p style={{ fontSize: 15, lineHeight: "24px", color: "rgb(91,98,91)", margin: 0 }}>
                  {profile.about}
                </p>

                {/* Facts table */}
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

              {/* Right: photo stack */}
              <div className="flex flex-col items-center" style={{ gap: 14 }}>
                {/* Stack */}
                <div className="relative" style={{ width: 512, height: 320 }}>
                  {STACK.map((card, i) => (
                    <div
                      key={i}
                      onClick={shuffleStack}
                      className="absolute flex items-center justify-center cursor-pointer overflow-hidden"
                      style={{
                        width: card.w,
                        height: card.h,
                        backgroundColor: card.bg,
                        borderRadius: 16,
                        border: "3.64px solid white",
                        boxShadow: "rgba(10,60,30,0.15) 0px 6px 18px 0px",
                        top: "50%",
                        left: "50%",
                        transform: `translate(calc(-50% + ${card.tx}px), calc(-50% + ${card.ty}px)) rotate(${card.rotate}deg)`,
                        zIndex: i === activeIdx ? 11 : card.z,
                        transition: "z-index 0s",
                      }}
                    >
                      {card.isPhoto && (
                        <Image
                          src="/user_profile/Formal Picture.jpg"
                          alt={profile.name}
                          fill
                          className="object-cover object-bottom"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Dot indicators */}
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
