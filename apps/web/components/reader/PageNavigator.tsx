"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReaderStore } from "@/stores/reader-store";

export function PageNavigator() {
  const goNext = useReaderStore((s) => s.goNext);
  const goPrev = useReaderStore((s) => s.goPrev);

  return (
    <>
      {/* Invisible tap zones on left/right edges */}
      <button
        onClick={goPrev}
        className="absolute left-0 top-0 z-10 h-full w-[15%] cursor-w-resize opacity-0 hover:opacity-100 transition-opacity"
        aria-label="Previous page"
      >
        <div className="flex h-full items-center justify-center">
          <div className="rounded-full bg-background/80 p-2 shadow-sm">
            <ChevronLeft className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </button>

      <button
        onClick={goNext}
        className="absolute right-0 top-0 z-10 h-full w-[15%] cursor-e-resize opacity-0 hover:opacity-100 transition-opacity"
        aria-label="Next page"
      >
        <div className="flex h-full items-center justify-center">
          <div className="rounded-full bg-background/80 p-2 shadow-sm">
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </button>
    </>
  );
}
