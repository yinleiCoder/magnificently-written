"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useMutation, useQuery } from "convex/react";
import Toolbar from "@/components/Toolbar";
import Cover from "@/components/Cover";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
interface DocumentIdPreviewPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

// 笔记公开预览页-访客不可编辑
// 笔记的不公开已经交由convex后端进行处理，请查看documents.ts中的getById函数
function DocumentIdPreviewPage({ params }: DocumentIdPreviewPageProps) {
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
    update({
      id: params.documentId,
      content,
    });
  };

  return (
    <div className="dark:bg-[#1F1F1F]">
      {/* 笔记封面图 - 不可编辑 */}
      <Cover preview url={document.coverImage} />
      {/* 笔记预览区域 - 不可编辑*/}
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar preview initialData={document} />
        {/* Block note编辑器 - 不可编辑*/}
        <Editor
          editable={false}
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
    </div>
  );
}

export default DocumentIdPreviewPage;
