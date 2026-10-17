import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/LoadingScreen";

// DM Sans is the redesign's typeface. next/font self-hosts it, so there is no
// layout shift and no request to fonts.googleapis.com at runtime.
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/website_logo/portfolio_logo.png",
  },
  title: "Paul Ardy Erni",
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
