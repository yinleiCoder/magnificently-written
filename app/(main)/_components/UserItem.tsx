"use client";

import { ChevronsLeftRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/clerk-react";

function UserItem() {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="w-full flex items-center text-sm p-3  hover:bg-primary/5 rounded-md"
        >
          <div className="flex items-center max-w-[150px] gap-x-2">
            <Avatar className="w-5 h-5 rounded-md">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>{user?.firstName}</AvatarFallback>
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user?.fullName}
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-3 w-3" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem className="text-xs text-neutral-400">
          {user?.emailAddresses[0].emailAddress}
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-x-2">
          <Avatar className="w-8 h-8 rounded-md">
            <AvatarImage src={user?.imageUrl} />
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm line-clamp-1">{user?.fullName}</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground"
        >
          <SignOutButton>退出登录</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserItem;
