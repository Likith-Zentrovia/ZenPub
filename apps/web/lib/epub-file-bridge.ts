/**
 * Module-level store for passing an EPUB file ArrayBuffer
 * from the landing page to the reader page across navigation.
 */
let pendingFile: ArrayBuffer | null = null;

export function setPendingFile(buffer: ArrayBuffer) {
  pendingFile = buffer;
}

export function consumePendingFile(): ArrayBuffer | null {
  const file = pendingFile;
  pendingFile = null;
  return file;
}
