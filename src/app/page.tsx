import { Portfolio } from "@/components/Portfolio";
import { portfolio } from "@/lib/portfolio";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ project?: string | string[] }>;
}) {
  const query = await searchParams;
  const id = Array.isArray(query.project) ? query.project[0] : query.project;
  const project = portfolio.projects.find((entry) => entry.id === id);

  return <Portfolio initialProjectId={project?.id ?? null} />;
}
