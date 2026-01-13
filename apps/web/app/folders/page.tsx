"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { 
  Brain, 
  Plus, 
  Folder, 
  Settings, 
  LogOut,
  ArrowRight,
  Library,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function FoldersPage() {
  const folders = useQuery(api.folders.list);
  const { user } = useUser();
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50/50 font-sans text-zinc-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar */}
      <Navbar backLink={{ href: "/", label: "Back to Dashboard" }} />

      <main className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 space-y-8 animate-fade-up">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Your Folders</h1>
            <p className="text-zinc-500 mt-1 text-sm">Organize your study materials</p>
          </div>
          <Link
            href="/folders/create"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:scale-95"
          >
            <Plus size={18} />
            Create Folder
          </Link>
        </div>

        {folders === undefined ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-zinc-200 p-6 h-40 animate-pulse shadow-sm">
                <div className="h-5 bg-zinc-100 rounded w-1/2 mb-4"></div>
                <div className="h-3 bg-zinc-100 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : folders.length === 0 ? (
          <div className="bg-white rounded-[2rem] border border-zinc-200 border-dashed p-16 flex flex-col items-center justify-center text-center hover:border-indigo-200 hover:bg-indigo-50/10 transition-colors group">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-6 border border-indigo-100 shadow-sm group-hover:scale-110 transition-transform">
              <Folder size={32} />
            </div>
            <h2 className="text-lg font-semibold text-zinc-900 mb-2">
              No folders created yet
            </h2>
            <p className="text-zinc-500 mb-8 max-w-sm mx-auto">
              Create folders to organize your study sets and keep your dashboard clean.
            </p>
            <Link
              href="/folders/create"
              className="px-6 py-3 bg-white border border-zinc-200 text-zinc-900 font-semibold rounded-xl hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm flex items-center gap-2"
            >
              <Plus size={18} className="text-indigo-600" />
              Create Folder
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {folders.map((folder) => (
              <Link
                key={folder._id}
                href={`/folders/${folder._id}`}
                className="group bg-white rounded-2xl border border-zinc-200 hover:border-indigo-300 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out relative flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0 text-indigo-600 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Folder size={24} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-zinc-900 mb-1 leading-tight group-hover:text-indigo-600 transition-colors truncate">
                    {folder.title}
                  </h3>
                  <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed">
                    {folder.description || "No description provided."}
                  </p>
                </div>

                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight size={16} className="text-indigo-400" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
