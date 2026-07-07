import { cn } from '@/lib/utils';

interface FilterChipsProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export function FilterChips({ categories, selected, onSelect }: FilterChipsProps) {
  const all = ['all', ...categories];

  return (
    <div
      className="flex items-center gap-2 flex-wrap"
      role="group"
      aria-label="Filter projects by category"
    >
      {all.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          aria-pressed={selected === cat}
          className={cn(
            'px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all duration-200',
            selected === cat
              ? 'bg-primary text-white shadow-sm'
              : 'bg-white border border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
          )}
        >
          {cat === 'all' ? 'All' : cat}
        </button>
      ))}
    </div>
  );
}
