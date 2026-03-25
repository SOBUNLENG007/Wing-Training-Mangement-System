import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input }  from "@/components/ui/input";
import { FILTER_OPTIONS, FilterOption } from "../utils";

type Props = {
  search:    string;
  filter:    FilterOption;
  onSearch:  (v: string) => void;
  onFilter:  (f: FilterOption) => void;
};

export function SessionFilters({ search, filter, onSearch, onFilter }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search sessions..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex items-center gap-2">
        <Filter className="size-4 text-muted-foreground" />
        {FILTER_OPTIONS.map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            size="sm"
            onClick={() => onFilter(f)}
            className="capitalize text-xs"
          >
            {f}
          </Button>
        ))}
      </div>
    </div>
  );
}