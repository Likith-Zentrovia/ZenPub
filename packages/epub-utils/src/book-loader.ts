import type { EpubMetadata, TocItem } from "@zenpub/shared-types";

export interface BookInstance {
  metadata: EpubMetadata | null;
  toc: TocItem[];
  /** ArrayBuffer of the EPUB file */
  arrayBuffer: ArrayBuffer;
  setMetadataFromRendition: (rendition: any) => void;
  destroy: () => void;
}

export function flattenToc(navItems: any[]): TocItem[] {
  return navItems.map((item) => ({
    id: item.id,
    href: item.href,
    label: item.label.trim(),
    subitems: item.subitems?.length ? flattenToc(item.subitems) : undefined,
  }));
}

/**
 * Creates a BookInstance from an ArrayBuffer.
 * Metadata and TOC are extracted later from the rendition's book
 * to avoid double-parsing the EPUB.
 */
export function createBookInstance(arrayBuffer: ArrayBuffer): BookInstance {
  const instance: BookInstance = {
    metadata: null,
    toc: [],
    arrayBuffer,
    setMetadataFromRendition(rendition: any) {
      const book = rendition.book;
      if (book) {
        const meta = book.packaging?.metadata;
        if (meta) {
          instance.metadata = {
            title: meta.title || "Untitled",
            author: meta.creator || "Unknown Author",
            publisher: meta.publisher || undefined,
            description: meta.description || undefined,
            language: meta.language || undefined,
          };
        }
        const nav = book.navigation;
        if (nav?.toc) {
          instance.toc = flattenToc(nav.toc);
        }
      }
    },
    destroy() {
      // react-reader manages the book lifecycle
    },
  };

  return instance;
}
