"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

// 带确认按钮的对话框
function ConfirmModal({ children, onConfirm }: ConfirmModalProps) {
  const handleConfirm = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onConfirm()
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild onClick={(e: any) => e.stopPropagation()}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确认吗？</AlertDialogTitle>
          <AlertDialogDescription>
            此操作不可逆，请谨慎操作，尤其是数据相关的问题。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e: any) => e.stopPropagation()}>
            取消
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>确认</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmModal;
