import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/LoadingScreen";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://paulardy-erni-portfolio.vercel.app"),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "39ZNBUqFVccZBg2mHqo6wGu0G9OI3kO_-Q1Q3U5Xvws",
  },
  icons: {
    icon: "/website_logo/portfolio_logo.png",
  },
  title: "Ardy Erni | Full-Stack Web Developer",
  description:
    "Full-Stack Web Developer focused on building workflow-driven systems and scalable web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} scroll-smooth`}>
      <body className="font-body antialiased">
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
