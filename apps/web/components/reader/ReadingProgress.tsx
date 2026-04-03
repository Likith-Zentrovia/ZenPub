"use client";

import { useReaderStore } from "@/stores/reader-store";

export function ReadingProgress() {
  const percentage = useReaderStore((s) => s.currentPercentage);
  const sectionPage = useReaderStore((s) => s.sectionPage);
  const sectionTotalPages = useReaderStore((s) => s.sectionTotalPages);
  const currentPageOverall = useReaderStore((s) => s.currentPageOverall);
  const totalPagesOverall = useReaderStore((s) => s.totalPagesOverall);
  const chapterLabel = useReaderStore((s) => s.currentChapterLabel);
  const locationsReady = useReaderStore((s) => s.locationsReady);
  const progress = Math.round(percentage * 100);

  return (
    <div className="border-t bg-muted/30">
      {/* Progress bar */}
      <div className="h-1 w-full bg-muted">
        <div
          className="h-full bg-primary/70 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Info row */}
      <div className="flex items-center justify-between px-4 py-1.5">
        {/* Left: chapter name + section pages */}
        <div className="flex items-center gap-2 min-w-0 max-w-[50%]">
          {chapterLabel && (
            <span className="text-xs text-muted-foreground truncate">
              {chapterLabel}
            </span>
          )}
          {sectionTotalPages > 0 && (
            <>
              {chapterLabel && (
                <span className="text-muted-foreground/40">|</span>
              )}
              <span className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
                {sectionPage}/{sectionTotalPages} in section
              </span>
            </>
          )}
        </div>

        {/* Right: overall pages + percentage */}
        <div className="flex items-center gap-3 text-xs">
          {locationsReady && totalPagesOverall > 0 && (
            <span className="text-muted-foreground tabular-nums whitespace-nowrap">
              Page {currentPageOverall} of {totalPagesOverall}
            </span>
          )}
          {!locationsReady && (
            <span className="text-muted-foreground/50 text-[10px]">
              Calculating pages...
            </span>
          )}
          <span className="tabular-nums font-medium text-foreground/70 whitespace-nowrap">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
