import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://starterkit-auth-nextjs.vercel.app"),
  title: {
    template: "%s | NextJS Auth Starter Kit",
    default: "NextJS Auth Starter Kit Documentation",
  },
  description:
    "Documentation for the Next.js 16 auth starter kit. Guides, API reference, and examples for email/password, OAuth, 2FA, and roles with Better Auth.",
  openGraph: {
    title: "NextJS Auth Starter Kit Documentation",
    description:
      "Documentation for the Next.js 16 auth starter kit. Guides, API reference, and examples for email/password, OAuth, 2FA, and roles with Better Auth.",
    type: "website",
    locale: "en",
    siteName: "NextJS Auth Starter Kit",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextJS Auth Starter Kit Documentation",
    description:
      "Documentation for the Next.js 16 auth starter kit. Guides, API reference, and examples for email/password, OAuth, 2FA, and roles with Better Auth.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
