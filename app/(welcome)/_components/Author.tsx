import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import TooltipMessage from "@/components/TooltipMessage";

function Author() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 flex flex-col justify-center mt-[120px]">
      <Card className="relative w-[358px] sm:w-[505px] md:w-[740px] lg:w-[1024px] bg-[#F6F5F4] dark:bg-neutral-600 border-none">
        <CardHeader>
          <CardTitle>我的编程之旅</CardTitle>
          <CardDescription>
            您好！我是全栈工程师，喜欢C++、C#、JavaScript、Python、Go、Blender、逆向工程、Python数据分析等
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Table>
            <TableCaption>我的简介和开源外挂软件</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>姓名</TableHead>
                <TableHead>出生年月</TableHead>
                <TableHead>专业</TableHead>
                <TableHead>城市</TableHead>
                <TableHead>喜欢做的事情</TableHead>
                <TableHead>工作经历</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>尹磊</TableCell>
                <TableCell>1998年5月5日&nbsp;端午节</TableCell>
                <TableCell>计算机-软件工程</TableCell>
                <TableCell>四川</TableCell>
                <TableCell>读书、写代码、弹吉他、Blender、Procreate</TableCell>
                <TableCell>中国联通</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <a
            href="https://github.com/yinleiCoder/cs2-cheat-cpp"
            target="_blank"
          >
            <div className="w-full">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src="/cs2cheat.png"
                  alt="cs2 cheat"
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>
          </a>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <TooltipMessage message="微信: yl1099129793 请注明来意">
            <p>微信: yl1099129793</p>
          </TooltipMessage>
          <TooltipMessage message="如果您喜欢我写的CS2游戏外挂，不妨在下方扫码请我喝杯咖啡？感谢您的支持，是我更新外挂的动力">
            <p>CS2游戏外挂开发</p>
          </TooltipMessage>
        </CardFooter>
        <Image
          alt="author"
          src="/images/topPeekI.avif"
          width={220}
          height={50}
          className="object-cover absolute top-[-135px] left-[20px]  filter-none dark:brightness-0 dark:invert select-none"
          priority
        />
        <Image
          alt="author"
          src="/images/sidePeekB.avif"
          width={50}
          height={50}
          className="object-cover absolute bottom-[0px] left-[-40px] filter-none dark:brightness-0 dark:invert select-none"
          priority
        />
        <Image
          alt="author"
          src="/images/sidePeekF.avif"
          width={50}
          height={50}
          className="object-cover absolute bottom-[50%] right-[-30px]  filter-none dark:brightness-0 dark:invert select-none"
          priority
        />
      </Card>
    </div>
  );
}

export default Author;
