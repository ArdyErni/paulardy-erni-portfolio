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
        <p className="font-bold text-foreground">No projects found</p>
        <p className="text-sm text-muted-foreground">
          {query && category !== 'all'
            ? `No results for "${query}" in "${category}"`
            : query
            ? `No results for "${query}"`
            : `No projects in "${category}"`}
        </p>
      </div>
      <button
        onClick={onReset}
        className="text-sm font-semibold text-primary hover:underline underline-offset-4"
      >
        Clear filters
      </button>
    </div>
  );
}
