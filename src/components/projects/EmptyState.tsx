import { portfolio } from "@/lib/portfolio";
import { formatContent } from '@/lib/portfolio';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  query: string;
  category: string;
  onReset: () => void;
}

export function EmptyState({ query, category, onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
        <SearchX size={28} />
      </div>
      <div className="space-y-1">
        <p className="font-bold text-foreground">{portfolio.labels.noProjects}</p>
        <p className="text-sm text-muted-foreground">
          {query && category !== 'all'
            ? formatContent(portfolio.labels.noQueryCategory, { query, category })
            : query
            ? formatContent(portfolio.labels.noQuery, { query })
            : formatContent(portfolio.labels.noCategory, { category })}
        </p>
      </div>
      <button
        onClick={onReset}
        className="text-sm font-semibold text-primary hover:underline underline-offset-4"
      >
        {portfolio.labels.clearFilters}
      </button>
    </div>
  );
}
