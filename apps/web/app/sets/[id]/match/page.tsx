"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import Link from "next/link";

interface Card {
  id: string;
  text: string;
  type: "term" | "definition";
  termIndex: number;
  matched: boolean;
}

export default function MatchPage() {
  const params = useParams();
  const id = params.id as Id<"studySets">;

  const studySet = useQuery(api.studySets.getById, { id });
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<Card | null>(null);
  const [matches, setMatches] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const terms = studySet?.terms || [];

  useEffect(() => {
    if (terms.length > 0 && cards.length === 0) {
      initializeGame();
    }
  }, [terms]);

  const initializeGame = () => {
    const termCards: Card[] = terms.slice(0, 6).map((term, i) => ({
      id: `term-${i}`,
      text: term.word,
      type: "term" as const,
      termIndex: i,
      matched: false,
    }));

    const defCards: Card[] = terms.slice(0, 6).map((term, i) => ({
      id: `def-${i}`,
      text: term.definition,
      type: "definition" as const,
      termIndex: i,
      matched: false,
    }));

    const allCards = [...termCards, ...defCards].sort(() => Math.random() - 0.5);
    setCards(allCards);
    setStartTime(Date.now());
    setGameStarted(true);
  };

  const handleCardClick = (card: Card) => {
    if (card.matched) return;

    if (!selected) {
      setSelected(card);
    } else {
      if (selected.id === card.id) {
        setSelected(null);
        return;
      }

      if (
        selected.termIndex === card.termIndex &&
        selected.type !== card.type
      ) {
        // Match!
        setCards(
          cards.map((c) =>
            c.termIndex === card.termIndex ? { ...c, matched: true } : c
          )
        );
        setMatches(matches + 1);
        setSelected(null);

        if (matches + 1 === 6) {
          setEndTime(Date.now());
        }
      } else {
        // No match
        setTimeout(() => setSelected(null), 500);
      }
    }
  };

  if (studySet === undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!studySet || terms.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No terms found</h1>
          <Link href={`/sets/${id}`} className="text-purple-200 hover:underline">
            Go back
          </Link>
        </div>
      </div>
    );
  }

  const elapsedTime = endTime
    ? Math.round((endTime - startTime) / 1000)
    : Math.round((Date.now() - startTime) / 1000);

  if (endTime) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white">
        <div className="max-w-md w-full text-center p-8">
          <div className="text-7xl mb-6">🏆</div>
          <h1 className="text-4xl font-bold mb-4">You won!</h1>
          <p className="text-2xl mb-8">Time: {elapsedTime}s</p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setCards([]);
                setSelected(null);
                setMatches(0);
                setEndTime(null);
                setGameStarted(false);
                initializeGame();
              }}
              className="w-full py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition"
            >
              Play Again
            </button>
            <Link
              href={`/sets/${id}`}
              className="block w-full py-3 border-2 border-white rounded-lg hover:bg-white/10 transition"
            >
              Back to Set
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex justify-between items-center">
          <Link href={`/sets/${id}`} className="text-purple-200 hover:text-white transition">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold">{studySet.title} - Match</h1>
          <div className="text-lg">
            {matches}/6 • {elapsedTime}s
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              disabled={card.matched}
              className={`p-6 rounded-xl font-medium text-lg transition-all ${
                card.matched
                  ? "bg-green-500/30 opacity-50 cursor-not-allowed"
                  : selected?.id === card.id
                  ? "bg-yellow-400 text-purple-900 scale-105"
                  : card.type === "term"
                  ? "bg-white/20 hover:bg-white/30 hover:scale-105"
                  : "bg-purple-800/50 hover:bg-purple-800/70 hover:scale-105"
              }`}
            >
              <div className="line-clamp-3">{card.text}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="max-w-6xl mx-auto px-4 mt-8 text-center text-purple-200">
        <p>Click on a term and its matching definition to make a pair!</p>
      </div>
    </div>
  );
}
