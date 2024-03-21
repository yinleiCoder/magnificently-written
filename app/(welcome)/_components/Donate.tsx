import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Image from "next/image";

function Donate() {
  return (
    <Tabs defaultValue="weixin" className="w-[300px]">
      <TabsList>
        <TabsTrigger value="weixin">微信</TabsTrigger>
        <TabsTrigger value="alipay">支付宝</TabsTrigger>
      </TabsList>
      <TabsContent value="weixin">
        <Card className="relative w-full aspect-square overflow-hidden">
          <Image src="/wx.png" alt="微信" fill className=" object-cover" />
        </Card>
      </TabsContent>
      <TabsContent value="alipay">
        <Card className="relative w-full aspect-square overflow-hidden">
          <Image src="/zfb.jpg" alt="微信" fill className=" object-cover" />
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default Donate;
