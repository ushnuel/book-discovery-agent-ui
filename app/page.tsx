import Hero from "@/components/Hero";
import { Cta } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Testimonials from "@/components/Testimonials";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Testimonials />
      <Cta />
      <Footer />
    </>
  );
};

export default Home;
