"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, ArrowLeft, Loader2, Type, AlignLeft } from "lucide-react";
import Navbar from "../../components/Navbar";

export default function CreateClassPage() {
  const router = useRouter();
  const createClass = useMutation(api.classes.create);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const id = await createClass({
        name: name.trim(),
        description: description.trim() || undefined,
      });
      router.push(`/classes/${id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to create class");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 relative overflow-hidden flex flex-col">
      <Navbar backLink={{ href: "/", label: "Back to Dashboard" }} />

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-lg mb-20 animate-fade-up">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-white border border-indigo-50 rounded-2xl shadow-sm mb-6 relative group">
              <GraduationCap size={32} className="text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight mb-3">Create a new class</h1>
            <p className="text-zinc-500 text-lg">Collaborate and learn together.</p>
          </div>

          <form onSubmit={handleSubmit} className="relative">
             <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl border border-zinc-200/60 p-8 space-y-6">
              
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700 ml-1 flex items-center gap-1.5">
                  <Type size={14} className="text-indigo-500" />
                  Class Name
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Advanced Biology"
                    className="w-full pl-5 pr-4 py-3.5 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-900 group-hover:bg-white"
                    required
                    autoFocus
                  />
                  <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 pointer-events-none"></div>
                </div>
              </div>

              {/* Description Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700 ml-1 flex items-center gap-1.5">
                  <AlignLeft size={14} className="text-purple-500" />
                  Description <span className="text-zinc-400 font-normal ml-auto text-xs">Optional</span>
                </label>
                <div className="relative group">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What will you study in this class?"
                    rows={4}
                    className="w-full pl-5 pr-4 py-3.5 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-400 resize-none font-medium text-zinc-900 group-hover:bg-white"
                  />
                   <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 pointer-events-none"></div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !name.trim()}
                className="w-full relative py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-base"
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Create Class
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
