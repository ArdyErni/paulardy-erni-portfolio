'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Project } from '@/types/portfolio';

interface UseProjectModalReturn {
  selectedProject: Project | null;
  openProject: (project: Project) => void;
  closeProject: () => void;
}

export function useProjectModal(projects: Project[]): UseProjectModalReturn {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // On mount, check for ?project=<id> in the URL and open that project
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('project');
    if (id) {
      const match = projects.find((p) => p.id === id);
      if (match) setSelectedProject(match);
    }
  }, [projects]);

  // Scroll lock while modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const openProject = useCallback((project: Project) => {
    setSelectedProject(project);
    const url = new URL(window.location.href);
    url.searchParams.set('project', project.id);
    window.history.replaceState(null, '', url.toString());
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('project');
    window.history.replaceState(null, '', url.toString());
  }, []);

  return { selectedProject, openProject, closeProject };
}
