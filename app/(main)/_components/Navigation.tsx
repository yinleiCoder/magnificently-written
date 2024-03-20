"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import { useMutation } from "convex/react";
import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash2,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import UserItem from "./UserItem";
import Item from "./Item";
import DocumentList from "./DocumentList";
import TrashBox from "./TrashBox";
import { useSearchStore } from "@/hooks/useSearch";
import { useSettingsStore } from "@/hooks/useSettings";

function Navigation() {
  const searchStore = useSearchStore();
  const settingsStore = useSettingsStore();

  const isMobile = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();

  const create = useMutation(api.documents.create);

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

  const handleCreate = () => {
    const promise = create({ title: "未命名" });

    toast.promise(promise, {
      loading: "正在创建笔记中...",
      success: "新建笔记成功，尽情创作吧！",
      error: "创建笔记失败，请联系管理员查看Convex控制台",
    });
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "w-56 group/sidebar h-full bg-[#fbfbfa] dark:bg-[#1F1F1F] overflow-y-auto relative flex flex-col z-[99999] p-1",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div>
          <UserItem />
          <Item
            label="搜索"
            icon={Search}
            isSearch
            onClick={searchStore.onOpen}
          />
          <Item label="设置" icon={Settings} onClick={settingsStore.onOpen} />
          <Item onClick={handleCreate} label="创建笔记" icon={PlusCircle} />
        </div>
        <div className="mt-4">
          <DocumentList />
          <Item onClick={handleCreate} icon={Plus} label="添加新笔记" />
        </div>
        <div className="mt-4">
          <Popover>
            <PopoverTrigger className="w-full">
              <Item label="垃圾桶" icon={Trash2} />
            </PopoverTrigger>
            <PopoverContent
              side={isMobile ? "bottom" : "right"}
              className="w-72 p-0"
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
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
            "h-6 w-6 text-muted-foreground rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-600 absolute top-3 right-4 p-1 opacity-0 group-hover/sidebar:opacity-100 transition flex items-center justify-center",
            isMobile && "opacity-100"
          )}
          role="button"
        >
          <ChevronsLeft className="h-5 w-5" />
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
