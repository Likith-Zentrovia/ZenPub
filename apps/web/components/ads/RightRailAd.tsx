"use client";

import { AdSlot } from "./AdSlot";
import { ADSENSE_RAIL_SLOT } from "@/lib/adsense-config";

export function RightRailAd() {
  return (
    <div className="hidden xl:block">
      <AdSlot
        slotId={ADSENSE_RAIL_SLOT}
        width={160}
        height={600}
      />
    </div>
  );
}
