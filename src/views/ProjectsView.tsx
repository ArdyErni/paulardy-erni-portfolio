"use client";

import { useState, useMemo } from "react";
import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/types/portfolio";
import { useProjectModal } from "@/hooks/useProjectModal";
import { SearchInput } from "@/components/projects/SearchInput";
import { FilterChips } from "@/components/projects/FilterChips";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { EmptyState } from "@/components/projects/EmptyState";

const data = portfolioData as unknown as PortfolioData;

// Derive unique categories from all projects — no hardcoding
const allCategories = Array.from(
  new Set(data.projects.flatMap((p) => p.categories)),
).sort();

export function ProjectsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { selectedProject, openProject, closeProject } = useProjectModal(
    data.projects,
  );

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
    <section className="py-16">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Recent Projects
          </h1>
        </div>

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
          <EmptyState
            query={searchQuery}
            category={selectedCategory}
            onReset={handleReset}
          />
        )}
      </div>

      {/* Modal — rendered outside the grid container to avoid stacking context issues */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeProject} />
      )}
    </section>
  );
}
