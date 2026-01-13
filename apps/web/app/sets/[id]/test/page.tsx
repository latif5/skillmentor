"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import Link from "next/link";

interface Question {
  term: any;
  type: "multipleChoice" | "written";
  options?: string[];
  correctAnswer: string;
}

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as Id<"studySets">;

  const studySet = useQuery(api.studySets.getById, { id });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const terms = studySet?.terms || [];

  useEffect(() => {
    if (terms.length > 0 && questions.length === 0) {
      generateQuestions();
    }
  }, [terms]);

  const generateQuestions = () => {
    const generatedQuestions: Question[] = terms.map((term, index) => {
      const isMultipleChoice = Math.random() > 0.5;
      
      if (isMultipleChoice) {
        const wrongAnswers = terms
          .filter((_, i) => i !== index)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((t) => t.definition);
        
        const options = [...wrongAnswers, term.definition].sort(() => Math.random() - 0.5);
        
        return {
          term,
          type: "multipleChoice",
          options,
          correctAnswer: term.definition,
        };
      } else {
        return {
          term,
          type: "written",
          correctAnswer: term.definition,
        };
      }
    });

    setQuestions(generatedQuestions);
  };

  if (studySet === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!studySet || terms.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No terms found</h1>
          <Link href={`/sets/${id}`} className="text-indigo-600 hover:underline">
            Go back
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()) {
        correct++;
      }
    });
    setScore(correct);
    setSubmitted(true);
  };

  const currentQuestion = questions[currentIndex];

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (submitted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-6">
            {percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "📚"}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Complete!</h1>
          <p className="text-xl text-gray-600 mb-8">
            You scored {score} out of {questions.length} ({percentage}%)
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
                setCurrentIndex(0);
                generateQuestions();
              }}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Retake Test
            </button>
            <Link
              href={`/sets/${id}`}
              className="block w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Back to Set
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Link href={`/sets/${id}`} className="text-gray-500 hover:text-gray-700">
            ← Back
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">{studySet.title} - Test</h1>
          <div className="text-sm text-gray-500">
            {currentIndex + 1} / {questions.length}
          </div>
        </div>

        {/* Progress */}
        <div className="h-2 bg-gray-200 rounded-full mb-8">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-6">
          <p className="text-sm text-gray-500 mb-2">Question {currentIndex + 1}</p>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {currentQuestion.term.word}
          </h2>

          {currentQuestion.type === "multipleChoice" ? (
            <div className="space-y-3">
              {currentQuestion.options?.map((option, i) => (
                <button
                  key={i}
                  onClick={() => setAnswers({ ...answers, [currentIndex]: option })}
                  className={`w-full p-4 text-left border-2 rounded-lg transition ${
                    answers[currentIndex] === option
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <textarea
              value={answers[currentIndex] || ""}
              onChange={(e) => setAnswers({ ...answers, [currentIndex]: e.target.value })}
              placeholder="Type your answer..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              rows={4}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Submit Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
