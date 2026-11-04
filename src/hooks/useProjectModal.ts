'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Project } from '@/types/portfolio';

export interface UseProjectModalReturn {
  selectedProject: Project | null;
  projectTrigger: HTMLButtonElement | null;
  openProject: (project: Project, trigger: HTMLButtonElement) => void;
  closeProject: () => void;
}

export function useProjectModal(projects: Project[], initialProjectId: string | null): UseProjectModalReturn {
  const [selection, setSelection] = useState<{
    project: Project;
    trigger: HTMLButtonElement | null;
  } | null>(() => {
    const project = projects.find((entry) => entry.id === initialProjectId);
    return project ? { project, trigger: null } : null;
  });
  const selectedProject = selection?.project ?? null;

  // Keep browser history navigation in sync, even while another view is active.
  useEffect(() => {
    const syncProject = () => {
      const id = new URLSearchParams(window.location.search).get('project');
      const project = projects.find((entry) => entry.id === id);
      setSelection((current) => {
        if ((current?.project.id ?? null) === (project?.id ?? null)) return current;
        return project ? { project, trigger: null } : null;
      });
    };
    syncProject();
    window.addEventListener('popstate', syncProject);
    return () => window.removeEventListener('popstate', syncProject);
  }, [projects]);

  const openProject = useCallback((project: Project, trigger: HTMLButtonElement) => {
    setSelection({ project, trigger });
    const url = new URL(window.location.href);
    url.searchParams.set('project', project.id);
    window.history.replaceState(window.history.state, '', url.toString());
  }, []);

  const closeProject = useCallback(() => {
    setSelection(null);
    const url = new URL(window.location.href);
    if (!url.searchParams.has('project')) return;
    url.searchParams.delete('project');
    window.history.replaceState(window.history.state, '', url.toString());
  }, []);

  return { selectedProject, projectTrigger: selection?.trigger ?? null, openProject, closeProject };
}
