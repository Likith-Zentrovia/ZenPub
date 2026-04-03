"use client";

import { AdSlot } from "./AdSlot";
import { ADSENSE_SIDEBAR_SLOT } from "@/lib/adsense-config";

export function SidebarAd() {
  return (
    <div className="hidden xl:block">
      <AdSlot
        slotId={ADSENSE_SIDEBAR_SLOT}
        width={300}
        height={250}
      />
    </div>
  );
}
