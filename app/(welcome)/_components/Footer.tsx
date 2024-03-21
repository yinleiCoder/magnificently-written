import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { Github } from "lucide-react";

function Footer() {
  return (
    <div className="w-full flex items-center p-5 bg-background z-50 dark:bg-[#1F1F1F]">
      <Logo />
      <div className="md:ml-auto w-full flex items-center justify-between md:justify-end gap-x-2 text-muted-foreground">
        <a
          href="https://github.com/yinleiCoder/magnificently-written"
          target="_blank"
        >
          <Button variant="ghost" size="sm">
            <Github className="w-4 h-4 mr-2" />
            Github
          </Button>
        </a>
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
