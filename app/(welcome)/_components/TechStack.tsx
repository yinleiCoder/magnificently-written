import { Badge } from "@/components/ui/badge";

function TechStack() {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center flex-wrap gap-x-4 gap-y-2 md:gap-y-5">
        <Badge variant="outline">React</Badge>
        <Badge>Nextjs</Badge>
        <Badge variant="outline">Tailwindcss</Badge>
        <Badge variant="outline">Shadcnui</Badge>
        <Badge>Convex</Badge>
        <Badge variant="outline">Clerk</Badge>
        <Badge variant="outline">usehooks-ts</Badge>
        <Badge variant="outline">Sonner</Badge>
        <Badge>Zustand</Badge>
        <Badge variant="outline">Emoji Picker React</Badge>
        <Badge variant="outline">React Textarea Autosize</Badge>
        <Badge>Edge Store</Badge>
        <Badge>Block Note</Badge>
      </div>
    </div>
  );
}

export default TechStack;
