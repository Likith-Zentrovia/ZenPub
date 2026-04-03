"use client";

import { useCallback, useState, useRef } from "react";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useReaderStore } from "@/stores/reader-store";
import { useToast } from "@/hooks/use-toast";

export function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const openBook = useReaderStore((s) => s.openBook);
  const isLoading = useReaderStore((s) => s.isLoading);
  const error = useReaderStore((s) => s.error);
  const { toast } = useToast();

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.toLowerCase().endsWith(".epub")) {
        toast({
          title: "Invalid file type",
          description: "Please select an EPUB file (.epub)",
          variant: "destructive",
        });
        return;
      }

      if (file.size > 100 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 100 MB.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        openBook(reader.result as ArrayBuffer);
      };
      reader.onerror = () => {
        toast({
          title: "Failed to read file",
          description: "There was an error reading your file. Please try again.",
          variant: "destructive",
        });
      };
      reader.readAsArrayBuffer(file);
    },
    [openBook, toast]
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
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <Card
          className={`cursor-pointer border-2 border-dashed transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50"
          }`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-4 p-10 md:p-16">
            {isLoading ? (
              <>
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
                <p className="text-sm text-muted-foreground">
                  Opening your book...
                </p>
              </>
            ) : error ? (
              <>
                <div className="rounded-full bg-destructive/10 p-4">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-destructive">
                    Failed to open EPUB
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{error}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Click to try another file
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-full bg-muted p-4">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="font-medium">Drag & Drop your EPUB here</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    or click to browse files
                  </p>
                </div>
                <Button size="lg" className="mt-2" type="button">
                  <FileText className="mr-2 h-4 w-4" />
                  Select File
                </Button>
              </>
            )}
          </div>
        </Card>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Your files stay on your device. Nothing is uploaded to our servers.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".epub"
          onChange={onFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}
