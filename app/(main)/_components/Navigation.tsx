"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Navigation() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = event.clientX;
    if (newWidth < 224) {
      newWidth = 224;
    }
    if (newWidth > 480) {
      newWidth = 480;
    }

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100%-${newWidth}px)`);
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "224px";
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "224px");
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0px" : "calc(100%-224px)"
      );

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = `0px`;
      navbarRef.current.style.setProperty("left", "0");
      navbarRef.current.style.setProperty("width", "100%");

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "w-56 group/sidebar h-full bg-[#fbfbfa] overflow-y-auto relative flex flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div>
          <p>搜索</p>
          <p>收信箱</p>
          <p>设置 & 成员</p>
          <p>创建新页面</p>
        </div>
        <div className="mt-4">
          <p>Untitled</p>
          <p>Personal Home</p>
          <p>Task List</p>
          <p>Journal</p>
          <p>Reading List</p>
          <p>Add a Page</p>
        </div>
        {/* 左右分割线 */}
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="w-[1px] group-hover/sidebar:w-[2px] cursor-ew-resize transition absolute h-full bg-primary/10 right-0 top-0 bottom-0"
        />
        {/* 折叠箭头 */}
        <div
          onClick={collapse}
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-600 absolute top-2 right-4 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
          role="button"
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
      </aside>
      {/* 顶部工具栏 */}
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-56 w-[calc(100%-224px)] border border-b",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              role="button"
              className="w-6 h-6 text-muted-foreground"
            />
          )}
        </nav>
      </div>
    </>
  );
}

export default Navigation;
