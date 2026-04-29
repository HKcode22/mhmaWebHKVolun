"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function EditJournalEntryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const journalId = searchParams.get("id");

  const [formData, setFormData] = useState({
    title: "",
    datePublished: "",
    dateHeldOn: "",
    attendees: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!journalId) {
      setError("No journal ID provided");
      setLoading(false);
      return;
    }

    fetchJournalEntry();
  }, [journalId]);

  const fetchJournalEntry = async () => {
    try {
      const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://mhma-update.local/wp-json";
      const token = localStorage.getItem("jwt_token");

      const response = await fetch(`${WP_API_URL}/wp/v2/pages/${journalId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch journal entry");
      }

      const data = await response.json();
      console.log("Journal entry data:", data);

      setFormData({
        title: data.title.rendered,
        datePublished: data.acf?.date_published || "",
        dateHeldOn: data.acf?.date_held_on || "",
        attendees: data.acf?.attendees || "",
        content: data.acf?.content || data.content.rendered || "",
      });
    } catch (err) {
      console.error("Error fetching journal entry:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch journal entry");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://mhma-update.local/wp-json";
      const token = localStorage.getItem("jwt_token");

      const response = await fetch(`${WP_API_URL}/wp/v2/pages/${journalId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          acf: {
            journal_title: formData.title,
            date_published: formData.datePublished,
            date_held_on: formData.dateHeldOn,
            attendees: formData.attendees,
            content: formData.content,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update journal entry: ${response.status} - ${errorText}`);
      }

      console.log("Journal entry updated");
      router.push("/dashboard");
    } catch (err) {
      console.error("Error updating journal entry:", err);
      setError(err instanceof Error ? err.message : "Failed to update journal entry");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation currentPage="dashboard" />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p>Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation currentPage="dashboard" />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">{error}</p>
            </div>
            <Link href="/dashboard" className="text-[#c9a227] hover:underline">
              ← Back to Dashboard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage="dashboard" />

      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="text-[#c9a227] hover:underline mb-4 inline-block"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">Edit Journal Entry</h1>
            <p className="text-gray-600 mt-2">Update journal entry for board meeting minutes</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Form */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#c9a227] focus:border-transparent"
                  />
                </div>

                {/* Date Published */}
                <div>
                  <label htmlFor="datePublished" className="block text-sm font-medium text-gray-700 mb-2">
                    Date Published *
                  </label>
                  <input
                    type="date"
                    id="datePublished"
                    required
                    value={formData.datePublished}
                    onChange={(e) => setFormData({ ...formData, datePublished: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#c9a227] focus:border-transparent"
                  />
                </div>

                {/* Date Held On */}
                <div>
                  <label htmlFor="dateHeldOn" className="block text-sm font-medium text-gray-700 mb-2">
                    Date Held On *
                  </label>
                  <input
                    type="date"
                    id="dateHeldOn"
                    required
                    value={formData.dateHeldOn}
                    onChange={(e) => setFormData({ ...formData, dateHeldOn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#c9a227] focus:border-transparent"
                  />
                </div>

                {/* Attendees */}
                <div>
                  <label htmlFor="attendees" className="block text-sm font-medium text-gray-700 mb-2">
                    Attendees
                  </label>
                  <input
                    type="text"
                    id="attendees"
                    value={formData.attendees}
                    onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#c9a227] focus:border-transparent"
                    placeholder="e.g., Umar Sear, Asad Siddiqui, Saqib Malik"
                  />
                </div>

                {/* Content */}
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    id="content"
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={15}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#c9a227] focus:border-transparent"
                    placeholder="Enter the meeting minutes content. You can use HTML tags for formatting."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tip: You can use HTML tags for formatting (e.g., p, strong, ul, li)
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <Link
                    href="/dashboard"
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 bg-[#c9a227] text-white rounded-md hover:bg-[#8c7622] transition-colors disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
