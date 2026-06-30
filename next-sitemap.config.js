/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://starterkit-auth-nextjs.vercel.app",
  generateRobotsTxt: true,
  exclude: ["/api/*"],
  alternateRefs: [
    {
      href: "https://starterkit-auth-nextjs.vercel.app/en",
      hreflang: "en",
    },
    {
      href: "https://starterkit-auth-nextjs.vercel.app/id",
      hreflang: "id",
    },
  ],
};
