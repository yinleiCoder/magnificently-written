"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navigation from "./_components/Navigation";
import Spinner from "@/components/Spinner";
import SearchCommand from "@/components/SearchCommand";

// 笔记、编辑器的布局
function MainLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // 路由保护，也可以写个中间件做路由拦截
  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="h-full flex flex-row dark:bg-[#1F1F1F]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
