"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import Link from "next/link";

export default function FlashcardsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as Id<"studySets">;

  const studySet = useQuery(api.studySets.getById, { id });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [termOrder, setTermOrder] = useState<number[]>([]);

  const terms = studySet?.terms || [];

  useEffect(() => {
    if (terms.length > 0 && termOrder.length === 0) {
      setTermOrder(terms.map((_, i) => i));
    }
  }, [terms, termOrder.length]);

  const shuffle = useCallback(() => {
    const newOrder = [...termOrder].sort(() => Math.random() - 0.5);
    setTermOrder(newOrder);
    setShuffled(true);
    setCurrentIndex(0);
    setFlipped(false);
  }, [termOrder]);

  const reset = useCallback(() => {
    setTermOrder(terms.map((_, i) => i));
    setShuffled(false);
    setCurrentIndex(0);
    setFlipped(false);
  }, [terms]);

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

  const currentTermIndex = termOrder[currentIndex] ?? 0;
  const currentTerm = terms[currentTermIndex];

  const next = () => {
    if (currentIndex < terms.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          next();
          break;
        case "ArrowLeft":
          prev();
          break;
        case " ":
          e.preventDefault();
          setFlipped(!flipped);
          break;
      }
    },
    [currentIndex, flipped, terms.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="sticky top-0 bg-gray-900/90 backdrop-blur border-b border-gray-800 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href={`/sets/${id}`}
            className="text-gray-400 hover:text-white transition"
          >
            ← Back
          </Link>
          <h1 className="font-semibold truncate max-w-[200px] md:max-w-none">
            {studySet.title}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={shuffled ? reset : shuffle}
              className="px-3 py-1 text-sm border border-gray-600 rounded hover:bg-gray-800 transition"
            >
              {shuffled ? "Reset" : "Shuffle"}
            </button>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Card {currentIndex + 1} of {terms.length}</span>
          <span>{Math.round(((currentIndex + 1) / terms.length) * 100)}% complete</span>
        </div>
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / terms.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div
          onClick={() => setFlipped(!flipped)}
          className="relative w-full aspect-[3/2] cursor-pointer perspective-1000"
        >
          <div
            className={`absolute inset-0 transition-all duration-500 transform-style-3d ${
              flipped ? "rotate-y-180" : ""
            }`}
          >
            {/* Front */}
            <div
              className={`absolute inset-0 bg-gray-800 rounded-2xl p-8 flex items-center justify-center backface-hidden ${
                flipped ? "invisible" : ""
              }`}
            >
              <p className="text-3xl md:text-4xl font-medium text-center">
                {currentTerm?.word}
              </p>
            </div>
            {/* Back */}
            <div
              className={`absolute inset-0 bg-indigo-600 rounded-2xl p-8 flex items-center justify-center backface-hidden rotate-y-180 ${
                !flipped ? "invisible" : ""
              }`}
            >
              <p className="text-2xl md:text-3xl text-center">
                {currentTerm?.definition}
              </p>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 mt-4 text-sm">
          Click card or press Space to flip
        </p>
      </div>

      {/* Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <span className="text-gray-400">
            Use arrow keys to navigate
          </span>
          <button
            onClick={next}
            disabled={currentIndex === terms.length - 1}
            className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
