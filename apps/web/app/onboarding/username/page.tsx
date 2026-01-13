"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function UsernameForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "Student";
  
  const currentUser = useQuery(api.users.current);
  const completeOnboarding = useMutation(api.users.completeOnboarding);
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentUser?.username) {
      setUsername(currentUser.username);
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await completeOnboarding({ username, role });
      router.push("/onboarding/done");
    } catch (err) {
      console.error(err);
      setError("Failed to save username. It might be taken.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose your username</h1>
          <p className="text-gray-600">This is how others will find you</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                placeholder="yourname"
                className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                maxLength={20}
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <p className="text-gray-500 text-sm mt-2">
              Letters, numbers, and underscores only. 3-20 characters.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Complete Setup"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function UsernamePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <UsernameForm />
    </Suspense>
  );
}
