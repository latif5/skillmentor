import Link from "next/link";
import { Check } from "lucide-react";

export function Pricing() {
  return (
    <div id="pricing" className="flex flex-col gap-10 z-10 w-full relative gap-x-10 gap-y-10 animate-fade-up delay-200 scroll-mt-24">
      <div className="flex flex-col md:items-center md:text-center justify-between gap-6 px-1">
        <div className="max-w-2xl">
          <h2 className="md:text-4xl text-3xl font-medium text-zinc-900 tracking-tighter mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="leading-relaxed text-base font-normal text-zinc-500">
            Start for free, upgrade when you need to power up your learning.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Free Plan */}
        <div className="flex flex-col p-8 bg-zinc-50 rounded-3xl border border-zinc-200 shadow-sm relative group hover:bg-white hover:shadow-xl transition-all duration-300 ease-in-out animate-fade-up delay-100">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">Free</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-zinc-900">$0</span>
              <span className="text-zinc-500">/month</span>
            </div>
            <p className="text-sm text-zinc-500 mt-4">For casual learners and students.</p>
          </div>
          <Link
            href="http://localhost:3001/login"
            className="w-full block text-center bg-white border border-zinc-200 text-zinc-700 py-2.5 rounded-lg font-medium hover:bg-zinc-50 hover:border-zinc-300 transition-colors mb-8"
          >
            Get Started
          </Link>
          <ul className="space-y-3 flex-1">
            <li className="flex items-center gap-3 text-sm text-zinc-600">
              <Check size={16} className="text-indigo-600 flex-shrink-0" />
              <span>Unlimited Flashcards</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-zinc-600">
              <Check size={16} className="text-indigo-600 flex-shrink-0" />
              <span>Basic Learn Modes</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-zinc-600">
              <Check size={16} className="text-indigo-600 flex-shrink-0" />
              <span>Community Access</span>
            </li>
          </ul>
        </div>

        {/* Pro Plan */}
        <div className="flex flex-col p-8 bg-zinc-900 rounded-3xl border border-zinc-800 shadow-xl relative transform md:-translate-y-4 md:scale-105 z-10 animate-fade-up delay-200">
          <div className="absolute top-0 right-0 left-0 -mt-4 flex justify-center">
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
              Most Popular
            </span>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Pro</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">$12</span>
              <span className="text-zinc-400">/month</span>
            </div>
            <p className="text-sm text-zinc-400 mt-4">For serious students aiming for top grades.</p>
          </div>
          <Link
            href="http://localhost:3001/login"
            className="w-full block text-center bg-white text-zinc-900 py-2.5 rounded-lg font-medium hover:bg-zinc-100 transition-colors mb-8 shadow-lg shadow-indigo-900/20"
          >
            Start Free Trial
          </Link>
          <ul className="space-y-3 flex-1">
            <li className="flex items-center gap-3 text-sm text-zinc-300">
              <div className="bg-indigo-500/20 p-0.5 rounded-full">
                <Check size={14} className="text-indigo-400 flex-shrink-0" />
              </div>
              <span>Everything in Free</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-zinc-300">
              <div className="bg-indigo-500/20 p-0.5 rounded-full">
                <Check size={14} className="text-indigo-400 flex-shrink-0" />
              </div>
              <span>AI-Powered Practice Tests</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-zinc-300">
              <div className="bg-indigo-500/20 p-0.5 rounded-full">
                <Check size={14} className="text-indigo-400 flex-shrink-0" />
              </div>
              <span>Advanced Analytics</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-zinc-300">
              <div className="bg-indigo-500/20 p-0.5 rounded-full">
                <Check size={14} className="text-indigo-400 flex-shrink-0" />
              </div>
              <span>Offline Access</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-zinc-300">
              <div className="bg-indigo-500/20 p-0.5 rounded-full">
                <Check size={14} className="text-indigo-400 flex-shrink-0" />
              </div>
              <span>Priority Support</span>
            </li>
          </ul>
        </div>

        {/* Team Plan */}
        <div className="flex flex-col p-8 bg-zinc-50 rounded-3xl border border-zinc-200 shadow-sm relative group hover:bg-white hover:shadow-xl transition-all duration-300 ease-in-out animate-fade-up delay-300">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">Classroom</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-zinc-900">$49</span>
              <span className="text-zinc-500">/month</span>
            </div>
            <p className="text-sm text-zinc-500 mt-4">For teachers and institutions.</p>
          </div>
          <Link
            href="http://localhost:3001/login"
            className="w-full block text-center bg-white border border-zinc-200 text-zinc-700 py-2.5 rounded-lg font-medium hover:bg-zinc-50 hover:border-zinc-300 transition-colors mb-8"
          >
            Contact Sales
          </Link>
          <ul className="space-y-3 flex-1">
            <li className="flex items-center gap-3 text-sm text-zinc-600">
              <Check size={16} className="text-indigo-600 flex-shrink-0" />
              <span>Everything in Pro</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-zinc-600">
              <Check size={16} className="text-indigo-600 flex-shrink-0" />
              <span>Teacher Dashboard</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-zinc-600">
              <Check size={16} className="text-indigo-600 flex-shrink-0" />
              <span>Student Progress Tracking</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-zinc-600">
              <Check size={16} className="text-indigo-600 flex-shrink-0" />
              <span>Bulk seat management</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
