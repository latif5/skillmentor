import Link from "next/link";
import { ArrowRight, BarChart2, Brain, Database, Layers, Users, Zap } from "lucide-react";

export function Features() {
  return (
    <div id="features" className="flex flex-col gap-10 z-10 w-full relative gap-x-10 gap-y-10 animate-fade-up delay-200 scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
        <div className="max-w-2xl">
          <h2 className="md:text-4xl text-3xl font-medium text-zinc-900 tracking-tighter mb-4">Why SkillMentor?</h2>
          <p className="leading-relaxed text-base font-normal text-zinc-500">
            We combine proven learning techniques with modern technology to help you learn faster and retain more.
          </p>
        </div>
        <Link
          href="http://localhost:3001/login"
          className="group flex items-center gap-2 hover:text-zinc-600 transition-colors text-sm font-medium text-zinc-900 pb-1"
        >
          Explore Platform
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Bento Grid: Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden shadow-zinc-900/5 bg-zinc-200 rounded-[2rem] gap-px border border-zinc-200">
        {/* Feature 1: Flashcards */}
        <div className="group hover:bg-white transition-all duration-300 ease-in-out flex flex-col min-h-[300px] bg-zinc-50 h-full p-8 relative justify-between hover:shadow-lg z-10 animate-fade-up delay-100">
          <div>
            <div className="w-10 h-10 bg-white rounded-lg border border-zinc-200 flex items-center justify-center mb-6 shadow-sm text-zinc-700 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ease-in-out">
              <Layers size={20} />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2 tracking-tight">Smart Flashcards</h3>
            <p className="text-sm text-zinc-500 font-normal leading-relaxed">
              Create unlimited flashcards or import from top educators. Study with spaced repetition for maximum
              retention.
            </p>
          </div>
          <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-8 right-8">
            <ArrowRight size={16} />
          </div>
        </div>

        {/* Feature 2: Learn Modes (Large) */}
        <div className="group relative bg-white hover:bg-zinc-50 transition-colors duration-300 ease-in-out p-8 flex flex-col justify-between h-full min-h-[300px] md:col-span-2 overflow-hidden hover:shadow-lg z-10 animate-fade-up delay-200">
          <div className="relative z-10 max-w-md">
            <div className="w-10 h-10 bg-zinc-50 rounded-lg border border-zinc-200 flex items-center justify-center mb-6 shadow-sm text-zinc-700 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ease-in-out">
              <Brain size={20} />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2 tracking-tight">Adaptive Learning Modes</h3>
            <p className="text-sm text-zinc-500 font-normal leading-relaxed">
              Whether you prefer classic flashcards, multiple choice tests, or gamified matching, SkillMentor adapts to
              your unique learning style. All powered by AI to focus on your weak spots.
            </p>
          </div>
          {/* Abstract Visual */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-gradient-to-l from-zinc-50 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-8 right-8 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
            <Zap className="w-full h-full animate-spin-slow text-indigo-500" />
          </div>
        </div>

        {/* Feature 3: Classes */}
        <div className="group hover:bg-white transition-all duration-300 ease-in-out flex flex-col min-h-[300px] bg-zinc-50 h-full p-8 relative justify-between hover:shadow-lg z-10 animate-fade-up delay-300">
          <div>
            <div className="w-10 h-10 bg-white rounded-lg border border-zinc-200 flex items-center justify-center mb-6 shadow-sm text-zinc-700 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ease-in-out">
              <Users size={20} />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2 tracking-tight">Collaborative Classes</h3>
            <p className="text-sm text-zinc-500 font-normal leading-relaxed">
              Join classes, share study sets, and compete with classmates to stay motivated and engaged.
            </p>
          </div>
          <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-8 right-8">
            <ArrowRight size={16} />
          </div>
        </div>

        {/* Feature 4: Analytics */}
        <div className="group hover:bg-white transition-all duration-300 ease-in-out flex flex-col min-h-[300px] bg-zinc-50 h-full p-8 relative justify-between hover:shadow-lg z-10 animate-fade-up delay-400">
          <div>
            <div className="w-10 h-10 bg-white rounded-lg border border-zinc-200 flex items-center justify-center mb-6 shadow-sm text-zinc-700 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ease-in-out">
              <BarChart2 size={20} />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2 tracking-tight">Progress Tracking</h3>
            <p className="text-sm text-zinc-500 font-normal leading-relaxed">
              Visualize your learning journey with detailed analytics and insights into your study habits.
            </p>
          </div>
          <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-8 right-8">
            <ArrowRight size={16} />
          </div>
        </div>

        {/* Feature 5: Organization */}
        <div className="group hover:bg-white transition-all duration-300 ease-in-out flex flex-col min-h-[300px] bg-zinc-50 h-full p-8 relative justify-between hover:shadow-lg z-10 animate-fade-up delay-500">
          <div>
            <div className="w-10 h-10 bg-white rounded-lg border border-zinc-200 flex items-center justify-center mb-6 shadow-sm text-zinc-700 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ease-in-out">
              <Database size={20} />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2 tracking-tight">Organized Library</h3>
            <p className="text-sm text-zinc-500 font-normal leading-relaxed">
              Keep all your materials sorted with intuitive folders, tags, and powerful search capabilities.
            </p>
          </div>
          <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-8 right-8">
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
