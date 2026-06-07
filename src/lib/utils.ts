import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseImageUrls(value?: string | null): string[] {
  if (!value) return [];
  const str = value.trim();
  try {
    if (str.startsWith("[") && str.endsWith("]")) {
      const parsed = JSON.parse(str);
      if (Array.isArray(parsed)) {
        return parsed.filter((item) => typeof item === "string" && item.length > 0);
      }
    }
  } catch {
    // Fallback if JSON parsing fails
  }
  return str.split(",").map((s) => s.trim()).filter(Boolean);
}

export function serializeImageUrls(urls: string[]): string {
  return JSON.stringify(urls);
}

