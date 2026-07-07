import type {Metadata} from 'next';
import './globals.css';
import { LoadingScreen } from '@/components/LoadingScreen'; // add this

export const metadata: Metadata = {
  icons: {
    icon: '/website_logo/portfolio_logo.png',
  },
  title: 'Ardy | Full-Stack Web Developer',
  description: 'Full-Stack Web Developer focused on building workflow-driven systems and scalable web applications.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <LoadingScreen /> {/* add this */}
        {children}
      </body>
    </html>
  );
}