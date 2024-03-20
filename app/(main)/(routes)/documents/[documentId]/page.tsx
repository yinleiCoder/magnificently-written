"use client";

import Toolbar from "@/components/Toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

// 笔记编辑页
function DocumentIdPage({ params }: DocumentIdPageProps) {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return <div>loading..</div>;
  }

  if (document === null) {
    return <div>没有发现该笔记的数据</div>;
  }

  return (
    <div className="pb-40">
      {/* 笔记封面图 */}
      <div className="h-[35vh] bg-red-300" />
      {/* 笔记编辑区域 */}
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
      </div>
    </div>
  );
}

export default DocumentIdPage;
