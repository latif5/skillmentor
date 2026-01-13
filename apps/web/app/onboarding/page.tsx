"use client";

import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="text-6xl mb-6">🎓</div>
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to SkillMentor</h1>
        <p className="text-xl text-indigo-100 mb-8">
          Let's set up your account so you can start learning!
        </p>
        <Link
          href="/onboarding/account-type"
          className="inline-block px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition shadow-lg"
        >
          Get Started →
        </Link>
      </div>
    </div>
  );
}
