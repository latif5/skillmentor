"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Id } from "../../../convex/_generated/dataModel";

export default function ViewSetPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as Id<"studySets">;
  
  const studySet = useQuery(api.studySets.getById, { id });
  const removeStudySet = useMutation(api.studySets.remove);
  
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (studySet === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (studySet === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Study set not found</h1>
          <Link href="/" className="text-indigo-600 hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const terms = studySet.terms || [];

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this study set?")) {
      await removeStudySet({ id });
      router.push("/");
    }
  };

  const nextCard = () => {
    setFlipped(false);
    setCurrentCard((prev) => (prev + 1) % terms.length);
  };

  const prevCard = () => {
    setFlipped(false);
    setCurrentCard((prev) => (prev - 1 + terms.length) % terms.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{studySet.title}</h1>
            <p className="text-gray-600 mt-1">{studySet.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              {terms.length} terms • Created by {studySet.creator?.name || "Unknown"}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/sets/${id}/edit`}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Study Modes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link
            href={`/sets/${id}/flashcards`}
            className="p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition text-left"
          >
            <div className="text-2xl mb-2">📚</div>
            <div className="font-semibold">Flashcards</div>
          </Link>
          <Link
            href={`/sets/${id}/learn`}
            className="p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition text-left"
          >
            <div className="text-2xl mb-2">🧠</div>
            <div className="font-semibold">Learn</div>
          </Link>
          <Link
            href={`/sets/${id}/test`}
            className="p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition text-left"
          >
            <div className="text-2xl mb-2">📝</div>
            <div className="font-semibold">Test</div>
          </Link>
          <Link
            href={`/sets/${id}/match`}
            className="p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition text-left"
          >
            <div className="text-2xl mb-2">🎮</div>
            <div className="font-semibold">Match</div>
          </Link>
        </div>

        {/* Flashcard Preview */}
        {terms.length > 0 && (
          <div className="mb-8">
            <div
              onClick={() => setFlipped(!flipped)}
              className="bg-white rounded-2xl shadow-lg border p-12 min-h-[300px] flex items-center justify-center cursor-pointer hover:shadow-xl transition"
            >
              <p className="text-2xl text-center font-medium text-gray-900">
                {flipped ? terms[currentCard].definition : terms[currentCard].word}
              </p>
            </div>
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                onClick={prevCard}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                ←
              </button>
              <span className="text-gray-600">
                {currentCard + 1} / {terms.length}
              </span>
              <button
                onClick={nextCard}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                →
              </button>
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">Click card to flip</p>
          </div>
        )}

        {/* Terms List */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Terms in this set ({terms.length})
          </h2>
          <div className="space-y-3">
            {terms.map((term, index) => (
              <div
                key={term._id}
                className="bg-white rounded-lg border p-4 flex items-center"
              >
                <span className="text-gray-400 w-8">{index + 1}</span>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="font-medium">{term.word}</div>
                  <div className="text-gray-600">{term.definition}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
