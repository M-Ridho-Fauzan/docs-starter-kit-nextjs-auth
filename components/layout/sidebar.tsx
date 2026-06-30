"use client";

import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import type { Root, Node, Folder, Item } from "fumadocs-core/page-tree";
import { cn } from "@/lib/utils";

function SidebarNode({ node, depth = 0 }: { node: Node; depth?: number }) {
  if (node.type === "separator") return <div className="h-2" />;

  if (node.type === "folder") {
    return <SidebarFolder folder={node} depth={depth} />;
  }

  const item = node as Item;
  return <SidebarItem item={item} depth={depth} />;
}

function SidebarFolder({ folder, depth }: { folder: Folder; depth: number }) {
  const pathname = usePathname();
  const isActive =
    folder.index?.url === pathname ||
    folder.children.some(
      (c) => c.type === "page" && (c as Item).url === pathname,
    );
  const [open, setOpen] = useState(folder.defaultOpen ?? isActive);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm font-semibold transition-colors rounded-md",
          "hover:bg-muted",
          isActive ? "text-foreground" : "text-foreground",
        )}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        <ChevronDown
          className={cn(
            "size-3.5 shrink-0 transition-transform text-muted-foreground",
            open ? "rotate-0" : "-rotate-90",
          )}
        />
        {folder.name as string}
      </button>
      {open && (
        <div className="border-l border-border ml-[22px] pl-2">
          {folder.index && <SidebarItem item={folder.index} depth={0} />}
          {folder.children.map((child, i) => (
            <SidebarNode key={i} node={child} depth={0} />
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarItem({ item, depth }: { item: Item; depth: number }) {
  const pathname = usePathname();
  const isActive = pathname === item.url;

  if (item.external) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center my-1 gap-2 px-3 py-1.5 text-sm transition-colors rounded-md",
          "hover:bg-muted my-1 text-muted-foreground",
        )}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        {item.name as string}
      </a>
    );
  }

  return (
    <Link
      href={item.url}
      className={cn(
        "flex items-center gap-2 px-3 my-1 py-1.5 text-sm transition-colors rounded-md",
        isActive
          ? "bg-muted font-medium text-foreground"
          : "text-muted-foreground my-1 hover:bg-muted",
      )}
      style={{ paddingLeft: `${12 + depth * 16}px` }}
    >
      {item.name as string}
    </Link>
  );
}

export function Sidebar({ tree }: { tree: Root }) {
  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r bg-background hidden md:block">
      <nav className="flex flex-col gap-1 p-4">
        {tree.children.map((node, i) => (
          <SidebarNode key={i} node={node} depth={0} />
        ))}
      </nav>
    </aside>
  );
}
