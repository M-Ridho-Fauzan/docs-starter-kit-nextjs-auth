"use client";

import {
  BookOpen,
  ExternalLink,
  Globe,
  Menu,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchDialog } from "@/components/search-dialog";
import { t, getLocaleFromPathname } from "@/lib/i18n";
import { Label } from "../ui/label";

const locales = [
  { value: "en", label: "EN" },
  { value: "id", label: "ID" },
] as const;

export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPathname(pathname);
  const strings = t.get(locale)!;
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const switchLocale = (newLocale: string) => {
    router.push(pathname.replace(`/${locale}`, `/${newLocale}`));
  };

  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-background">
      <nav className="mx-auto flex h-full max-w-[90rem] items-center gap-4 px-4 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight hover:text-primary transition-colors"
        >
          <BookOpen className="size-4" />
          Auth Starter Kit
        </Link>

        <div className="flex-1" />

        <button
          onClick={() => setSearchOpen(true)}
          className="hidden md:flex items-center gap-2 h-9 px-3 rounded-md border bg-muted/50 text-xs text-muted-foreground hover:bg-muted transition-colors w-48"
        >
          <Search className="size-3.5" />
          <span className="flex-1 text-left">{strings["nav.search"]}</span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded border bg-background px-1.5 py-0.5 text-[10px] font-mono">
            {strings["nav.searchShortcut"]}
          </kbd>
        </button>

        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          onClick={() => setSearchOpen(true)}
        >
          <Search className="size-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              // size="icon-lg"
              className="gap-2 border rounded-xl dark:bg-muted px-2"
            >
              <Globe className="size-4" />
              <Label className="hidden md:inline-flex items-center">
                {locale}
              </Label>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {locales.map((l) => (
              <DropdownMenuItem
                key={l.value}
                onClick={() => switchLocale(l.value)}
                className={locale === l.value ? "font-semibold" : undefined}
              >
                {l.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <a
          href="https://github.com/M-Ridho-Fauzan/docs-starter-kit-nextjs-auth"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ExternalLink className="size-3.5" />
          GitHub
        </a>

        {mounted && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>
        )}

        <Button
          variant="ghost"
          size="icon-sm"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="size-4" />
        </Button>
      </nav>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
