import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold">ZenPub</span>
          </div>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Free, browser-based EPUB reader. Your files stay on your device — we
            never upload or store them.
          </p>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ZenPub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
