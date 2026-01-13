"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import Link from "next/link";

export default function LearnPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as Id<"studySets">;

  const studySet = useQuery(api.studySets.getById, { id });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectTerms, setIncorrectTerms] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  const terms = studySet?.terms || [];

  if (studySet === undefined) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!studySet || terms.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No terms found</h1>
          <Link href={`/sets/${id}`} className="text-indigo-400 hover:underline">
            Go back
          </Link>
        </div>
      </div>
    );
  }

  const currentTerm = terms[currentIndex];

  const handleSubmit = () => {
    setShowAnswer(true);
  };

  const handleCorrect = () => {
    setCorrectCount(correctCount + 1);
    nextTerm();
  };

  const handleIncorrect = () => {
    setIncorrectTerms([...incorrectTerms, currentIndex]);
    nextTerm();
  };

  const nextTerm = () => {
    setUserAnswer("");
    setShowAnswer(false);
    
    if (currentIndex < terms.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setUserAnswer("");
    setShowAnswer(false);
    setCorrectCount(0);
    setIncorrectTerms([]);
    setCompleted(false);
  };

  if (completed) {
    const score = Math.round((correctCount / terms.length) * 100);
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="max-w-md w-full text-center p-8">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold mb-4">Great job!</h1>
          <p className="text-xl text-gray-300 mb-8">
            You got {correctCount} out of {terms.length} correct ({score}%)
          </p>
          <div className="space-y-3">
            <button
              onClick={restart}
              className="w-full py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
            >
              Study Again
            </button>
            <Link
              href={`/sets/${id}`}
              className="block w-full py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition"
            >
              Back to Set
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="sticky top-0 bg-gray-900/90 backdrop-blur border-b border-gray-800 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/sets/${id}`} className="text-gray-400 hover:text-white transition">
            ← Back
          </Link>
          <h1 className="font-semibold truncate max-w-[200px] md:max-w-none">
            {studySet.title} - Learn
          </h1>
          <div className="text-sm text-gray-400">
            {currentIndex + 1} / {terms.length}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / terms.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-2xl p-8 mb-6">
          <p className="text-sm text-gray-400 mb-2">Define:</p>
          <h2 className="text-3xl font-medium mb-6">{currentTerm?.word}</h2>

          {!showAnswer ? (
            <div>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer..."
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-white"
                rows={4}
                autoFocus
              />
              <button
                onClick={handleSubmit}
                className="mt-4 w-full py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
              >
                Show Answer
              </button>
            </div>
          ) : (
            <div>
              <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-400 mb-1">Correct answer:</p>
                <p className="text-lg">{currentTerm?.definition}</p>
              </div>
              {userAnswer && (
                <div className="bg-gray-700 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-400 mb-1">Your answer:</p>
                  <p className="text-lg">{userAnswer}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleIncorrect}
                  className="py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-500/10 transition"
                >
                  ✗ Incorrect
                </button>
                <button
                  onClick={handleCorrect}
                  className="py-3 bg-green-600 rounded-lg hover:bg-green-700 transition"
                >
                  ✓ Correct
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-gray-500">
          Score: {correctCount} / {currentIndex + (showAnswer ? 1 : 0)}
        </div>
      </div>
    </div>
  );
}
