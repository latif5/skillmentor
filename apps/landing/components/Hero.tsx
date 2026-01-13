import Link from "next/link";
import { ArrowRight, Layers, Star, TrendingUp, Zap } from "lucide-react";

export function Hero() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 h-full flex-grow relative z-10 pb-8 lg:pb-0">
      {/* Left Column: Hero Content */}
      <div id="about" className="lg:col-span-7 flex flex-col pt-4 relative justify-center scroll-mt-32">
        {/* Reviews Pill */}
        <div className="animate-fade-up delay-100 inline-flex bg-white/80 w-max rounded-full mb-8 pt-1.5 pr-4 pb-1.5 pl-1.5 shadow-sm backdrop-blur-sm items-center border border-zinc-100 group cursor-default hover:border-zinc-300 transition-all hover:scale-105 duration-300">
          <div className="flex -space-x-2 mr-3">
            <div className="flex items-center justify-center bg-yellow-400 w-6 h-6 rounded-full border-2 border-white text-white">
              <Star size={12} fill="currentColor" />
            </div>
          </div>
          <span className="text-xs font-medium text-zinc-600 tracking-wide mr-1">
            Rated <span className="text-zinc-900 font-semibold">4.9</span> by students
          </span>
          <ArrowRight size={12} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up delay-200 leading-[0.95] lg:text-[4.5rem] text-5xl font-semibold text-zinc-900 tracking-tighter mb-8">
          Supercharge
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-400 font-light block pb-4">
            Your Learning
          </span>
        </h1>

        {/* About Section (Intro) */}
        <p className="animate-fade-up delay-300 text-sm text-zinc-600 font-normal max-w-lg mb-10 leading-relaxed tracking-wide border-l-2 border-zinc-200 pl-6 hover:border-indigo-400 transition-colors duration-500">
          Master any subject with AI-powered flashcards, intelligent study modes, and a community-driven learning
          platform designed for modern students.
        </p>

        {/* Action Buttons */}
        <div className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-3 lg:mb-24 mb-16 gap-x-3 gap-y-3">
          <Link
            href="http://localhost:3001/login"
            className="hover:bg-zinc-800 hover:-translate-y-1 hover:shadow-2xl hover:shadow-zinc-900/20 transition-all duration-300 flex group text-sm font-medium text-white bg-zinc-900 rounded-full pt-3.5 pr-6 pb-3.5 pl-6 shadow-xl gap-x-3 gap-y-3 items-center justify-center min-w-[160px]"
          >
            <span className="tracking-tight">Get Started Free</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            href="#features"
            className="hover:bg-zinc-50 hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex text-sm font-medium text-zinc-600 bg-white border border-zinc-200 rounded-full pt-3.5 pr-6 pb-3.5 pl-6 shadow-sm gap-x-2 items-center justify-center group"
          >
            <span className="tracking-tight">View Features</span>
            <Layers size={16} className="group-hover:text-indigo-500 transition-colors" />
          </Link>
        </div>

        {/* Footer Stats */}
        <div className="animate-fade-up delay-500 flex flex-wrap gap-2 md:gap-6 mt-auto gap-x-2 gap-y-2 items-center">
          <div className="flex items-center group cursor-default hover:-translate-y-0.5 transition-transform duration-300">
            <div className="px-1">
              <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 group-hover:text-zinc-600 transition-colors">
                Active
              </p>
              <p className="text-sm text-zinc-900 font-medium">Students</p>
            </div>
            <div className="h-10 w-[1px] bg-zinc-200 ml-4 md:ml-8"></div>
          </div>
          <div className="flex items-center group cursor-default hover:-translate-y-0.5 transition-transform duration-300">
            <div className="px-1">
              <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 group-hover:text-zinc-600 transition-colors">
                Sets
              </p>
              <p className="text-sm text-zinc-900 font-medium">Created</p>
            </div>
            <div className="h-10 w-[1px] bg-zinc-200 ml-4 md:ml-8"></div>
          </div>
          <div className="flex items-center group cursor-default hover:-translate-y-0.5 transition-transform duration-300">
            <div className="px-1">
              <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 group-hover:text-zinc-600 transition-colors">
                Cards
              </p>
              <p className="text-sm text-zinc-900 font-medium">Verified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Visual Card */}
      <div className="lg:col-span-5 h-full min-h-[400px] lg:min-h-0 relative group perspective-1000 animate-fade-scale delay-300">
        <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl shadow-zinc-900/10 transition-all duration-700 ease-out border border-white/60 bg-white group-hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]">
          {/* Background Asset */}
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
            alt="Student Studying"
            className="transition-transform duration-[3s] ease-in-out group-hover:scale-110 filter grayscale-[20%] group-hover:grayscale-0 w-full h-full object-cover absolute top-0 right-0 bottom-0 left-0"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/30 to-zinc-900/10 opacity-80 group-hover:opacity-70 transition-opacity duration-700"></div>

          {/* Overlay Content Container */}
          <div className="flex flex-col pt-8 pr-8 pb-8 pl-8 absolute top-0 right-0 bottom-0 left-0 justify-between">
            {/* Top Row: New Badge */}
            <div className="flex items-start justify-end">
              <div className="flex gap-2 bg-black/30 backdrop-blur-md rounded-full pt-1.5 pr-3 pb-1.5 pl-3 items-center border border-white/10 shadow-lg animate-float">
                <Zap size={12} className="text-amber-400" fill="currentColor" />
                <span className="text-[10px] uppercase font-semibold text-white tracking-wide">AI Powered</span>
              </div>
            </div>

            {/* Middle: Floating Widget */}
            <div className="self-start transform transition-transform duration-700 ease-out bg-white/10 w-full max-w-[240px] rounded-xl mt-60 pt-4 pr-4 pb-4 pl-4 backdrop-blur-md border border-white/20 shadow-lg animate-float delay-700 group-hover:scale-105">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                    <TrendingUp size={12} />
                  </div>
                  <span className="text-xs text-white font-medium">Memory Retention</span>
                </div>
                <span className="text-[10px] text-emerald-300 font-mono">+45% Boost</span>
              </div>
              <div className="h-12 w-full mb-2 flex items-end gap-1">
                <div className="w-1/5 bg-white/20 rounded-t-sm h-[40%] transition-all duration-1000 group-hover:h-[45%]"></div>
                <div className="w-1/5 bg-white/20 rounded-t-sm h-[55%] transition-all duration-1000 delay-100 group-hover:h-[65%]"></div>
                <div className="w-1/5 bg-white/20 rounded-t-sm h-[50%] transition-all duration-1000 delay-200 group-hover:h-[60%]"></div>
                <div className="w-1/5 bg-white/30 rounded-t-sm h-[75%] transition-all duration-1000 delay-300 group-hover:h-[85%]"></div>
                <div className="w-1/5 bg-indigo-500 rounded-t-sm h-[90%] shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-1000 delay-400 group-hover:h-[98%]"></div>
              </div>
            </div>

            {/* Bottom: Link */}
            <div className="overflow-hidden w-full border-white/10 rounded-xl border-t mt-auto pt-4 relative group/link cursor-pointer transition-all duration-300 hover:bg-white/5">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3 transition-all duration-300 group-hover/link:space-x-[-8px]">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 border border-white flex items-center justify-center text-[10px] font-bold text-indigo-700">
                    A
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-100 border border-white flex items-center justify-center text-[10px] font-bold text-purple-700">
                    B
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-100 border border-white flex items-center justify-center text-[10px] font-bold text-emerald-700">
                    C
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-semibold tracking-wide flex items-center gap-1">
                    Join 10,000+ Learners
                    <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-white/60 text-[10px] uppercase tracking-wider">Start Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
