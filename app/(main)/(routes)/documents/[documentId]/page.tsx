"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import Toolbar from "@/components/Toolbar";
import Cover from "@/components/Cover";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import TooltipMessage from "@/components/TooltipMessage";
interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

// 笔记编辑页
function DocumentIdPage({ params }: DocumentIdPageProps) {
  const editorContent = useRef<string>("");
  const Editor = useMemo(
    () => dynamic(() => import("@/components/Editor"), { ssr: false }),
    []
  );

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });
  const update = useMutation(api.documents.update);

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
      </div>
    );
  }

  if (document === null) {
    return <div>没有发现该笔记的数据</div>;
  }

  const onChange = (content: string) => {
    editorContent.current = content;
  };

  const handleSave = () => {
    const promise = update({
      id: params.documentId,
      content: editorContent.current,
    });
    toast.promise(promise, {
      loading: "保存笔记中",
      success: "笔记保存成功！",
      error:
        "发布笔记失败，请重试或联系管理员查看Convex控制台，大概率是因为Convex的Free Plan下Database Bandwidth已抵达1GB，请购买Convex专业版",
    });
  };

  return (
    <div className="pb-40">
      {/* 笔记封面图 */}
      <Cover url={document.coverImage} />
      {/* 笔记编辑区域 */}
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        {/* Block note编辑器 */}
        <Editor
          editable={true}
          onChange={onChange}
          initialContent={document.content}
        />
        <Button
          className="fixed bottom-5 right-4 md:right-6 rounded-full text-muted-foreground text-xs px-3 py-2"
          variant="outline"
          onClick={handleSave}
        >
          <TooltipMessage message="保存笔记">
            <Save className="w-4 h-4" />
          </TooltipMessage>
        </Button>
      </div>
    </div>
  );
}

export default DocumentIdPage;
