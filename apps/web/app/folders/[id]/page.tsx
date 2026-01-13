"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Id } from "../../../convex/_generated/dataModel";

export default function ViewFolderPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as Id<"folders">;

  const folder = useQuery(api.folders.getById, { id });
  const removeFolder = useMutation(api.folders.remove);

  if (folder === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (folder === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Folder not found</h1>
          <Link href="/folders" className="text-indigo-600 hover:underline">
            Go back
          </Link>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this folder?")) {
      await removeFolder({ id });
      router.push("/folders");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-indigo-600">
            SkillMentor
          </Link>
          <Link href="/folders" className="text-gray-500 hover:text-gray-700">
            ← Back to Folders
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="text-4xl">📁</div>
              <h1 className="text-3xl font-bold text-gray-900">{folder.title}</h1>
            </div>
            <p className="text-gray-600">{folder.description || "No description"}</p>
            <p className="text-sm text-gray-500 mt-2">
              Created by {folder.creator?.name || "Unknown"}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Study Sets in Folder */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Study Sets</h2>
          <div className="bg-white rounded-xl border p-12 text-center">
            <div className="text-5xl mb-4">📚</div>
            <p className="text-gray-600 mb-4">No study sets in this folder yet</p>
            <p className="text-sm text-gray-500">
              Feature coming soon: Add study sets to folders
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
