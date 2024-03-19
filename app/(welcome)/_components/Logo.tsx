import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

function Logo() {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/logo.svg"
        width={35}
        height={35}
        alt="logo"
        className="dark:hidden"
      />
      <Image
        src="/logo-dark.svg"
        width={35}
        height={35}
        alt="logo"
        className="hidden dark:block"
      />
      <p className={cn("font-semibold flex-shrink-0", font.className)}>
        斐然成章
      </p>
    </div>
  );
}

export default Logo;
