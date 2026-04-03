"use client";

import { AdSlot } from "./AdSlot";
import { ADSENSE_BANNER_SLOT } from "@/lib/adsense-config";

export function BannerAd() {
  return (
    <>
      {/* Desktop: 728x90 */}
      <div className="hidden md:flex justify-center">
        <AdSlot
          slotId={ADSENSE_BANNER_SLOT}
          width={728}
          height={90}
        />
      </div>

      {/* Mobile: 320x50 */}
      <div className="flex justify-center md:hidden">
        <AdSlot
          slotId={ADSENSE_BANNER_SLOT}
          width={320}
          height={50}
        />
      </div>
    </>
  );
}
