"use client";

import { Menu, ChevronLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { FontControls } from "./FontControls";
import { useReaderStore } from "@/stores/reader-store";

export function ReaderToolbar() {
  const metadata = useReaderStore((s) => s.metadata);
  const toggleToc = useReaderStore((s) => s.toggleToc);

  return (
    <div className="flex h-12 items-center gap-2 border-b bg-background px-3">
      {/* Back to home */}
      <Link href="/">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back to home</span>
        </Button>
      </Link>

      {/* TOC toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={toggleToc}
        aria-label="Toggle table of contents"
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Book title + author */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <BookOpen className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
          <span className="truncate text-sm font-medium">
            {metadata?.title || "ZenPub Reader"}
          </span>
          {metadata?.author && (
            <span className="hidden sm:inline truncate text-xs text-muted-foreground">
              by {metadata.author}
            </span>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="hidden items-center gap-1 sm:flex">
        <ThemeSwitcher />
        <div className="mx-1 h-5 w-px bg-border" />
        <FontControls />
      </div>

      {/* Mobile: just theme switcher */}
      <div className="flex items-center gap-1 sm:hidden">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
