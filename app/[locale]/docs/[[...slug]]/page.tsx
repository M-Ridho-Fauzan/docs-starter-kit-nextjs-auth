import { source } from "@/lib/source";
import { notFound } from "next/navigation";
import { findNeighbour } from "fumadocs-core/page-tree";
import { CodeCopy } from "@/components/docs/code-copy";
import { PrevNext } from "@/components/docs/prev-next";
import type { Locale } from "@/lib/i18n";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { slug, locale } = await params;
  const page = source.getPage(slug, locale);
  if (!page) notFound();

  const MDXContent = page.data.body as unknown as React.ComponentType;
  const tree = source.getPageTree(locale);
  const { previous, next } = findNeighbour(tree, page.url);

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <MDXContent />
      <CodeCopy />
      <PrevNext previous={previous} next={next} locale={locale as Locale} />
    </article>
  );
}

export async function generateStaticParams() {
  return source.generateParams("slug", "locale");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { slug, locale } = await params;
  const page = source.getPage(slug, locale);
  if (!page) return {};

  const title = page.data.title ?? "Untitled";
  const description = page.data.description ?? "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      title,
      description,
    },
  };
}
