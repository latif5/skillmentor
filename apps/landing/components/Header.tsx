import Link from "next/link";
import { Brain } from "lucide-react";

export function Header() {
  return (
    <header className="flex md:mb-16 md:gap-0 z-10 mb-16 relative gap-x-6 gap-y-6 items-center justify-between animate-fade-up">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 text-zinc-900 group cursor-pointer">
        <div className="flex text-white bg-gradient-to-b from-indigo-600 to-indigo-800 w-8 h-8 rounded-lg items-center justify-center shadow-lg transition-transform duration-500 group-hover:rotate-[360deg]">
          <Brain size={18} />
        </div>
        <span className="text-sm font-semibold tracking-tight uppercase">
          Skill<span className="text-zinc-500 font-normal ml-0.5">Mentor</span>
        </span>
      </Link>

      {/* Navigation */}
      <nav className="hidden md:flex uppercase text-[10px] font-semibold text-zinc-500 tracking-widest bg-white/50 border-white/60 border rounded-full pt-2.5 pr-6 pb-2.5 pl-6 shadow-sm backdrop-blur-sm gap-x-8 items-center transition-all hover:shadow-md hover:bg-white/80">
        <Link href="#features" className="hover:text-indigo-600 transition-colors duration-300 relative group">
          Features
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link href="#pricing" className="hover:text-indigo-600 transition-colors duration-300 relative group">
          Pricing
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link href="#reviews" className="hover:text-indigo-600 transition-colors duration-300 relative group">
          Reviews
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link href="http://localhost:3001/login" className="hover:text-indigo-600 transition-colors duration-300 relative group">
          Login
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </nav>

      {/* CTA */}
      <Link
        href="http://localhost:3001/login"
        className="flex items-center gap-2 group hover:bg-zinc-50 text-xs font-medium text-zinc-700 tracking-wide bg-white border border-zinc-200 rounded-lg pt-2.5 pr-4 pb-2.5 pl-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="uppercase tracking-wide text-[10px] font-semibold">Start Learning</span>
      </Link>
    </header>
  );
}
