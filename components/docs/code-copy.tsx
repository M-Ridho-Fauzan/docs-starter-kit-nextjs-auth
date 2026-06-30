"use client";

import { useEffect, useRef, useState } from "react";

const COPY_ICON = `<svg class="size-3.5 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
const CHECK_ICON = `<svg class="size-3.5 text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;

export function CodeCopy() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const id = useRef(0);

  useEffect(() => {
    const pres = document.querySelectorAll<HTMLPreElement>("article.prose pre");
    const buttons: HTMLButtonElement[] = [];

    for (const pre of pres) {
      if (pre.dataset.copyInjected) continue;
      pre.dataset.copyInjected = "true";
      pre.classList.add("group");
      pre.style.position = "relative";

      const btnId = `copy-${++id.current}`;
      const btn = document.createElement("button");
      btn.dataset.copyBtn = btnId;
      btn.className =
        "absolute top-3 right-3 z-10 size-7 flex items-center justify-center rounded-md border bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 dark:hover:bg-muted hover:bg-muted transition-opacity";
      btn.setAttribute("aria-label", "Copy code");
      btn.innerHTML = COPY_ICON;

      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const code = pre.querySelector("code");
        if (!code) return;
        try {
          await navigator.clipboard.writeText(code.textContent ?? "");
          btn.innerHTML = CHECK_ICON;
          setCopiedId(btnId);
          setTimeout(() => {
            btn.innerHTML = COPY_ICON;
            setCopiedId((prev) => (prev === btnId ? null : prev));
          }, 2000);
        } catch {
          // fallback
        }
      });

      pre.appendChild(btn);
      buttons.push(btn);
    }

    return () => {
      for (const btn of buttons) {
        const pre = btn.closest("pre");
        if (pre) {
          pre.dataset.copyInjected = "";
          pre.classList.remove("group");
          pre.style.position = "";
        }
        btn.remove();
      }
    };
  }, []);

  return null;
}
