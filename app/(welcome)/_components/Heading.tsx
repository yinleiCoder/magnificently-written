function Heading() {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-snug md:leading-tight">
        欢迎来到我的网站
        <span className="underline underline-offset-[10px] decoration-orange-500">
          斐然成章
        </span>
        ，见证我的知识成长
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium leading-relaxed">
        <span className="underline decoration-wavy underline-offset-8">
          花自飘零水自流
        </span>
        : 计算机，大观中国常识，读书笔记，钢琴和吉他，四川麻将，厨艺等均有涉猎
      </h3>
    </div>
  );
}

export default Heading;
