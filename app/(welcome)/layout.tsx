import Navbar from "./_components/Navbar";

// 首页欢迎页的布局
function WelcomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full dark:bg-[#1F1F1F]">
      <Navbar />
      <main className="min-h-full pt-40 flex flex-col">{children}</main>
    </div>
  );
}

export default WelcomeLayout;
