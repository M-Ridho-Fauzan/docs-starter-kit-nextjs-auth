import type { Item } from "fumadocs-core/page-tree";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";

export function PrevNext({
  previous,
  next,
  locale,
}: {
  previous?: Item;
  next?: Item;
  locale: Locale;
}) {
  const strings = t.get(locale)!;

  if (!previous && !next) return null;

  return (
    <nav className="mt-16 border-t pt-8 flex flex-col sm:flex-row gap-4">
      {previous ? (
        <a
          href={previous.url}
          className="flex-1 no-underline group rounded-lg border p-8 hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowLeft className="size-3.5" />
            <span>{strings["prevNext.previous"]}</span>
          </div>
          <div className="font-medium mt-1 group-hover:text-primary transition-colors">
            {previous.name}
          </div>
          {previous.description && (
            <div className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
              {previous.description}
            </div>
          )}
        </a>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <a
          href={next.url}
          className="flex-1 no-underline group rounded-lg border p-8 hover:bg-muted/50 transition-colors text-right"
        >
          <div className="flex items-center gap-2 justify-end text-sm text-muted-foreground">
            <span>{strings["prevNext.next"]}</span>
            <ArrowRight className="size-3.5" />
          </div>
          <div className="font-medium mt-1 group-hover:text-primary transition-colors">
            {next.name}
          </div>
          {next.description && (
            <div className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
              {next.description}
            </div>
          )}
        </a>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
