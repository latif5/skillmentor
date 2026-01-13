import Link from "next/link";

export function Footer() {
  return (
    <footer className="z-10 w-full relative animate-fade-up delay-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-zinc-900 tracking-tight">
            SkillMentor
            <br />
            <span className="text-zinc-400">Education</span>
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Empowering students worldwide with intelligent tools for better learning outcomes.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-medium text-zinc-900 text-sm">Platform</h4>
          <Link
            href="#features"
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors hover:translate-x-1 duration-300 inline-block"
          >
            Flashcards
          </Link>
          <Link
            href="#features"
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors hover:translate-x-1 duration-300 inline-block"
          >
            Classes
          </Link>
          <Link
            href="#features"
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors hover:translate-x-1 duration-300 inline-block"
          >
            Analytics
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-medium text-zinc-900 text-sm">Company</h4>
          <Link
            href="#"
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors hover:translate-x-1 duration-300 inline-block"
          >
            About Us
          </Link>
          <Link
            href="#"
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors hover:translate-x-1 duration-300 inline-block"
          >
            Contact
          </Link>
          <Link
            href="#"
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors hover:translate-x-1 duration-300 inline-block"
          >
            Careers
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-medium text-zinc-900 text-sm">Start Learning</h4>
          <Link
            href="http://localhost:3001/login"
            className="text-sm text-indigo-600 font-medium hover:underline"
          >
            Sign Up Free
          </Link>
          <Link href="http://localhost:3001/login" className="text-sm text-zinc-500 hover:text-zinc-900">
            Log In
          </Link>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="flex flex-col md:flex-row border-zinc-200 border-t pt-8 gap-4 items-center justify-between">
        <p className="text-zinc-400 text-xs font-normal">© 2024 SkillMentor. All rights reserved.</p>
        <div className="flex items-center gap-6 text-xs text-zinc-400">
          <Link href="#" className="hover:text-zinc-600 transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-zinc-600 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
