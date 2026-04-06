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

// Add smooth scrolling behavior
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const smoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        
        if (targetElement) {
          // Динамический offset на основе высоты header
          const header = document.querySelector('header');
          const headerHeight = header ? header.getBoundingClientRect().height : 80;
          // На мобильных добавляем дополнительный отступ
          const extraOffset = window.innerWidth < 768 ? 10 : 0;
          const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - extraOffset;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    };

    // Add click event listener to all anchor links
    document.addEventListener('click', smoothScroll);
    
    // Handle existing links with scroll behavior
    const existingLinks = document.querySelectorAll('a[href^="#"]');
    existingLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const target = e.target as HTMLAnchorElement;
        const href = target.getAttribute('href');
        if (href?.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId || '');
          
          if (targetElement) {
            // Динамический offset на основе высоты header
            const header = document.querySelector('header');
            const headerHeight = header ? header.getBoundingClientRect().height : 80;
            // На мобильных добавляем дополнительный отступ
            const extraOffset = window.innerWidth < 768 ? 10 : 0;
            const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - extraOffset;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  });
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <RateTicker />

      <main id="main" className="relative" tabIndex={-1}>
        <Hero />
        {/* <CryptoRates /> */}
        {process.env.HIDE_CALCULATOR !== 'true' && <Calculator />}
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
