import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names with Tailwind CSS conflict resolution.
 *
 * Combines `clsx` for conditional classes with `twMerge` for deduplicating
 * conflicting Tailwind utilities (e.g., `px-2 px-4` → `px-4`).
 *
 * @param inputs - Class values to merge (strings, objects, arrays, conditionals)
 * @returns Merged class string
 *
 * @example
 * ```ts
 * cn("px-2 py-1", isActive && "bg-primary", className);
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
