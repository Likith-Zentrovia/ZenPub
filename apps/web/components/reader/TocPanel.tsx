"use client";

import { BookOpen } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useReaderStore } from "@/stores/reader-store";
import type { TocItem } from "@zenpub/shared-types";
import { FontControls } from "./FontControls";
import { ThemeSwitcher } from "./ThemeSwitcher";

function TocEntry({
  item,
  depth,
  activeHref,
  onSelect,
}: {
  item: TocItem;
  depth: number;
  activeHref: string;
  onSelect: (href: string) => void;
}) {
  const isActive =
    activeHref &&
    (activeHref.includes(item.href) || item.href.includes(activeHref));

  return (
    <>
      <button
        onClick={() => onSelect(item.href)}
        className={`w-full truncate rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
          isActive
            ? "bg-primary/10 text-primary font-medium"
            : "text-foreground/80 hover:bg-accent"
        }`}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        {item.label}
      </button>
      {item.subitems?.map((sub) => (
        <TocEntry
          key={sub.id}
          item={sub}
          depth={depth + 1}
          activeHref={activeHref}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}

export function TocPanel() {
  const isTocOpen = useReaderStore((s) => s.isTocOpen);
  const setTocOpen = useReaderStore((s) => s.setTocOpen);
  const toc = useReaderStore((s) => s.toc);
  const goToChapter = useReaderStore((s) => s.goToChapter);
  const metadata = useReaderStore((s) => s.metadata);
  const currentPercentage = useReaderStore((s) => s.currentPercentage);
  const currentChapterLabel = useReaderStore((s) => s.currentChapterLabel);

  // Get current href for active highlighting
  const currentLocation = useReaderStore((s) => s.currentLocation);
  const activeHref = currentChapterLabel || "";

  const handleSelect = (href: string) => {
    goToChapter(href);
    setTocOpen(false);
  };

  const progress = Math.round(currentPercentage * 100);

  return (
    <Sheet open={isTocOpen} onOpenChange={setTocOpen}>
      <SheetContent side="left" className="w-80 flex flex-col overflow-hidden p-0">
        {/* Book info header */}
        <SheetHeader className="border-b px-4 py-4">
          <div className="flex items-start gap-3">
            <div className="rounded-md bg-muted p-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <SheetTitle className="text-sm leading-tight truncate">
                {metadata?.title || "Untitled"}
              </SheetTitle>
              {metadata?.author && (
                <p className="mt-0.5 text-xs text-muted-foreground truncate">
                  {metadata.author}
                </p>
              )}
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary/60 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-[10px] tabular-nums text-muted-foreground">
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        </SheetHeader>

        {/* Chapter list */}
        <div className="flex-1 overflow-y-auto py-1">
          {toc.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BookOpen className="h-8 w-8 text-muted-foreground/40" />
              <p className="mt-3 text-sm text-muted-foreground">
                No table of contents available
              </p>
              <p className="mt-1 text-xs text-muted-foreground/60">
                This book doesn&apos;t include a navigation index
              </p>
            </div>
          ) : (
            toc.map((item) => (
              <TocEntry
                key={item.id}
                item={item}
                depth={0}
                activeHref={activeHref}
                onSelect={handleSelect}
              />
            ))
          )}
        </div>

        {/* Bottom controls (mobile) */}
        <div className="border-t px-4 py-3 sm:hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                Theme
              </p>
              <ThemeSwitcher />
            </div>
            <div>
              <p className="mb-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                Font Size
              </p>
              <FontControls />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
