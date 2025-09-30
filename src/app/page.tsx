// src/app/page.tsx
import dynamic from "next/dynamic";
import HeroSection from "@/components/hero-section";
import AboutNumou from "@/components/AboutNumou";
import EpisodesSection from "@/components/EpisodesSection";

// Lazy-load non-critical sections
const IntegrationsSection = dynamic(() => import("@/components/integrations-5"), { ssr: true });
const FAQsTwo             = dynamic(() => import("@/components/faqs-2"),         { ssr: true });


export default function Home() {
  return (
    <>
     

      {/* HERO (brand gradient from globals.css token) */}
      <header className="relative isolate" style={{ backgroundImage: "var(--hero-bg)" }}>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <HeroSection />
        </div>
      </header>

      {/* MAIN */}
      <main id="main" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <AboutNumou/>

        {/* Episodes (replaces the 3 feature cards you had) */}
        <section id="latest-episodes" className="scroll-mt-24 py-14 md:py-20">
          <EpisodesSection />
        </section>

       

        {/* Integrations / Platforms */}
        <section
          id="integrations"
          className="scroll-mt-24 py-14 md:py-20"
          aria-labelledby="integrations-heading"
        >
          <h2 id="integrations-heading" className="sr-only">التكاملات</h2>
          <IntegrationsSection />
        </section>

        {/* FAQs */}
        <section
          id="faq"
          className="scroll-mt-24  py-14 md:py-20"
          aria-labelledby="faq-heading"
        >
          <h2 id="faq-heading" className="sr-only">الأسئلة الشائعة</h2>
          <FAQsTwo />
        </section>
      </main>

     
      
    </>
  );
}