"use client";

import { useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/useOrigin";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, Copy, Globe, Globe2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PublishProps {
  initialData: Doc<"documents">;
}

// 发布笔记
function Publish({ initialData }: PublishProps) {
  const origin = useOrigin();
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = useMutation(api.documents.update);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "发布笔记中...",
      success: "发布笔记成功！您的笔记现在已经可以公开访问",
      error: "发布笔记失败，请重试或联系管理员查看Convex控制台",
    });
  };

  const onUnPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "私密笔记中...",
      success: "私密笔记成功！您的笔记现在只能由笔记持有人访问笔记数据",
      error: "私密笔记失败，请重试或联系管理员查看Convex控制台",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          发布笔记
          {initialData.isPublished && (
            <Globe className="text-sky-500 w-4 h-4 ml-2" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <div className="border border-sky-500 border-opacity-50 animate-bounce w-4 h-4 rounded-full relative after:block after:absolute after:w-2 after:h-2 after:bg-sky-500 after:left-[50%] after:top-[50%] after:-translate-x-1 after:-translate-y-1 after:rounded-full" />
              <p className="text-sky-500 text-xs font-medium">
                此笔记已存在于互联网
              </p>
            </div>
            <div className="flex items-center">
              <Input
                value={url}
                className="flex-1 h-8 border-black truncate text-xs rounded-none"
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-none"
                size="sm"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <Button
              className="w-full text-xs"
              disabled={isSubmitting}
              onClick={onUnPublish}
              size="sm"
            >
              私密该笔记
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="w-6 h-6 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">
              发布此笔记后，其他人才可以访问该笔记数据
            </p>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full text-xs"
              size="sm"
            >
              发布
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default Publish;
