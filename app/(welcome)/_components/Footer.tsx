import { Button } from "@/components/ui/button";
import Logo from "./Logo";

function Footer() {
  return (
    <div className="w-full flex items-center p-5 bg-background z-50 dark:bg-[#1F1F1F]">
      <Logo />
      <div className="md:ml-auto w-full flex items-center justify-between md:justify-end gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
          Github
        </Button>
        <Button variant="ghost" size="sm">
          尹磊
        </Button>
        <Button variant="ghost" size="sm">
          © 2024 YinLei Labs, Inc.
        </Button>
      </div>
    </div>
  );
}

export default Footer;
