"use client";

import { useState } from "react";
import type { Root } from "fumadocs-core/page-tree";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { SidebarMobile } from "@/components/layout/sidebar-mobile";
import { TOC } from "@/components/layout/toc";
import { Footer } from "@/components/layout/footer";

export function DocsLayout({
  tree,
  children,
}: {
  tree: Root;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen" suppressHydrationWarning>
      <Navbar onMenuClick={() => setMobileOpen(true)} />
      <SidebarMobile
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        tree={tree}
      />
      <div className="flex flex-1 mx-auto w-full max-w-[90rem]">
        <Sidebar tree={tree} />
        <main className="flex-1 min-w-0 px-4 py-12 lg:px-8 max-w-4xl">
          {children}
        </main>
        <TOC />
      </div>
      <Footer />
    </div>
  );
}
