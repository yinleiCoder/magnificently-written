"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { Hand, ImageIcon } from "lucide-react";
import { useCoverImageStore } from "@/hooks/useCoverImage";
import { Skeleton } from "./ui/skeleton";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

function Cover({ url, preview }: CoverImageProps) {
  const coverImageStore = useCoverImageStore();

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && (
        <Image src={url} alt={url} fill className="object-cover" priority />
      )}
      {url && !preview && (
        <div className="opacity-0 transition absolute top-[25%] right-[20%] flex items-center group-hover:opacity-100">
          <Button
            onClick={() => coverImageStore.onReplace(url)}
            variant="outline"
            className="text-muted-foreground text-xs rounded-tr-none rounded-br-none"
            size="sm"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            更换笔记封面
          </Button>
          <Button
            onClick={() => {}}
            variant="outline"
            className="text-muted-foreground text-xs rounded-tl-none rounded-bl-none"
            size="sm"
          >
            <Hand className="w-4 h-4 mr-2" />
            调整图片位置
          </Button>
        </div>
      )}
    </div>
  );
}

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};

export default Cover;
