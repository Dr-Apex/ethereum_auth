import { FC } from "react";
import Header from "./home/Header";
import HeroHome from "./home/HeroHome";
import FeaturesHome from "./home/Features";
import FeaturesBlocks from "./home/FeaturesBlocks";
import Footer from "./home/Footer";

const Home: FC = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />
      
      {/*  Page content and sections */}
      <main className="flex-grow">
        <HeroHome />
        <FeaturesHome />
        <FeaturesBlocks />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
};

export default Home;
