"use client";

import { useCallback, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ProfileView } from "@/views/ProfileView";
import { BackgroundView } from "@/views/BackgroundView";
import { ProjectsView } from "@/views/ProjectsView";
import { GearView } from "@/views/GearView";
import { useView, type ViewId } from "@/hooks/useView";
import { useProjectModal } from "@/hooks/useProjectModal";
import { portfolio } from "@/lib/portfolio";

export function Portfolio({ initialProjectId }: { initialProjectId: string | null }) {
  const { activeView, setActiveView } = useView(initialProjectId ? "projects" : "profile");
  const projectModal = useProjectModal(portfolio.projects, initialProjectId);
  const { closeProject } = projectModal;

  useEffect(() => {
    const syncView = () => {
      const id = new URLSearchParams(window.location.search).get("project");
      const view = portfolio.projects.some((project) => project.id === id) ? "projects" : "profile";
      if (view !== activeView) setActiveView(view);
    };
    window.addEventListener("popstate", syncView);
    return () => window.removeEventListener("popstate", syncView);
  }, [activeView, setActiveView]);

  const navigate = useCallback((view: ViewId) => {
    if (view !== "projects") closeProject();
    setActiveView(view);
  }, [closeProject, setActiveView]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeView={activeView} onViewChange={navigate} />
      <main className="flex-1">
        {activeView === "profile" && <ProfileView onNavigate={navigate} />}
        {activeView === "background" && <BackgroundView />}
        {activeView === "projects" && <ProjectsView {...projectModal} />}
        {activeView === "gear" && <GearView />}
      </main>
    </div>
  );
}
