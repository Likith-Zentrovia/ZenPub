"use client";

import { useEffect } from "react";
import { useReaderStore } from "@/stores/reader-store";
import { consumePendingFile } from "@/lib/epub-file-bridge";
import { FileUpload } from "@/components/reader/FileUpload";
import EpubRendererWrapper from "@/components/reader/EpubRendererWrapper";
import { ReaderToolbar } from "@/components/reader/ReaderToolbar";
import { TocPanel } from "@/components/reader/TocPanel";
import { ReadingProgress } from "@/components/reader/ReadingProgress";

export default function ReaderPage() {
  const bookInstance = useReaderStore((s) => s.bookInstance);
  const openBook = useReaderStore((s) => s.openBook);
  const goNext = useReaderStore((s) => s.goNext);
  const goPrev = useReaderStore((s) => s.goPrev);
  const toggleToc = useReaderStore((s) => s.toggleToc);
  const fontSize = useReaderStore((s) => s.fontSize);
  const setFontSize = useReaderStore((s) => s.setFontSize);

  // Check for pending file from landing page
  useEffect(() => {
    const pending = consumePendingFile();
    if (pending) {
      openBook(pending);
    }
  }, [openBook]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          goPrev();
          break;
        case "ArrowRight":
        case "ArrowDown":
        case " ":
          e.preventDefault();
          goNext();
          break;
        case "t":
          toggleToc();
          break;
        case "+":
        case "=":
          e.preventDefault();
          setFontSize(fontSize + 10);
          break;
        case "-":
          e.preventDefault();
          setFontSize(fontSize - 10);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, toggleToc, fontSize, setFontSize]);

  // No book loaded — show upload screen
  if (!bookInstance) {
    return <FileUpload />;
  }

  // Book loaded — show reader layout
  return (
    <div className="flex h-screen flex-col">
      {/* Toolbar */}
      <ReaderToolbar />

      {/* Main content area */}
      <main className="relative flex-1 overflow-hidden">
        <EpubRendererWrapper />
      </main>

      {/* Reading progress bar */}
      <ReadingProgress />

      {/* TOC sidebar (sheet) */}
      <TocPanel />
    </div>
  );
}
