"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import Title from "./Title";
import Banner from "./Banner";
import Publish from "./Publish";
import TooltipMessage from "@/components/TooltipMessage";

interface NavbarProps {
  isCollasped: boolean;
  onResetWidth: () => void;
}

function Navbar({ isCollasped, onResetWidth }: NavbarProps) {
  const params = useParams();

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <nav className="w-full bg-background dark:bg-[#1F1F1F] px-3 py-2 flex items-center">
        <Title.Skeleton />
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className="w-full bg-background dark:bg-[#1F1F1F] px-3 py-2 flex items-center gap-x-4">
        {isCollasped && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="w-6 h-6 text-muted-foreground"
          />
        )}
        <div className="w-full flex items-center justify-between">
          <TooltipMessage message="点击重命名此笔记">
            <Title initialData={document} />
          </TooltipMessage>
          <div className="flex items-center gap-x-2">
            <TooltipMessage message="默认创建的笔记都是私密的，由笔记创建者自行决定是否公开发布">
              <Publish initialData={document} />
            </TooltipMessage>
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
}

export default Navbar;
