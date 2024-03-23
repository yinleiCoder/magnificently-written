"use client";

import Logo from "./Logo";
import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks/useScrollTop";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/themeToggle";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { ArrowRight, Tv } from "lucide-react";

function Navbar() {
  const scrolled = useScrollTop();
  const { isAuthenticated, isLoading } = useConvexAuth();

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
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button size="sm">登录</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button size="sm" variant="ghost" asChild>
              <Link href="/videos">
                视频
                <Tv className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button size="sm" asChild>
              <Link href="/documents">
                笔记编辑器
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
