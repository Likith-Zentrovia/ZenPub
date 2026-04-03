export type EpubMetadata = {
  title: string;
  author: string;
  publisher?: string;
  description?: string;
  language?: string;
  coverUrl?: string;
};

export type TocItem = {
  id: string;
  href: string;
  label: string;
  subitems?: TocItem[];
};

export type ReaderTheme = "light" | "dark" | "sepia";

export type ThemeConfig = {
  body: string;
  text: string;
  link: string;
};

export type ReaderSettings = {
  fontSize: number; // 80-150 (percentage)
  theme: ReaderTheme;
  fontFamily: string;
};

export type ReadingPosition = {
  cfi: string;
  percentage: number; // 0-1
  chapterIndex: number;
};
