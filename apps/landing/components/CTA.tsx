import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-zinc-900 py-24 px-6 md:px-12 text-center animate-fade-up delay-300">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-50">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/30 rounded-full blur-[100px] animate-spin-slow origin-center" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/30 rounded-full blur-[100px] animate-spin-slow origin-center animation-delay-negative" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-medium mb-8 border border-white/20 backdrop-blur-sm">
          <Sparkles size={12} className="text-amber-400" />
          <span>Join the waitlist for early access</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-8">
          Ready to master your craft?
        </h2>
        
        <p className="text-lg text-zinc-400 mb-10 leading-relaxed max-w-xl">
          Join a community of lifelong learners and start building your future today. It's free to get started.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="http://localhost:3001/login"
            className="flex items-center justify-center gap-2 bg-white text-zinc-900 px-8 py-4 rounded-full font-semibold hover:bg-zinc-100 transition-colors shadow-lg hover:shadow-white/10 text-sm md:text-base min-w-[200px]"
          >
            Get Started Now
            <ArrowRight size={18} />
          </Link>
          <Link
            href="http://localhost:3001/login"
            className="flex items-center justify-center gap-2 bg-transparent border border-zinc-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/5 transition-colors text-sm md:text-base min-w-[200px]"
          >
            View Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
