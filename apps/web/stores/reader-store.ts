import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ReaderTheme, TocItem, EpubMetadata } from "@zenpub/shared-types";
import {
  createBookInstance,
  applyTheme,
  applyFontSize,
  type BookInstance,
} from "@zenpub/epub-utils";

interface ReaderState {
  // Book state
  bookInstance: BookInstance | null;
  rendition: any | null;
  metadata: EpubMetadata | null;
  isLoading: boolean;
  error: string | null;

  // Navigation
  toc: TocItem[];
  currentLocation: string | null;
  currentChapterIndex: number;
  currentChapterLabel: string;
  sectionPage: number;
  sectionTotalPages: number;
  currentPageOverall: number;
  totalPagesOverall: number;
  currentPercentage: number;
  locationsReady: boolean;

  // Settings (persisted)
  theme: ReaderTheme;
  fontSize: number;

  // UI
  isTocOpen: boolean;

  // Actions
  openBook: (arrayBuffer: ArrayBuffer) => void;
  setRendition: (rendition: any) => void;
  goNext: () => void;
  goPrev: () => void;
  goToChapter: (href: string) => void;
  setTheme: (theme: ReaderTheme) => void;
  setFontSize: (size: number) => void;
  toggleToc: () => void;
  setTocOpen: (open: boolean) => void;
  updateLocation: (location: any) => void;
  setLocationsReady: (total: number) => void;
  cleanup: () => void;
}

export const useReaderStore = create<ReaderState>()(
  persist(
    (set, get) => ({
      // Book state
      bookInstance: null,
      rendition: null,
      metadata: null,
      isLoading: false,
      error: null,

      // Navigation
      toc: [],
      currentLocation: null,
      currentChapterIndex: 0,
      currentChapterLabel: "",
      sectionPage: 0,
      sectionTotalPages: 0,
      currentPageOverall: 0,
      totalPagesOverall: 0,
      currentPercentage: 0,
      locationsReady: false,

      // Settings
      theme: "light",
      fontSize: 100,

      // UI
      isTocOpen: false,

      // Actions
      openBook: (arrayBuffer: ArrayBuffer) => {
        const { cleanup } = get();
        cleanup();

        try {
          const bookInstance = createBookInstance(arrayBuffer);
          set({
            bookInstance,
            metadata: null,
            toc: [],
            isLoading: false,
            error: null,
          });
        } catch (err) {
          set({
            isLoading: false,
            error:
              err instanceof Error
                ? err.message
                : "Failed to open EPUB file. Please check the file is valid.",
          });
        }
      },

      setRendition: (rendition: any) => {
        const { theme, fontSize, bookInstance } = get();
        applyTheme(rendition, theme);
        applyFontSize(rendition, fontSize);

        // Extract metadata and TOC from the rendition's book
        if (bookInstance) {
          bookInstance.setMetadataFromRendition(rendition);
          set({
            rendition,
            metadata: bookInstance.metadata,
            toc: bookInstance.toc,
          });
        } else {
          set({ rendition });
        }
      },

      goNext: () => {
        const { rendition } = get();
        rendition?.next();
      },

      goPrev: () => {
        const { rendition } = get();
        rendition?.prev();
      },

      goToChapter: (href: string) => {
        const { rendition } = get();
        rendition?.display(href);
      },

      setTheme: (theme: ReaderTheme) => {
        const { rendition } = get();
        if (rendition) {
          applyTheme(rendition, theme);
        }
        set({ theme });
      },

      setFontSize: (size: number) => {
        const clamped = Math.min(150, Math.max(80, size));
        const { rendition } = get();
        if (rendition) {
          applyFontSize(rendition, clamped);
          // Switch to scrolled mode when zoomed so excess content is
          // scrollable instead of spilling into the next page
          try {
            if (clamped > 100) {
              rendition.flow("scrolled-doc");
            } else {
              rendition.flow("paginated");
            }
          } catch {
            // Ignore if flow switching not supported
          }
        }
        set({ fontSize: clamped });
      },

      toggleToc: () => set((s) => ({ isTocOpen: !s.isTocOpen })),
      setTocOpen: (open: boolean) => set({ isTocOpen: open }),

      updateLocation: (location: any) => {
        if (!location || !location.start) return;

        const percentage = location.start.percentage ?? 0;
        const cfi = location.start.cfi ?? null;
        const index = location.start.index ?? 0;
        const displayed = location.start.displayed;
        const currentPage = displayed?.page ?? 0;
        const totalPages = displayed?.total ?? 0;

        // Try to find the current chapter label from TOC
        const { toc } = get();
        let chapterLabel = "";
        if (location.start.href) {
          const findLabel = (items: TocItem[]): string => {
            for (const item of items) {
              if (
                location.start.href.includes(item.href) ||
                item.href.includes(location.start.href)
              ) {
                return item.label;
              }
              if (item.subitems) {
                const sub = findLabel(item.subitems);
                if (sub) return sub;
              }
            }
            return "";
          };
          chapterLabel = findLabel(toc);
        }

        // Compute overall page from locations
        const { totalPagesOverall, rendition: rend } = get();
        let currentPageOverall = 0;
        if (rend?.book?.locations?.length() && cfi) {
          const locIndex = rend.book.locations.locationFromCfi(cfi);
          const totalLocs = rend.book.locations.length();
          if (totalLocs > 0 && totalPagesOverall > 0) {
            currentPageOverall = Math.round(
              (locIndex / totalLocs) * totalPagesOverall
            );
          }
        }

        set({
          currentLocation: cfi,
          currentPercentage: percentage,
          currentChapterIndex: index,
          currentChapterLabel: chapterLabel,
          sectionPage: currentPage,
          sectionTotalPages: totalPages,
          currentPageOverall: Math.max(1, currentPageOverall),
        });
      },

      setLocationsReady: (total: number) => {
        set({ locationsReady: true, totalPagesOverall: total });
      },

      cleanup: () => {
        const { bookInstance, rendition } = get();
        if (rendition) {
          try {
            rendition.destroy();
          } catch {
            // ignore cleanup errors
          }
        }
        if (bookInstance) {
          try {
            bookInstance.destroy();
          } catch {
            // ignore cleanup errors
          }
        }
        set({
          bookInstance: null,
          rendition: null,
          metadata: null,
          toc: [],
          currentLocation: null,
          currentChapterIndex: 0,
          currentChapterLabel: "",
          sectionPage: 0,
          sectionTotalPages: 0,
          currentPageOverall: 0,
          totalPagesOverall: 0,
          currentPercentage: 0,
          locationsReady: false,
          error: null,
        });
      },
    }),
    {
      name: "zenpub-reader-settings",
      partialize: (state) => ({
        theme: state.theme,
        fontSize: state.fontSize,
      }),
    }
  )
);
