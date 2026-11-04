import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/LoadingScreen";
import { portfolio, siteUrl } from "@/lib/portfolio";
import { ContactProvider } from "@/components/contact/ContactProvider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "39ZNBUqFVccZBg2mHqo6wGu0G9OI3kO_-Q1Q3U5Xvws",
  },
  icons: {
    icon: portfolio.site.favicon,
  },
  title: portfolio.site.title,
  description: portfolio.site.description,
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
        <ContactProvider>{children}</ContactProvider>
      </body>
    </html>
  );
}
