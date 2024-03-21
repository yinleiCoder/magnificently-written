"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface TooltipMessageProps {
  children: React.ReactNode;
  message: string;
}

function TooltipMessage({ children, message }: TooltipMessageProps) {
  const { resolvedTheme } = useTheme();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          className={cn(
            "text-xs text-white bg-neutral-600",
            resolvedTheme === "light" && "bg-black"
          )}
        >
          {message}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default TooltipMessage;
