import Link from "next/link";
import {
  BookOpen,
  Code,
  Database,
  ExternalLink,
  FileText,
  Palette,
  Rocket,
  Shield,
  Terminal,
} from "lucide-react";

const features = [
  {
    title: "Get Started",
    description:
      "Installation, Quick Start, Configuration — go from zero to running in 5 minutes.",
    href: "/docs/get-started/installation",
    icon: Rocket,
  },
  {
    title: "Auth Features",
    description:
      "Email/password, OAuth, email verification, password reset, 2FA, and role-based access.",
    href: "/docs/auth-features/email-password",
    icon: Shield,
  },
  {
    title: "Database",
    description:
      "Prisma, Drizzle, or Kysely — swap adapters without changing your auth logic.",
    href: "/docs/database/overview",
    icon: Database,
  },
  {
    title: "API Reference",
    description:
      "11 server actions, 13 React hooks, server utilities, and middleware.",
    href: "/docs/api/server-actions",
    icon: Code,
  },
  {
    title: "UI Components",
    description:
      "Auth forms, user profile, 2FA setup — shadcn/ui components ready to use.",
    href: "/docs/ui/auth-components",
    icon: Palette,
  },
  {
    title: "Guides",
    description:
      "Deploy to Vercel, write tests, manage Prisma migrations, and customize.",
    href: "/docs/guides/deployment",
    icon: BookOpen,
  },
  {
    title: "Reference",
    description:
      "Complete config schema, TypeScript types, and CLI tools documentation.",
    href: "/docs/reference/config-schema",
    icon: FileText,
  },
  {
    title: "Examples",
    description:
      "Protected layouts, custom adapters — real-world code examples.",
    href: "/docs/examples/protected-layout",
    icon: Terminal,
  },
];

const techStack = [
  "Next.js 16",
  "Better Auth",
  "shadcn/ui",
  "Tailwind CSS v4",
  "TypeScript",
];

const codeSnippet = `import { defineAuthConfig } from "@/auth/config";

export default defineAuthConfig({
  database: {
    adapter: "prisma",
    url: process.env.DATABASE_URL!,
  },
  features: {
    emailPassword: {
      enabled: true,
      requireEmailVerification: true,
    },
    oauth: {
      github: { enabled: true },
    },
  },
});`;

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-24 md:py-32 lg:py-40">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-30 dark:opacity-20"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% -20%, var(--primary), transparent)",
            }}
          />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground animate-in fade-in slide-in-from-bottom-2 duration-500">
            <span className="size-1.5 rounded-full bg-green-500" />
            Built with Better Auth + Next.js 16
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text text-transparent">
              NextJS Auth
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Starter Kit
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Production-ready authentication for Next.js 16. Email/password,
            OAuth, 2FA, roles — fully documented, config-driven.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Link
              href="/docs/get-started/installation"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
            >
              <BookOpen className="size-4" />
              Read the Docs
            </Link>
            <Link
              href="https://docs-nextauth-betterauth-five.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border bg-background px-6 text-sm font-medium transition-all hover:bg-muted hover:-translate-y-0.5"
            >
              <ExternalLink className="size-4" />
              GitHub
            </Link>
          </div>
        </div>

        {/* Code Preview */}
        <div className="mx-auto mt-16 w-full max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500">
          <div className="relative overflow-hidden rounded-xl border bg-card shadow-2xl shadow-primary/5">
            {/* Window header */}
            <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
              <div className="size-3 rounded-full bg-red-400/80" />
              <div className="size-3 rounded-full bg-yellow-400/80" />
              <div className="size-3 rounded-full bg-green-400/80" />
              <span className="ml-2 text-xs font-mono text-muted-foreground">
                auth.config.ts
              </span>
            </div>
            {/* Code content */}
            <pre className="overflow-x-auto p-6 text-sm leading-relaxed font-mono">
              <code className="text-muted-foreground">
                {codeSnippet.split("\n").map((line, i) => (
                  <div
                    key={i}
                    className="animate-in fade-in slide-in-from-left-2 duration-300"
                    style={{ animationDelay: `${600 + i * 40}ms` }}
                  >
                    {/* Simple syntax highlighting */}
                    {line.includes("import") || line.includes("export") ? (
                      <span className="text-primary">{line}</span>
                    ) : line.includes('"') ? (
                      <span>
                        {line.split(/(".*?")/).map((part, j) =>
                          part.startsWith('"') ? (
                            <span
                              key={j}
                              className="text-green-600 dark:text-green-400"
                            >
                              {part}
                            </span>
                          ) : (
                            <span key={j}>{part}</span>
                          ),
                        )}
                      </span>
                    ) : line.includes("true") || line.includes("false") ? (
                      <span>
                        {line.split(/(true|false)/).map((part, j) =>
                          part === "true" || part === "false" ? (
                            <span key={j} className="text-orange-500">
                              {part}
                            </span>
                          ) : (
                            <span key={j}>{part}</span>
                          ),
                        )}
                      </span>
                    ) : (
                      <span>{line}</span>
                    )}
                    {/* Blinking cursor on last line */}
                    {i === codeSnippet.split("\n").length - 1 && (
                      <span
                        className="inline-block w-2 h-4 bg-primary/70 ml-0.5 align-middle"
                        style={{ animation: "blink 1s step-end infinite" }}
                      />
                    )}
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl animate-in fade-in duration-500">
              Everything You Need
            </h2>
            <p className="mt-4 text-lg text-muted-foreground animate-in fade-in duration-500 delay-100">
              Complete documentation for every feature, from setup to
              production.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="group relative flex flex-col rounded-xl border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${i * 75}ms` }}
                >
                  <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mb-2 text-sm font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground flex-1">
                    {feature.description}
                  </p>
                  <span className="mt-4 text-xs font-medium text-primary opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1">
                    Learn more →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 py-16 border-y bg-muted/30">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium text-muted-foreground mb-6 animate-in fade-in duration-500">
            Built with
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full border bg-background px-4 py-2 text-sm font-medium shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl animate-in fade-in duration-500">
            Ready to build?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground animate-in fade-in duration-500 delay-100">
            Get started in 5 minutes with our step-by-step installation guide.
          </p>
          <div className="mt-10 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
            <Link
              href="/docs/get-started/installation"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
            >
              <Rocket className="size-4" />
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
