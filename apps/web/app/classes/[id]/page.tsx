"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Id } from "../../../convex/_generated/dataModel";

export default function ViewClassPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as Id<"classes">;

  const classData = useQuery(api.classes.getById, { id });
  const removeClass = useMutation(api.classes.remove);

  if (classData === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (classData === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Class not found</h1>
          <Link href="/" className="text-indigo-600 hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this class?")) {
      await removeClass({ id });
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <Link href="/" className="text-indigo-200 hover:text-white mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold mb-2">{classData.name}</h1>
          <p className="text-indigo-100">{classData.description || "No description"}</p>
          <p className="text-sm text-indigo-200 mt-4">
            Created by {classData.creator?.name || "Unknown"} • {classData.members.length} members
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                  href="/sets/create"
                  className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition"
                >
                  <div className="text-2xl mb-2">📝</div>
                  <div className="text-sm font-medium">Create Set</div>
                </Link>
                <button className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition">
                  <div className="text-2xl mb-2">📋</div>
                  <div className="text-sm font-medium">Assignment</div>
                </button>
                <button className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition">
                  <div className="text-2xl mb-2">👥</div>
                  <div className="text-sm font-medium">Invite</div>
                </button>
                <button className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition">
                  <div className="text-2xl mb-2">⚙️</div>
                  <div className="text-sm font-medium">Settings</div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="text-gray-500 text-center py-8">
                No recent activity yet
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Members */}
            <div className="bg-white rounded-xl border p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Members</h2>
                <span className="text-sm text-gray-500">{classData.members.length}</span>
              </div>
              <div className="space-y-3">
                {classData.members.map((member) => (
                  <div key={member._id} className="flex items-center gap-3">
                    {member.user?.image ? (
                      <img
                        src={member.user.image}
                        alt={member.user.name || ""}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                        {member.user?.name?.[0] || "?"}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {member.user?.name || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-xl border border-red-200 p-6">
              <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
              <button
                onClick={handleDelete}
                className="w-full py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
              >
                Delete Class
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
