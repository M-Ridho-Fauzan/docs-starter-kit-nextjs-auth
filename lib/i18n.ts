import { defineI18n } from "fumadocs-core/i18n";

export const i18n = defineI18n({
  defaultLanguage: "en",
  languages: ["en", "id"],
  hideLocale: "never",
  parser: "dir",
  fallbackLanguage: "en",
});

export const t = i18n
  .translations()
  .extend({
    keys: [
      "nav.search",
      "nav.searchShortcut",
      "footer.copyright",
      "toc.title",
      "search.placeholder",
      "search.noResults",
      "prevNext.previous",
      "prevNext.next",
    ] as const,
  })
  .add({
    en: {
      "nav.search": "Search docs...",
      "nav.searchShortcut": "⌘ K",
      "footer.copyright": "@ 2026 Built with Better Auth. All rights reserved.",
      "toc.title": "On This Page",
      "search.placeholder": "Search docs...",
      "search.noResults": "No results found.",
      "prevNext.previous": "Previous",
      "prevNext.next": "Next",
    },
    id: {
      "nav.search": "Cari docs...",
      "nav.searchShortcut": "⌘ K",
      "footer.copyright":
        "@ 2026 Dibangun dengan Better Auth. Hak cipta dilindungi.",
      "toc.title": "Di Halaman Ini",
      "search.placeholder": "Cari docs...",
      "search.noResults": "Tidak ada hasil ditemukan.",
      "prevNext.previous": "Sebelumnya",
      "prevNext.next": "Selanjutnya",
    },
  });

const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];

export function getLocaleFromPathname(pathname: string): Locale {
  const locale = pathname.split("/")[1] as Locale | undefined;
  return locale && locales.includes(locale) ? locale : "en";
}
