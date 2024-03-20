"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { api } from "@/convex/_generated/api";
import { useSearchStore } from "@/hooks/useSearch";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { File } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// command命令组件，类似microsoft powertoys的run组件
function SearchCommand() {
  const router = useRouter();
  const { user } = useUser();
  const documents = useQuery(api.documents.getSearch);

  const isOpen = useSearchStore((store) => store.isOpen);
  const toggle = useSearchStore((store) => store.toggle);
  const onClose = useSearchStore((store) => store.onClose);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // 处理nextjs对client component在server端的拟合问题
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  if (!isMounted) {
    return null;
  }

  const onSelect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`搜索${user?.fullName}写过的笔记`} />
      <CommandList>
        <CommandEmpty>在服务器上没有发现相关笔记数据</CommandEmpty>
        <CommandGroup heading="笔记">
          {documents?.map((document) => (
            <CommandItem
              key={document._id}
              value={`${document._id}-${document.title}`}
              title={document.title}
              onSelect={onSelect}
            >
              {document.icon ? (
                <p className="mr-2 text-[18px]">{document.icon}</p>
              ) : (
                <File className="mr-2 w-4 h-4" />
              )}
              <span>{document.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </CommandDialog>
  );
}

export default SearchCommand;
