export function applyFontSize(rendition: any, sizePercent: number): void {
  rendition.themes.fontSize(`${sizePercent}%`);
}
