import Image from "next/image";

function Heroes() {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="relative w-[350px] h-[128px] sm:w-[600px] sm:h-[220px] md:w-[720px] md:h-[260px]">
        <Image
          src="/images/home-hero.webp"
          alt="welcome my website"
          fill
          className="object-cover filter-none dark:brightness-0 dark:invert select-none"
        />
      </div>
    </div>
  );
}

export default Heroes;
