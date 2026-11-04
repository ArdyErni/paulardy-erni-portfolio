import rawPortfolio from "@/data/portfolio.json";
import type { PortfolioData, Profile } from "@/types/portfolio";

// Structural assignment checks the JSON without bypassing TypeScript with casts.
export const portfolio: PortfolioData = rawPortfolio;
export const siteUrl = portfolio.profile.socials.website.replace(/\/$/, "");

export function profileValues(profile: Profile): Record<string, string> {
  const current = portfolio.experience.find(
    (entry) => entry.id === profile.currentExperienceId,
  );
  return {
    name: profile.name,
    title: profile.title,
    location: profile.location,
    interests: profile.interests,
    currentRole: current?.roles[0]?.title ?? "",
    currentOrganization: current?.organization ?? "",
    educationInstitution: portfolio.education[0]?.institution ?? "",
  };
}

/** Plain-text placeholders; markup and HTML are never evaluated. */
export function formatContent(text: string, values: Record<string, string> = {}): string {
  return text.replace(/\{(\w+)\}/g, (placeholder, key: string) => values[key] ?? placeholder);
}
