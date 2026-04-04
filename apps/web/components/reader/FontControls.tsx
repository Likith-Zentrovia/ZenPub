"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useReaderStore } from "@/stores/reader-store";

export function FontControls() {
  const fontSize = useReaderStore((s) => s.fontSize);
  const setFontSize = useReaderStore((s) => s.setFontSize);

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setFontSize(fontSize - 10)}
              disabled={fontSize <= 100}
              aria-label="Decrease font size"
            >
              <Minus className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Decrease font size</TooltipContent>
        </Tooltip>

        <span className="w-8 text-center text-xs tabular-nums text-muted-foreground">
          {fontSize}%
        </span>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setFontSize(fontSize + 10)}
              disabled={fontSize >= 150}
              aria-label="Increase font size"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Increase font size</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
