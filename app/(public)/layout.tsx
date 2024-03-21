import React from "react";

// 预览笔记的布局
function PublishLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-full dark:bg-[#1F1F1F]">{children}</div>;
}

export default PublishLayout;
