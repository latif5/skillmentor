"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";
import Link from "next/link";

interface Term {
  _id?: Id<"terms">;
  word: string;
  definition: string;
}

export default function EditSetPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as Id<"studySets">;

  const studySet = useQuery(api.studySets.getById, { id });
  const updateStudySet = useMutation(api.studySets.update);
  const bulkDeleteTerms = useMutation(api.terms.bulkDelete);
  const bulkCreateTerms = useMutation(api.terms.bulkCreate);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [terms, setTerms] = useState<Term[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (studySet) {
      setTitle(studySet.title);
      setDescription(studySet.description);
      setTerms(
        studySet.terms.map((t) => ({
          _id: t._id,
          word: t.word,
          definition: t.definition,
        }))
      );
    }
  }, [studySet]);

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

  const addTerm = () => {
    setTerms([...terms, { word: "", definition: "" }]);
  };

  const removeTerm = (index: number) => {
    if (terms.length > 2) {
      setTerms(terms.filter((_, i) => i !== index));
    }
  };

  const updateTerm = (index: number, field: "word" | "definition", value: string) => {
    const newTerms = [...terms];
    newTerms[index][field] = value;
    setTerms(newTerms);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const validTerms = terms.filter((t) => t.word.trim() && t.definition.trim());
    if (validTerms.length < 2) {
      alert("Please add at least 2 terms with both word and definition.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Update study set metadata
      await updateStudySet({
        id,
        title: title.trim(),
        description: description.trim(),
      });

      // Delete old terms and create new ones
      await bulkDeleteTerms({ studySetId: id });
      await bulkCreateTerms({
        studySetId: id,
        terms: validTerms.map((t, i) => ({
          word: t.word,
          definition: t.definition,
          rank: i,
        })),
      });

      router.push(`/sets/${id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to update study set");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit study set</h1>
          <Link href={`/sets/${id}`} className="text-gray-500 hover:text-gray-700">
            Cancel
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title & Description */}
          <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description..."
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Terms */}
          <div className="space-y-4">
            {terms.map((term, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border p-4">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium text-gray-500">{index + 1}</span>
                  {terms.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeTerm(index)}
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      value={term.word}
                      onChange={(e) => updateTerm(index, "word", e.target.value)}
                      placeholder="Enter term"
                      className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 outline-none bg-transparent"
                    />
                    <label className="text-xs text-gray-500 mt-1 block">TERM</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={term.definition}
                      onChange={(e) => updateTerm(index, "definition", e.target.value)}
                      placeholder="Enter definition"
                      className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 outline-none bg-transparent"
                    />
                    <label className="text-xs text-gray-500 mt-1 block">DEFINITION</label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Term Button */}
          <button
            type="button"
            onClick={addTerm}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-indigo-500 hover:text-indigo-500 transition font-medium"
          >
            + ADD CARD
          </button>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Link
              href={`/sets/${id}`}
              className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
