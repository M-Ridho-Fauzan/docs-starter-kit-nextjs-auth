"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { t, getLocaleFromPathname } from "@/lib/i18n";

interface TOCItem {
  title: string;
  url: string;
  depth: number;
}

export function TOC() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const strings = t.get(locale)!;
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const visibleIds = useRef(new Set<string>());

  useEffect(() => {
    const article = document.querySelector("article.prose");
    if (!article) {
      setItems([]);
      return;
    }

    const headings = article.querySelectorAll<HTMLHeadingElement>("h2, h3, h4");
    const toc: TOCItem[] = [];
    const elements: Element[] = [];

    for (const el of headings) {
      if (!el.id) continue;
      toc.push({
        title: el.textContent ?? "",
        url: `#${el.id}`,
        depth: parseInt(el.tagName.slice(1), 10),
      });
      elements.push(el);
    }

    setItems(toc);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleIds.current.add(entry.target.id);
          } else {
            visibleIds.current.delete(entry.target.id);
          }
        }

        let lastVisible = "";
        for (const item of toc) {
          const id = item.url.slice(1);
          if (visibleIds.current.has(id)) {
            lastVisible = id;
          }
        }

        setActiveId(lastVisible);
      },
      { rootMargin: "-80px 0px -60% 0px" },
    );

    for (const el of elements) observer.observe(el);

    return () => {
      observer.disconnect();
      visibleIds.current.clear();
    };
  }, [pathname]);

  if (items.length === 0) return null;

  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-56 shrink-0 overflow-y-auto hidden lg:block">
      <nav className="flex flex-col gap-1 p-4">
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
          {strings["toc.title"]}
        </p>
        {items.map((item, i) => (
          <a
            key={i}
            href={item.url}
            className={cn(
              "text-sm transition-colors py-1 border-l-2 pl-3",
              item.depth > 2 && "pl-6",
              activeId === item.url.slice(1)
                ? "text-foreground border-foreground font-medium"
                : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground",
            )}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </aside>
  );
}
