import { createI18nMiddleware } from "fumadocs-core/i18n/middleware";

export default createI18nMiddleware({
  defaultLanguage: "en",
  languages: ["en", "id"],
  hideLocale: "never",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
