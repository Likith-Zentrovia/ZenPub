"use client";

import { useReaderStore } from "@/stores/reader-store";
import type { ReaderTheme } from "@zenpub/shared-types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const themes: { id: ReaderTheme; label: string; bg: string; border: string }[] = [
  { id: "light", label: "Light", bg: "bg-white", border: "border-gray-300" },
  { id: "dark", label: "Dark", bg: "bg-zinc-900", border: "border-zinc-700" },
  { id: "sepia", label: "Sepia", bg: "bg-[#f4ecd8]", border: "border-[#d4c4a0]" },
];

export function ThemeSwitcher() {
  const currentTheme = useReaderStore((s) => s.theme);
  const setTheme = useReaderStore((s) => s.setTheme);

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        {themes.map((t) => (
          <Tooltip key={t.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setTheme(t.id)}
                className={`h-6 w-6 rounded-full border-2 transition-all ${t.bg} ${
                  currentTheme === t.id
                    ? "ring-2 ring-primary ring-offset-1 " + t.border
                    : t.border + " hover:scale-110"
                }`}
                aria-label={`${t.label} theme`}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{t.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
