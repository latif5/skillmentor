"use client";

import Link from "next/link";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function OnboardingDonePage() {
  useEffect(() => {
    // Celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="text-7xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold text-white mb-4">You're all set!</h1>
        <p className="text-xl text-green-100 mb-8">
          Welcome to SkillMentor. Let's start learning!
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-green-50 transition shadow-lg"
        >
          Go to Dashboard →
        </Link>
      </div>
    </div>
  );
}
