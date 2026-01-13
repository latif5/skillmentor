"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import { 
  ArrowRight, 
  Brain, 
  ChevronRight, 
  Globe, 
  Key, 
  LogOut, 
  Moon, 
  Settings, 
  Shield, 
  User,
  Bell
} from "lucide-react";

export default function SettingsPage() {
  const { user, isLoaded } = useUser();
  const currentUser = useQuery(api.users.current);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 font-sans text-zinc-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
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

          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="text-sm font-medium text-zinc-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
            >
              <ArrowRight size={16} className="rotate-180" />
              Back to Dashboard
            </Link>

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
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 md:px-10 py-10 animate-fade-up">
        <h1 className="text-2xl font-bold text-zinc-900 mb-8 tracking-tight">Settings</h1>

        {/* Profile Card */}
        <section className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-8 mb-8 relative overflow-hidden">
          <div className="relative z-10 flex items-start gap-6">
            <div className="p-1 rounded-full bg-indigo-50 border-2 border-indigo-100">
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="w-20 h-20 rounded-full"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-bold text-2xl">
                  {user?.firstName?.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-zinc-900 mb-1">
                {user?.fullName}
              </h2>
              <p className="text-zinc-500 text-sm mb-4">{user?.primaryEmailAddress?.emailAddress}</p>
              
              <div className="flex gap-3">
                 <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100">
                   <User size={12} />
                   {currentUser?.role || "Student"}
                 </span>
                 <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-medium border border-zinc-200">
                   <Globe size={12} />
                   @{currentUser?.username || "no_username"}
                 </span>
              </div>
            </div>
            
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors">
              Edit Profile
            </button>
          </div>
        </section>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Section: Preferences */}
           <section className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
                <h3 className="font-semibold text-zinc-900 flex items-center gap-2">
                  <Settings size={18} className="text-zinc-500" />
                  Preferences
                </h3>
              </div>
              <div className="divide-y divide-zinc-100">
                <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-zinc-50 transition-colors group">
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
                        <Moon size={18} />
                     </div>
                     <div className="text-left">
                       <p className="text-sm font-medium text-zinc-900">Appearance</p>
                       <p className="text-xs text-zinc-500">Light mode</p>
                     </div>
                  </div>
                  <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-zinc-50 transition-colors group">
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                        <Bell size={18} />
                     </div>
                     <div className="text-left">
                       <p className="text-sm font-medium text-zinc-900">Notifications</p>
                       <p className="text-xs text-zinc-500">Enabled</p>
                     </div>
                  </div>
                  <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
           </section>

           {/* Section: Account & Security */}
           <section className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
                <h3 className="font-semibold text-zinc-900 flex items-center gap-2">
                  <Shield size={18} className="text-zinc-500" />
                  Security
                </h3>
              </div>
              <div className="divide-y divide-zinc-100">
                <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-zinc-50 transition-colors group">
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:scale-110 transition-transform">
                        <Key size={18} />
                     </div>
                     <div className="text-left">
                       <p className="text-sm font-medium text-zinc-900">Password</p>
                       <p className="text-xs text-zinc-500">Last changed 30 days ago</p>
                     </div>
                  </div>
                  <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <SignOutButton>
                  <button className="w-full flex items-center px-6 py-4 hover:bg-red-50 transition-colors group gap-4">
                    <div className="p-2 bg-red-50 text-red-600 rounded-lg group-hover:scale-110 transition-transform">
                        <LogOut size={18} />
                     </div>
                     <div className="text-left">
                       <p className="text-sm font-medium text-red-600">Sign Out</p>
                       <p className="text-xs text-red-400/80">Log out of your account</p>
                     </div>
                  </button>
                </SignOutButton>
              </div>
           </section>
        </div>
      </main>
    </div>
  );
}
