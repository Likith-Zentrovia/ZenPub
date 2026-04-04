"use client";

import { useState, useCallback } from "react";
import { ReactReader } from "react-reader";
import { useReaderStore } from "@/stores/reader-store";
import { THEME_CONFIGS } from "@zenpub/epub-utils";

export default function EpubRenderer() {
  const bookInstance = useReaderStore((s) => s.bookInstance);
  const setRendition = useReaderStore((s) => s.setRendition);
  const updateLocation = useReaderStore((s) => s.updateLocation);
  const setLocationsReady = useReaderStore((s) => s.setLocationsReady);
  const theme = useReaderStore((s) => s.theme);
  const fontSize = useReaderStore((s) => s.fontSize);

  const [location, setLocation] = useState<string | number>(0);

  const handleLocationChanged = useCallback((loc: string) => {
    setLocation(loc);
  }, []);

  const handleGetRendition = useCallback(
    (rendition: any) => {
      // Monkey-patch next() to handle cover page navigation
      // Cover pages (spine index 0) are often single-page images where
      // rendition.next() fails silently — force-skip to next spine item
      const originalNext = rendition.next.bind(rendition);
      rendition.next = function () {
        try {
          const loc = rendition.currentLocation();
          if (loc?.start?.index === 0) {
            const displayed = loc.start?.displayed;
            // On last page of first section (cover) — jump to next section
            if (displayed && displayed.page >= displayed.total) {
              const nextItem = rendition.book.spine.get(1);
              if (nextItem) {
                return rendition.display(nextItem.href);
              }
            }
          }
        } catch {
          // Fall through to original next
        }
        return originalNext();
      };

      setRendition(rendition);

      // Apply theme
      const config = THEME_CONFIGS[theme];
      rendition.themes.override("color", config.text);
      rendition.themes.override("background", config.body);
      rendition.themes.fontSize(`${fontSize}%`);

      // Listen for relocations to track progress
      rendition.on("relocated", (location: any) => {
        updateLocation(location);
      });

      // Generate locations for page counting
      rendition.book.ready.then(() => {
        rendition.book.locations.generate(1024).then((locations: string[]) => {
          setLocationsReady(locations.length);
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setRendition, theme, fontSize]
  );

  if (!bookInstance) return null;

  return (
    <div className="h-full w-full" style={{ position: "relative" }}>
      <ReactReader
        url={bookInstance.arrayBuffer}
        location={location}
        locationChanged={handleLocationChanged}
        getRendition={handleGetRendition}
        showToc={false}
        epubOptions={{
          flow: "paginated",
          spread: "none",
        }}
      />
    </div>
  );
}
