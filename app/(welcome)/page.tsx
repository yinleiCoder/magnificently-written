import Heading from "./_components/Heading";
import Heroes from "./_components/Heroes";
import Footer from './_components/Footer';

function WelcomePage() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center md:justify-start text-center gap-y-8 px-6">
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
}

export default WelcomePage;
