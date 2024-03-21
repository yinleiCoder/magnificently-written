import Heading from "./_components/Heading";
import Heroes from "./_components/Heroes";
import Footer from "./_components/Footer";
import Author from "./_components/Author";
import TechStack from "./_components/TechStack";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Donate from './_components/Donate';

function WelcomePage() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center md:justify-start text-center gap-y-12 px-6 relative">
        <Heading />
        <Heroes />
        <TechStack />
        <Author />
        <Donate />
        <div className="relative w-[358px] h-[176px] sm:w-[505px] sm:h-[250px] md:w-[640px] md:h-[315px]">
          <Image
            src="/images/footer.webp"
            alt="footer"
            fill
            className="object-cover filter-none dark:brightness-0 dark:invert select-none"
          />
        </div>
      </div>
      <Separator />
      <Footer />
    </div>
  );
}

export default WelcomePage;
