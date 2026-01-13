"use client";

import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useState } from "react";
import { 
  Brain, 
  Plus, 
  Folder, 
  Settings, 
  Library, 
  GraduationCap, 
  LogOut, 
  ChevronDown,
  ArrowRight
} from "lucide-react";

interface NavbarProps {
  backLink?: {
    href: string;
    label: string;
  };
}

export default function Navbar({ backLink }: NavbarProps) {
  const { user } = useUser();
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo & Search */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex text-white bg-gradient-to-b from-indigo-600 to-indigo-800 w-8 h-8 rounded-lg items-center justify-center shadow-md transition-transform duration-500 group-hover:rotate-[360deg]">
              <Brain size={18} />
            </div>
            <span className="text-sm font-bold tracking-tight uppercase hidden md:block">
              Skill<span className="text-zinc-500 font-normal ml-0.5">Mentor</span>
            </span>
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          {backLink ? (
            <Link 
              href={backLink.href} 
              className="text-sm font-medium text-zinc-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
            >
              <ArrowRight size={16} className="rotate-180" />
              {backLink.label}
            </Link>
          ) : (
            <>
              {/* Create Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowCreateMenu(!showCreateMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:scale-95"
                >
                  <Plus size={16} />
                  <span>Create</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${showCreateMenu ? 'rotate-180' : ''}`} />
                </button>
                
                {showCreateMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowCreateMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-zinc-100 py-2 z-50 animate-fade-scale overflow-hidden">
                      <div className="px-4 py-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Create New
                      </div>
                      <Link
                        href="/sets/create"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                        onClick={() => setShowCreateMenu(false)}
                      >
                        <Library size={18} />
                        Study Set
                      </Link>
                      <Link
                        href="/classes/new"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                        onClick={() => setShowCreateMenu(false)}
                      >
                        <GraduationCap size={18} />
                        Class
                      </Link>
                      <Link
                        href="/folders/create"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                        onClick={() => setShowCreateMenu(false)}
                      >
                        <Folder size={18} />
                        Folder
                      </Link>
                    </div>
                  </>
                )}
              </div>

              {/* Nav Links */}
              <Link 
                href="/folders" 
                className="hidden md:flex flex-col items-center gap-1 text-zinc-500 hover:text-indigo-600 transition-colors group relative"
              >
                <div className="p-1.5 rounded-lg group-hover:bg-indigo-50 transition-colors">
                  <Folder size={20} strokeWidth={2} />
                </div>
              </Link>
            </>
          )}

          {/* User Profile */}
          <div className="h-8 w-[1px] bg-zinc-200 mx-2 hidden md:block"></div>
          
          <div className="flex items-center gap-3 pl-2">
            <div className="flex flex-col items-end hidden md:flex">
              <span className="text-sm font-semibold text-zinc-900 leading-none">{user?.firstName}</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">Student</span>
            </div>
            <div className="relative group cursor-pointer">
              <div className="p-0.5 rounded-full ring-2 ring-transparent bg-gradient-to-tr from-indigo-500 to-purple-500 group-hover:ring-offset-2 transition-all">
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={user.firstName || "User"}
                    className="w-9 h-9 rounded-full border-2 border-white"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-zinc-200 flex items-center justify-center border-2 border-white">
                    <span className="text-xs font-bold text-zinc-500">
                      {user?.firstName?.charAt(0) || "U"}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Profile Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-zinc-100 py-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 transform origin-top-right z-50">
                 <div className="px-4 py-3 border-b border-zinc-50 md:hidden">
                  <p className="text-sm font-semibold text-zinc-900">{user?.fullName}</p>
                  <p className="text-xs text-zinc-500 truncate">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
                <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900">
                  <Settings size={16} />
                  Settings
                </Link>
                <SignOutButton>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left">
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </SignOutButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
