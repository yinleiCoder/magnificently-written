"use client";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Forward, Home, Pencil, Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./themeToggle";

interface MouseContextMenuProps {
  children: React.ReactNode;
}

// 鼠标右键上下文菜单
function MouseContextMenu({ children }: MouseContextMenuProps) {
  const router = useRouter();
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => router.push("/")}
          className="flex items-center justify-between"
        >
          首页
          <Home className="text-muted-foreground w-4 h-4" />
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => router.push("/documents")}
          className="flex items-center justify-between"
        >
          笔记编辑器
          <Pencil className="text-muted-foreground w-4 h-4" />
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => router.forward()}
          className="flex items-center justify-between"
        >
          前进
          <Forward className="text-muted-foreground w-4 h-4" />
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => router.back()}
          className="flex items-center justify-between"
        >
          后退
          <Undo2 className="text-muted-foreground w-4 h-4" />
        </ContextMenuItem>
        <ContextMenuItem
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          className="flex items-center justify-between"
        >
          主题切换
          <ModeToggle />
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default MouseContextMenu;
