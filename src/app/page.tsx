import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ResumeSection } from '@/components/ResumeSection';
import { FeaturedProject } from '@/components/FeaturedProject';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { CertificationsSection } from '@/components/CertificationsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ResumeSection />
      <FeaturedProject />
      <ProjectsGrid />
      <AboutSection />
      <SkillsSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}