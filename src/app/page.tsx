'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProfileView } from '@/views/ProfileView';
import { BackgroundView } from '@/views/BackgroundView';
import { ProjectsView } from '@/views/ProjectsView';
import { ServicesView } from '@/views/ServicesView';
import { useView } from '@/hooks/useView';

export default function Home() {
  const { activeView, setActiveView } = useView('profile');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1">
        {activeView === 'profile' && <ProfileView onNavigate={setActiveView} />}
        {activeView === 'background' && <BackgroundView />}
        {activeView === 'projects' && <ProjectsView />}
        {activeView === 'services' && <ServicesView />}
      </main>
      <Footer />
    </div>
  );
}
