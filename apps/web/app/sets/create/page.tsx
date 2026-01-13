"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { 
  Save, 
  Trash2, 
  Type, 
  AlignLeft, 
  Layout, 
  Sparkles,
  ArrowRight,
  Plus
} from "lucide-react";
import Navbar from "../../components/Navbar";

interface Term {
  word: string;
  definition: string;
}

export default function CreateSetPage() {
  const router = useRouter();
  const createStudySet = useMutation(api.studySets.create);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [terms, setTerms] = useState<Term[]>([
    { word: "", definition: "" },
    { word: "", definition: "" },
    { word: "", definition: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const id = await createStudySet({
        title: title.trim(),
        description: description.trim(),
        terms: validTerms,
      });
      router.push(`/sets/${id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to create study set");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-20">
      <Navbar backLink={{ href: "/", label: "Back to Dashboard" }} />
      <div className="max-w-5xl mx-auto px-6 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-up">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Create new study set</h1>
            <p className="text-zinc-500 mt-1">Design a custom learning experience</p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !title.trim()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none hover:-translate-y-0.5"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            <span>{isSubmitting ? "Creating..." : "Create Set"}</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 animate-fade-up delay-100">
          
          {/* Main Info Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500" />
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Layout size={24} />
                </div>
                <h2 className="text-xl font-semibold text-zinc-900">Set Details</h2>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 flex items-center gap-2">
                    Title 
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-3.5 text-zinc-400">
                      <Type size={18} />
                    </div>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Biology - Chapter 22: Evolution"
                      className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none font-medium placeholder:text-zinc-400"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700">Description</label>
                  <div className="relative">
                    <div className="absolute left-4 top-3.5 text-zinc-400">
                      <AlignLeft size={18} />
                    </div>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="What is this study set about?"
                      rows={3}
                      className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none resize-none placeholder:text-zinc-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                <Sparkles size={20} className="text-amber-500" />
                Flashcards
                <span className="ml-2 px-2.5 py-0.5 bg-zinc-100 text-zinc-500 text-xs font-medium rounded-full">
                  {terms.length} cards
                </span>
              </h2>
            </div>
            
            <div className="space-y-4">
              {terms.map((term, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-xl shadow-sm border border-zinc-200 hover:border-indigo-300 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-5">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 text-zinc-500 text-sm font-bold border border-zinc-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors">
                        {index + 1}
                      </span>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         {terms.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeTerm(index)}
                            className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete card"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Term</label>
                        <div className="relative group/input">
                           <input
                            type="text"
                            value={term.word}
                            onChange={(e) => updateTerm(index, "word", e.target.value)}
                            className="w-full pb-2 bg-transparent border-b-2 border-zinc-200 focus:border-indigo-500 outline-none transition-colors text-zinc-800 font-medium placeholder:text-zinc-300"
                            placeholder="Enter term"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Definition</label>
                        <div className="relative group/input">
                          <input
                            type="text"
                            value={term.definition}
                            onChange={(e) => updateTerm(index, "definition", e.target.value)}
                             className="w-full pb-2 bg-transparent border-b-2 border-zinc-200 focus:border-indigo-500 outline-none transition-colors text-zinc-800 font-medium placeholder:text-zinc-300"
                            placeholder="Enter definition"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover indicator strip */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addTerm}
              className="group w-full py-5 bg-white border-2 border-dashed border-zinc-300 rounded-xl text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/10 transition-all font-semibold flex items-center justify-center gap-2"
            >
              <div className="p-1 bg-zinc-100 rounded-full group-hover:bg-indigo-100 transition-colors">
                 <Plus size={20} />
              </div>
              Add Card
            </button>
            
            <div className="flex justify-end pt-6">
               <button
                type="submit"
                disabled={isSubmitting || !title.trim()}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-xl hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1"
              >
                <span>{isSubmitting ? "Creating Set..." : "Create Study Set"}</span>
                {!isSubmitting && <ArrowRight size={20} />}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
