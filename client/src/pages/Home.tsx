import Footer from "../components/Footer";
import Banner from "../components/home/Banner";
import HowItWorks from "../components/home/HowItWorks";
import Pricing from "../components/home/Pricing";
import '../styles/app.scss'

const Home = () => {
  return (
    <>
      <Banner />
     <div className="container">
       <HowItWorks />
      <Pricing />

        
     </div>
   <Footer />
    </>
  );
};
export default Home;
