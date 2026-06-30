"use client";

import { createContext, useContext } from "react";

export interface TOCItem {
  title: string;
  url: string;
  depth: number;
}

const PageContext = createContext<{
  toc: TOCItem[];
  title: string;
}>({
  toc: [],
  title: "",
});

export function PageProvider({
  toc,
  title,
  children,
}: {
  toc: TOCItem[];
  title: string;
  children: React.ReactNode;
}) {
  return (
    <PageContext.Provider value={{ toc, title }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return useContext(PageContext);
}
