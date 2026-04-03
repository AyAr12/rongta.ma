import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import ProductCatalog from "@/components/sections/ProductCatalog";
import WhyRongta from "@/components/sections/WhyRongta";
import FeaturedProduct from "@/components/sections/FeaturedProduct";
import Sectors from "@/components/sections/Sectors";
import Testimonials from "@/components/sections/Testimonials";
import CtaBanner from "@/components/sections/CtaBanner";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ProductCatalog />
        <WhyRongta />
        <FeaturedProduct />
        <Sectors />
        <Testimonials />
        <CtaBanner />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
