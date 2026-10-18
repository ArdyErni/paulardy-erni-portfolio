"use client";

import { Navbar } from "@/components/Navbar";
import { ProfileView } from "@/views/ProfileView";
import { BackgroundView } from "@/views/BackgroundView";
import { ProjectsView } from "@/views/ProjectsView";
import { GearView } from "@/views/GearView";
import { useView } from "@/hooks/useView";
import { useCurtain } from "@/hooks/useCurtain";

export default function Home() {
  const { activeView, setActiveView } = useView("profile");
  const { curtainRef, navigate } = useCurtain(setActiveView);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeView={activeView} onViewChange={navigate} />
      <main className="flex-1">
        {activeView === "profile" && <ProfileView onNavigate={navigate} />}
        {activeView === "background" && <BackgroundView />}
        {activeView === "projects" && <ProjectsView />}
        {activeView === "gear" && <GearView />}
      </main>

      {/* Curtain wipe overlay — sits above content, below nothing */}
      <div
        ref={curtainRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background: "linear-gradient(135deg, #0a8a47 0%, #4fc87a 100%)",
          transform: "translateX(-101%)",
          pointerEvents: "none",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Logo mark shown while screen is covered */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/website_logo/portfolio_inverted.png"
          alt=""
          width={256}
          height={256}
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
