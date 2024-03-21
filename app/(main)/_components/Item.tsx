"use client";

import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/clerk-react";

interface ItemProps {
  id?: Id<"documents">;
  icon: LucideIcon;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  label: string;
  onExpand?: () => void;
  onClick?: () => void;
}

// 可无限层级嵌套的按钮,生成类似的树结构
function Item({
  id,
  icon: Icon,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  label,
  onExpand,
  onClick,
}: ItemProps) {
  const router = useRouter();
  const { user } = useUser();

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = create({ title: "未命名", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        router.push(`/documents/${documentId}`);
      }
    );

    toast.promise(promise, {
      loading: "正在创建子笔记...",
      success: "该笔记下的子笔记创建成功!",
      error: "创建子笔记失败，请重试或联系管理员查看convex控制台",
    });
  };

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archive({ id }).then((documentId) =>
      router.push(`/documents`)
    );
    toast.promise(promise, {
      loading: "正在删除该笔记及其下笔记...",
      success: "该笔记及其下笔记成功移动到垃圾桶!",
      error: "删除笔记失败，请重试或联系管理员查看convex控制台",
    });
  };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 10 + 10}px` : "10px" }}
      className={cn(
        "w-full group min-h-[27px] text-sm py-1 pr-[10px] hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      {/* 折叠按钮 */}
      {!!id && (
        <div
          role="button"
          className="h-full rounded hover:bg-neutral-200 mr-1 dark:hover:bg-neutral-600 transition"
          onClick={handleExpand}
        >
          <ChevronIcon className="w-4 h-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}

      {/* 普通按钮前的icon和文档用户自定义的icon */}
      {documentIcon ? (
        <div className="shrink-0 text-[18px] mr-2">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 w-[18px] h-[18px] mr-2 text-muted-foreground" />
      )}

      <span className="truncate">{label}</span>

      {/* 搜索按钮 */}
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 items-center select-none gap-1 rounded border bg-muted px-1.5 font-mono font-medium text-muted-foreground opacity-100">
          <span className="text-xs">Ctrl</span>K
        </kbd>
      )}

      {/* 创建、软删除子笔记 */}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={onArchive}>
                <Trash2 className="w-4 h-4 mr-2" />
                删除
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-xs text-muted-foreground">
                最近编辑: {user?.fullName}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role="button"
            onClick={onCreate}
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-200 dark:hover:bg-neutral-600"
          >
            <Plus className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}

// 骨架占位
Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 10 + 24}px` : "10px" }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="w-4 h-4" />
      <Skeleton className="w-[30%] h-4" />
    </div>
  );
};

export default Item;
