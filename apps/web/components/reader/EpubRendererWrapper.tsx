import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const EpubRenderer = dynamic(() => import("./EpubRenderer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="space-y-4 w-full max-w-md px-8">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  ),
});

export default EpubRenderer;
