"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "../themeToggle";
import { useSettingsStore } from "@/hooks/useSettings";

function SettingsModal() {
  const settings = useSettingsStore();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <DialogTitle>斐然成章&apos;s&nbsp;设置</DialogTitle>
          <DialogDescription className="flex items-center justify-between">
            <div className="flex flex-col gap-y-1">
              <Label className="font-bold">外观</Label>
              <span className="text-[0.8rem] text-muted-foreground">
                自定义斐然成章在您的设备上时显示的外观
              </span>
            </div>
            <ModeToggle />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsModal;
