"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_PUB_ID } from "@/lib/adsense-config";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSlotProps {
  slotId: string;
  format?: string;
  width: number;
  height: number;
  className?: string;
}

export function AdSlot({ slotId, format = "auto", width, height, className }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const loaded = useRef(false);
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    if (isDev || !ADSENSE_PUB_ID || !slotId || loaded.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      loaded.current = true;
    } catch {
      // AdSense not loaded yet
    }
  }, [isDev, slotId]);

  // Dev placeholder
  if (isDev || !ADSENSE_PUB_ID) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded ${className}`}
        style={{ width, height, minHeight: height }}
      >
        <div className="text-center">
          <p className="text-xs text-muted-foreground">AD</p>
          <p className="text-[10px] text-muted-foreground">
            {width}x{height}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ minWidth: width, minHeight: height }}
    >
      <p className="text-[10px] text-muted-foreground mb-0.5">Sponsored</p>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "inline-block", width, height }}
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
