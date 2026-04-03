import type { ReaderTheme, ThemeConfig } from "@zenpub/shared-types";

export const THEME_CONFIGS: Record<ReaderTheme, ThemeConfig> = {
  light: { body: "#ffffff", text: "#1a1a1a", link: "#2563eb" },
  dark: { body: "#1a1a1a", text: "#e5e5e5", link: "#60a5fa" },
  sepia: { body: "#f4ecd8", text: "#5b4636", link: "#8b6914" },
};

export function applyTheme(rendition: any, theme: ReaderTheme): void {
  const config = THEME_CONFIGS[theme];

  rendition.themes.override("color", config.text);
  rendition.themes.override("background", config.body);
}
