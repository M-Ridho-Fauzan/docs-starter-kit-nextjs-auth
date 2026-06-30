"use client";

import { usePathname } from "next/navigation";
import { t, getLocaleFromPathname } from "@/lib/i18n";

export function Footer() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const strings = t.get(locale)!;

  return (
    <footer className="border-t">
      <div className="mx-auto flex h-14 max-w-[90rem] items-center justify-between px-4 lg:px-8">
        <p className="text-xs text-muted-foreground">
          {strings["footer.copyright"]}
        </p>
        <a
          href="https://github.com/M-Ridho-Fauzan/docs-starter-kit-nextjs-auth"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
