"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useMutation, useQuery } from "convex/react";
import Toolbar from "@/components/Toolbar";
import Cover from "@/components/Cover";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

// 笔记编辑页
function DocumentIdPage({ params }: DocumentIdPageProps) {
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
      </div>
    </div>
  );
}

export default DocumentIdPage;
