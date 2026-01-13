"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function AccountTypePage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<"Student" | "Teacher" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = async () => {
    if (!selectedType) return;
    setIsSubmitting(true);
    // For now, we'll just redirect - role will be set in username step
    router.push(`/onboarding/username?role=${selectedType}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">What best describes you?</h1>
          <p className="text-gray-600">This helps us personalize your experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setSelectedType("Student")}
            className={`p-8 rounded-xl border-2 transition text-left ${
              selectedType === "Student"
                ? "border-indigo-600 bg-indigo-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Student</h3>
            <p className="text-gray-600 text-sm">
              I want to study and learn using flashcards
            </p>
          </button>

          <button
            onClick={() => setSelectedType("Teacher")}
            className={`p-8 rounded-xl border-2 transition text-left ${
              selectedType === "Teacher"
                ? "border-indigo-600 bg-indigo-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="text-4xl mb-4">👨‍🏫</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Teacher</h3>
            <p className="text-gray-600 text-sm">
              I want to create content and manage students
            </p>
          </button>
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedType || isSubmitting}
          className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Loading..." : "Continue"}
        </button>
      </div>
    </div>
  );
}
