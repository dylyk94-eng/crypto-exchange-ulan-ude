import Header from '@/components/Header';
import RateTicker from '@/components/RateTicker';
import Hero from '@/components/Hero';
import CryptoRates from '@/components/CryptoRates';
import Calculator from '@/components/Calculator';
import Cities from '@/components/Cities';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
// import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <RateTicker />

      <main id="main" className="relative" tabIndex={-1}>
        <Hero />
        {/* <CryptoRates /> */}
        <Calculator />
        <Cities />
        <Services />
        <Testimonials />
        {/* <FAQ /> */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
