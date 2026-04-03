"use client";

import { useCallback, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { setPendingFile } from "@/lib/epub-file-bridge";

export function Hero() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.toLowerCase().endsWith(".epub")) {
        return;
      }

      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = () => {
        setPendingFile(reader.result as ArrayBuffer);
        router.push("/reader");
      };
      reader.onerror = () => {
        setIsLoading(false);
      };
      reader.readAsArrayBuffer(file);
    },
    [router]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <section className="flex flex-col items-center px-4 pt-16 pb-20 md:pt-24 md:pb-28">
      <h1 className="text-4xl font-bold tracking-tight text-center md:text-5xl lg:text-6xl max-w-3xl">
        Read EPUB Files Online
      </h1>
      <p className="mt-4 text-lg text-muted-foreground text-center max-w-xl">
        Free, fast, and private. Drop your EPUB file below and start reading
        instantly in your browser.
      </p>

      <Card
        className={`mt-10 w-full max-w-xl cursor-pointer border-2 border-dashed transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50"
        }`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center gap-4 p-10 md:p-14">
          {isLoading ? (
            <>
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
              <p className="text-sm text-muted-foreground">
                Opening your book...
              </p>
            </>
          ) : (
            <>
              <div className="rounded-full bg-muted p-4">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="font-medium">
                  Drag & Drop your EPUB here
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  or click to browse files
                </p>
              </div>
              <Button size="lg" className="mt-2">
                <FileText className="mr-2 h-4 w-4" />
                Select File
              </Button>
            </>
          )}
        </div>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept=".epub"
        onChange={onFileSelect}
        className="hidden"
      />

      <p className="mt-4 text-xs text-muted-foreground">
        Your files stay on your device. Nothing is uploaded to our servers.
      </p>
    </section>
  );
}
