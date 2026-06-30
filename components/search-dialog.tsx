"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { FileText, Loader2 } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { t, getLocaleFromPathname } from "@/lib/i18n";

interface SearchResult {
  id: string;
  url: string;
  content: string;
  breadcrumbs?: string[];
}

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPathname(pathname);
  const strings = t.get(locale)!;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      setLoading(false);
    };
  }, [query]);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const handleSelect = (url: string) => {
    onOpenChange(false);
    router.push(url);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command>
        <CommandInput
          placeholder={strings["search.placeholder"]}
          value={query}
          onValueChange={handleSearch}
        />
        <CommandList>
          <CommandEmpty>{strings["search.noResults"]}</CommandEmpty>
          {loading && (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            </div>
          )}
          {!loading && results.length > 0 && (
            <CommandGroup heading="Pages">
              {results.map((result) => (
                <CommandItem
                  key={result.id}
                  value={result.url}
                  onSelect={() => handleSelect(result.url)}
                >
                  <FileText className="size-3.5" />
                  <div className="flex flex-col">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: result.content,
                      }}
                    />
                    {result.breadcrumbs && result.breadcrumbs.length > 0 && (
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {result.breadcrumbs.join(" / ")}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
