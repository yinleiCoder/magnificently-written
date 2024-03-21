"use client";

import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function DocumentPage() {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "未命名" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );

    toast.promise(promise, {
      loading: "正在创建笔记...",
      success: "已新建笔记，尽情创作吧！",
      error: "创建笔记失败，请联系管理员查看Convex控制台",
    });
  };

  return (
    <div className="h-full flex flex-col justify-center items-center space-y-4">
      <Image
        src="/images/topPeekJ.avif"
        alt="empty document"
        height={200}
        width={200}
        className="filter-none dark:brightness-0 dark:invert select-none"
      />
      <h2 className="text-lg font-medium">
        欢迎&nbsp;<span className="font-bold">{user?.firstName}</span>
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="w-4 h-4 mr-2" />
        创建笔记
      </Button>
    </div>
  );
}

export default DocumentPage;
