"use client";

import { BookOpen, X } from "lucide-react";
import type { Root, Node, Folder, Item } from "fumadocs-core/page-tree";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

function MobileNode({ node, depth = 0 }: { node: Node; depth?: number }) {
  if (node.type === "separator") return <div className="h-2" />;

  if (node.type === "folder") {
    return <MobileFolder folder={node} depth={depth} />;
  }

  const item = node as Item;
  const pathname = usePathname();
  const isActive = pathname === item.url;

  return (
    <Link
      href={item.url}
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
        isActive
          ? "bg-muted font-medium text-foreground"
          : "text-muted-foreground hover:bg-muted"
      )}
      style={{ paddingLeft: `${12 + depth * 16}px` }}
    >
      {item.name as string}
    </Link>
  );
}

function MobileFolder({
  folder,
  depth,
}: {
  folder: Folder;
  depth: number;
}) {
  const pathname = usePathname();
  const isActive =
    folder.index?.url === pathname ||
    folder.children.some(
      (c) => c.type === "page" && (c as Item).url === pathname
    );
  const [open, setOpen] = useState(folder.defaultOpen ?? isActive);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 px-3 py-2 text-sm font-semibold hover:bg-muted rounded-md transition-colors"
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        <ChevronDown
          className={cn(
            "size-3.5 shrink-0 transition-transform text-muted-foreground",
            open ? "rotate-0" : "-rotate-90"
          )}
        />
        {folder.name as string}
      </button>
      {open && (
        <div className="border-l border-border ml-[22px] pl-2">
          {folder.index && (
            <MobileNode node={folder.index} depth={0} />
          )}
          {folder.children.map((child, i) => (
            <MobileNode key={i} node={child} depth={0} />
          ))}
        </div>
      )}
    </div>
  );
}

export function SidebarMobile({
  open,
  onClose,
  tree,
}: {
  open: boolean;
  onClose: () => void;
  tree: Root;
}) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-background border-r shadow-lg transform transition-transform duration-200 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold"
            onClick={onClose}
          >
            <BookOpen className="size-4" />
            Auth Starter Kit
          </Link>
          <button onClick={onClose}>
            <X className="size-4" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-4 overflow-y-auto h-[calc(100vh-4rem)]">
          {tree.children.map((node, i) => (
            <MobileNode key={i} node={node} />
          ))}
        </nav>
      </aside>
    </>
  );
}
