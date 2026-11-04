"use client";

import { useState, useMemo, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { portfolio as data } from "@/lib/portfolio";
import type { UseProjectModalReturn } from "@/hooks/useProjectModal";
import { SearchInput } from "@/components/projects/SearchInput";
import { FilterChips } from "@/components/projects/FilterChips";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { EmptyState } from "@/components/projects/EmptyState";

// Derive unique categories from all projects — no hardcoding
const allCategories = Array.from(
  new Set(data.projects.flatMap((p) => p.categories)),
).sort();

export function ProjectsView({
  selectedProject,
  projectTrigger,
  openProject,
  closeProject,
}: UseProjectModalReturn) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const headingRef = useRef<HTMLHeadingElement>(null);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return data.projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "all" ||
        project.categories.includes(selectedCategory);

      if (!matchesCategory) return false;
      if (!q) return true;

      return (
        project.title.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.techStack.some((t) => t.toLowerCase().includes(q)) ||
        project.categories.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedCategory]);

  function handleReset() {
    setSearchQuery("");
    setSelectedCategory("all");
  }

  return (
    <section className="pt-6 pb-[calc(5rem_+_max(env(safe-area-inset-bottom),12px))] md:py-16">
      <div className="page-container">
        {/* Header */}
        <Reveal className="mb-6 md:mb-10">
          <h1 ref={headingRef} tabIndex={-1} className="text-4xl font-black tracking-tight mb-2">
            {data.labels.projectsHeading}
          </h1>
          <p className="text-muted-foreground text-[17px]">
            {data.labels.projectsDescription}
          </p>
        </Reveal>

        {/* Controls */}
        {/* <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
          <FilterChips
            categories={allCategories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div> */}

        {/* Results count */}
        {/* <p className="text-xs text-muted-foreground font-medium mb-6">
          {filteredProjects.length} project
          {filteredProjects.length !== 1 ? "s" : ""}
          {selectedCategory !== "all" && ` in "${selectedCategory}"`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p> */}

        {/* Grid or empty state */}
        {filteredProjects.length > 0 ? (
          <ProjectsGrid
            projects={filteredProjects}
            onProjectClick={openProject}
          />
        ) : (
          <Reveal>
            <EmptyState
              query={searchQuery}
              category={selectedCategory}
              onReset={handleReset}
            />
          </Reveal>
        )}
      </div>

      {/* Modal — rendered outside the grid container to avoid stacking context issues */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          trigger={projectTrigger}
          fallbackFocusRef={headingRef}
          onClose={closeProject}
        />
      )}
    </section>
  );
}
