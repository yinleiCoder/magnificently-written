"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps {
  documentId: Id<"documents">;
}

function Banner({ documentId }: BannerProps) {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "正在恢复该笔记",
      success: "该笔记及其下笔记已成功恢复！",
      error: "恢复笔记失败，请重试或联系管理员查看Convex控制台",
    });
  };

  const onRemove = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "正在永久移除该笔记",
      success: "该笔记已从数据库中永久移除，且不可恢复！",
      error: "永久移除笔记失败，请重试或联系管理员查看Convex控制台",
    });

    router.push("/documents");
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>这篇笔记在垃圾桶</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto"
      >
        恢复笔记
      </Button>
      <Button
        size="sm"
        onClick={onRemove}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto"
      >
        永久删除笔记
      </Button>
    </div>
  );
}

export default Banner;
