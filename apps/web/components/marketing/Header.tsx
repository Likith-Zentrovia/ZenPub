import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <span className="text-xl font-bold">ZenPub</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/reader"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Open Reader
          </Link>
        </nav>
      </div>
    </header>
  );
}
