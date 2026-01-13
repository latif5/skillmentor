import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Pricing } from "../components/Pricing";
import { Reviews } from "../components/Reviews";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans selection:bg-slate-900 selection:text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:p-10 xl:p-12 flex flex-col relative overflow-hidden min-h-screen">
        {/* Vertical Grid Lines */}
        <div className="absolute inset-0 flex justify-between pointer-events-none z-0 px-6 md:px-10 xl:px-12 w-full h-full">
          <div className="h-full w-[1px] bg-zinc-950/5"></div>
          <div className="h-full w-[1px] bg-zinc-950/5 hidden md:block"></div>
          <div className="h-full w-[1px] bg-zinc-950/5 hidden lg:block"></div>
          <div className="h-full w-[1px] bg-zinc-950/5 hidden xl:block"></div>
          <div className="h-full w-[1px] bg-zinc-950/5"></div>
        </div>

        <Header />
        
        <Hero />

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent mt-16 lg:mt-24 mb-16 lg:mb-24 opacity-60"></div>

        <Features />

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent mt-16 lg:mt-24 mb-16 lg:mb-24 opacity-60"></div>

        <Reviews />

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent mt-16 lg:mt-24 mb-16 lg:mb-24 opacity-60"></div>

        <Pricing />

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent mt-16 lg:mt-24 mb-16 lg:mb-24 opacity-60"></div>

        <CTA />

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent mt-16 lg:mt-24 mb-16 lg:mb-24 opacity-60"></div>

        <Footer />
      </div>
    </main>
  );
}
