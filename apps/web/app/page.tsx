"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Brain, Plus, Folder, Settings, Search, Library, Users, GraduationCap, ArrowRight, MoreVertical, LogOut, ChevronDown } from "lucide-react";
import Navbar from "./components/Navbar";

export default function Dashboard() {
  const { user, isSignedIn, isLoaded } = useUser();
  const convexUser = useQuery(api.users.current);
  const studySets = useQuery(api.studySets.list);
  const classes = useQuery(api.classes.list);
  const storeUser = useMutation(api.users.store);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const router = useRouter();

  // Store user in Convex when they sign in
  useEffect(() => {
    if (isSignedIn) {
      storeUser();
    }
  }, [isSignedIn, storeUser]);



  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center">
        <div className="bg-white p-12 rounded-[2rem] shadow-xl border border-zinc-200 text-center max-w-md w-full animate-fade-up">
          <div className="flex justify-center mb-6">
            <div className="flex text-white bg-gradient-to-b from-indigo-600 to-indigo-800 w-12 h-12 rounded-xl items-center justify-center shadow-lg">
              <Brain size={24} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 mb-2 tracking-tight">Welcome to SkillMentor</h1>
          <p className="text-zinc-500 mb-8 leading-relaxed">The ultimate platform for learning faster and smarter.</p>
          <Link
            href="/login"
            className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            Sign In to Get Started
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 font-sans text-zinc-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 space-y-16">
        
        {/* Study Sets Section */}
        <section className="animate-fade-up delay-100">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Your Study Sets</h2>
              <p className="text-zinc-500 mt-1 text-sm">Pick up where you left off</p>
            </div>
            <Link 
              href="/sets/create" 
              className="group flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-indigo-50"
            >
              Create new
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {studySets === undefined ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-zinc-200 p-6 h-48 animate-pulse shadow-sm">
                  <div className="h-5 bg-zinc-100 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-zinc-100 rounded w-full mb-2"></div>
                  <div className="h-3 bg-zinc-100 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : studySets.length === 0 ? (
            <div className="bg-white rounded-[2rem] border border-zinc-200 border-dashed p-16 flex flex-col items-center justify-center text-center hover:border-indigo-200 hover:bg-indigo-50/10 transition-colors group">
              <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-6 border border-indigo-100 shadow-sm group-hover:scale-110 transition-transform">
                <Library size={32} />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">No study sets created yet</h3>
              <p className="text-zinc-500 mb-8 max-w-sm mx-auto">
                Create your first study set to start mastering new topics with flashcards and quizzes.
              </p>
              <Link
                href="/sets/create"
                className="px-6 py-3 bg-white border border-zinc-200 text-zinc-900 font-semibold rounded-xl hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm flex items-center gap-2"
              >
                <Plus size={18} className="text-indigo-600" />
                Create Study Set
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {studySets.map((set) => (
                <Link
                  key={set._id}
                  href={`/sets/${set._id}`}
                  className="group bg-white rounded-2xl border border-zinc-200 hover:border-indigo-300 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out relative flex flex-col h-full min-h-[180px]"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-zinc-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
                      {set.title}
                    </h3>
                    <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed">
                      {set.description || "No description provided."}
                    </p>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-zinc-100">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-zinc-100 text-zinc-600 rounded-md text-xs font-medium uppercase tracking-wider">
                        {set.termsCount || 0} Terms
                      </span>
                    </div>
                    {/* User Avatar Mini */}
                    {user?.imageUrl && (
                      <img src={user.imageUrl} className="w-6 h-6 rounded-full border border-zinc-200 opacity-60 grayscale group-hover:grayscale-0 transition-all" alt="user" />
                    )}
                  </div>
                  
                  {/* Decorative Gradient on Hover */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl origin-left"></div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Classes Section */}
        <section className="animate-fade-up delay-200">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Your Classes</h2>
              <p className="text-zinc-500 mt-1 text-sm">Collaborate with others</p>
            </div>
            <Link 
              href="/classes/new" 
              className="group flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-indigo-50"
            >
              Create new
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {classes === undefined ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-zinc-200 p-6 h-48 animate-pulse shadow-sm">
                   <div className="h-5 bg-zinc-100 rounded w-1/2 mb-4"></div>
                   <div className="h-3 bg-zinc-100 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : classes.length === 0 ? (
            <div className="bg-white rounded-[2rem] border border-zinc-200 border-dashed p-16 flex flex-col items-center justify-center text-center hover:border-indigo-200 hover:bg-indigo-50/10 transition-colors group">
              <div className="w-20 h-20 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mb-6 border border-purple-100 shadow-sm group-hover:scale-110 transition-transform">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">No classes joined yet</h3>
              <p className="text-zinc-500 mb-8 max-w-sm mx-auto">
                Join a class to share study sets and compete with friends or classmates.
              </p>
              <Link
                href="/classes/new"
                className="px-6 py-3 bg-white border border-zinc-200 text-zinc-900 font-semibold rounded-xl hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm flex items-center gap-2"
              >
                <Plus size={18} className="text-purple-600" />
                Create or Join Class
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {classes.map((cls: any) => (
                <Link
                  key={cls._id}
                  href={`/classes/${cls._id}`}
                  className="group bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white hover:shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col h-full min-h-[160px]"
                >
                  {/* Decorative Circles */}
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:bg-white/20 transition-colors"></div>
                  <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-16 h-16 bg-black/10 rounded-full blur-xl pointer-events-none"></div>

                  <div className="relative z-10 flex-1">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                       <GraduationCap size={20} className="text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-1 tracking-tight">{cls.name}</h3>
                    <p className="text-indigo-100 text-sm line-clamp-2 font-medium opacity-90">
                      {cls.description || "No description"}
                    </p>
                  </div>
                  
                  <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-medium text-white/80">
                     <span>{cls.membersCount || 1} Members</span>
                     <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
