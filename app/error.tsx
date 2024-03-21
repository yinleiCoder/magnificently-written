"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

//nextjs 指定的错误处理文件
function Error() {
  return (
    <div className="h-full flex flex-col items-center justify-start space-y-4">
      <Image
        src="/images/error.png"
        height="300"
        width="300"
        alt="error page"
        className="filter-none dark:brightness-0 dark:invert select-none"
      />
      <h2 className="text-xl font-bold">出错啦！</h2>
      <p className="text-neutral-400">
        请尝试重试、打开浏览器的Console面板进行排查错误或联系尹磊进行及时修复，感谢您的理解与支持。
      </p>
      <Button asChild>
        <Link href="/documents">返回&nbsp;斐然成章笔记编辑器</Link>
      </Button>
    </div>
  );
}

export default Error;
