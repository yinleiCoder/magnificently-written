"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function Heading() {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        欢迎来到我的网站
        <span className="underline">斐然成章</span>，见证我的知识成长
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        花自飘零水自流:
        计算机，大观中国常识，读书笔记，钢琴和吉他，四川麻将，厨艺等均有涉猎
      </h3>
      <Button>
        注册账号共同讨论
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}

export default Heading;
