import { source } from "@/lib/source";
import { createSearchAPI } from "fumadocs-core/search/server";

export const revalidate = false;

export const { GET } = createSearchAPI("simple", {
  indexes: source.getPages().map((page) => {
    const data = page.data as {
      title?: string;
      description?: string;
      structuredData?: { contents: { content: string }[] };
    };

    return {
      title: data.title ?? "",
      description: data.description ?? "",
      url: page.url,
      content: data.structuredData?.contents
        ?.map((c) => c.content)
        .join(" ") ?? "",
    };
  }),
});
