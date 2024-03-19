"use client";

import Logo from "./Logo";
import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ModeToggle } from "@/components/themeToggle";

function Navbar() {
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 bg-background w-full p-5 fixed top-0 flex items-center dark:bg-[#1F1F1F]",
        scrolled && "border-b shadow-sm dark:bg-[#1F1F1F]"
      )}
    >
      <Logo />
      <div className="w-full md:ml-auto flex items-center gap-x-2 justify-between md:justify-end">
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
