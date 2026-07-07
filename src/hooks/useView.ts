'use client';

import { useState } from 'react';

export type ViewId = 'profile' | 'background' | 'projects' | 'services';

export interface NavItem {
  id: ViewId;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'background', label: 'Background' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
];

export function useView(initial: ViewId = 'profile') {
  const [activeView, setActiveView] = useState<ViewId>(initial);
  return { activeView, setActiveView };
}
