import GuestLayout from "@/components/layout/GuestLayout";
import HomeHero from "./(comps)/HomeHero";
import HomeAbout from "./(comps)/About";
import ResultSection from "./(comps)/ResultSection";

const HomePage = async() => {

  return (
    <GuestLayout>
      <HomeHero />
      <HomeAbout/>
      <ResultSection/>
    </GuestLayout>
  );
}

export default HomePage;