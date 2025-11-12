
import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";
import FeaturedProducts from "./FeaturedProducts";
import HowItWorks from './HowItWorks';
import OurMission from './OurMission';

const Home = () => {
  

  return (
    <div className="min-h-screen bg-base-100">
      {/* ✅ HERO SECTION */}
      <HeroSection></HeroSection>

      {/* ✅ FEATURED FOODS SECTION */}
      <FeaturedProducts></FeaturedProducts>

      {/* ✅ STATIC SECTION 1: HOW IT WORKS */}
     <HowItWorks></HowItWorks>

      {/* ✅ STATIC SECTION 2: OUR MISSION */}
      <OurMission></OurMission>

      
    </div>
  );
};

export default Home;
