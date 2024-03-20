"use client";

import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { useCoverImageStore } from "@/hooks/useCoverImage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

// 封面图上传-模态框
function CoverImageModal() {
  const coverImageStore = useCoverImageStore();

  const { edgestore } = useEdgeStore();

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams();

  const update = useMutation(api.documents.update);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImageStore.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);
      // 如果有封面图片就替换url，可以节省edge store中的存储
      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImageStore.url,
        },
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      onClose();
    }
  };

  return (
    <Dialog
      open={coverImageStore.isOpen}
      onOpenChange={coverImageStore.onClose}
    >
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>笔记封面图</DialogTitle>
          <DialogDescription>
            <SingleImageDropzone
              className="w-full outline-none"
              disabled={isSubmitting}
              value={file}
              onChange={onChange}
            />
            <div className="text-center">宽度超过1500像素的图像效果最佳</div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CoverImageModal;
