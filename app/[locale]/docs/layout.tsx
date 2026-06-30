import { source } from "@/lib/source";
import { DocsLayout } from "@/components/layout/docs-layout";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <DocsLayout tree={source.getPageTree(locale)}>{children}</DocsLayout>
  );
}
