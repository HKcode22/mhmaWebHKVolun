"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Heart,
  LogOut,
  Edit,
  Plus,
  Trash2,
  BookOpen,
} from "lucide-react";
import Navigation from "@/components/Navigation";

interface Program {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  parent: number;
  acf?: {
    programTitle?: string;
    programDescription?: string;
  };
}

export default function DashboardPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [events, setEvents] = useState<Program[]>([]);
  const [journals, setJournals] = useState<Program[]>([]);
  const [eventRequests, setEventRequests] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("jwt_token");
    const userRole = localStorage.getItem("user_role");
    const username = localStorage.getItem("username");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    setUser({ username: username || "Board Member", role: userRole || "board_member" });

    // Fetch programs, events, journals, and event requests
    fetchPrograms();
    fetchEvents();
    fetchJournals();
    fetchEventRequests();
  }, []);

  const fetchPrograms = async () => {
    try {
      const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://mhma-update.local/wp-json";
      const token = localStorage.getItem("jwt_token");

      const response = await fetch(`${WP_API_URL}/wp/v2/pages?parent=70&per_page=100`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch programs");
      }

      const data = await response.json();
      setPrograms(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load programs");
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://mhma-update.local/wp-json";
      const token = localStorage.getItem("jwt_token");

      const response = await fetch(`${WP_API_URL}/wp/v2/pages?parent=277&per_page=100`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();
      setEvents(data);
    } catch (err) {
      console.error("Failed to load events:", err);
    }
  };

  const fetchJournals = async () => {
    try {
      const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://mhma-update.local/wp-json";
      const token = localStorage.getItem("jwt_token");

      const response = await fetch(`${WP_API_URL}/wp/v2/pages?parent=199&per_page=100`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch journals");
      }

      const data = await response.json();
      setJournals(data);
    } catch (err) {
      console.error("Failed to load journals:", err);
    }
  };

  const fetchEventRequests = async () => {
    try {
      const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://mhma-update.local/wp-json";
      const token = localStorage.getItem("jwt_token");

      // Fetch pages with status=pending (event scheduling requests)
      const response = await fetch(`${WP_API_URL}/wp/v2/pages?status=pending&per_page=100`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch event requests");
      }

      const data = await response.json();
      setEventRequests(data);
    } catch (err) {
      console.error("Failed to load event requests:", err);
    }
  };

  const handleDeleteProgram = async (programId: number, programTitle: string) => {
    if (deletingId === programId) {
      return; // Prevent double-click
    }

    if (!confirm(`Are you sure you want to delete "${programTitle}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(programId);

    try {
      const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://mhma-update.local/wp-json";
      const token = localStorage.getItem("jwt_token");
      const userRole = localStorage.getItem("user_role");

      console.log("=== DELETE PROGRAM START ===");
      console.log("Program ID:", programId);
      console.log("Program Title:", programTitle);
      console.log("Token exists:", !!token);
      console.log("User role:", userRole);
      console.log("Delete URL:", `${WP_API_URL}/wp/v2/pages/${programId}?force=true`);

      // Try force delete first
      let response = await fetch(`${WP_API_URL}/wp/v2/pages/${programId}?force=true`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Delete response status:", response.status);

      // If force delete fails with 403, try moving to trash instead
      if (response.status === 403) {
        console.log("Force delete failed, trying to move to trash...");
        response = await fetch(`${WP_API_URL}/wp/v2/pages/${programId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Trash response status:", response.status);
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Delete failed. Response:", errorText);

        if (response.status === 403) {
          setError("Permission denied: Your WordPress user account doesn't have permission to delete pages. Please contact the administrator to grant 'delete_pages' capability to the subscriber role in WordPress, or log in as an administrator.");
        } else if (response.status === 404) {
          setError("Item already deleted or not found. Refreshing list...");
          fetchPrograms();
          fetchEvents();
          fetchJournals();
        } else {
          throw new Error(`Failed to delete program: ${response.status} - ${errorText}`);
        }
      } else {
        console.log("Delete successful");
        // Refresh programs list
        fetchPrograms();
        fetchEvents();
        fetchJournals();
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(err instanceof Error ? err.message : "Failed to delete program");
    } finally {
      setDeletingId(null);
    }
  };

  // Hardcoded program slugs that should not show delete button
  const hardcodedProgramSlugs = [
    "arabic-academy",
    "boy-scouts",
    "ladies-meetup",
    "youth-sports-league",
    "family-night",
    "jummah-and-salah",
    "learn-3d-printing",
    "maktab-program",
    "quran-hifz-program",
    "urdu-academy",
    "wish",
    "islamic-center-of-mountain-house",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage="dashboard" />

      {/* Main Content */}
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Board Member Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome, {user?.username}! Manage your programs and events here.</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link
              href="/dashboard/programs/new"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="flex items-center">
                <Plus className="h-8 w-8 text-[#c9a227] mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Add New Program</h3>
                  <p className="text-sm text-gray-600">Create a new program page</p>
                </div>
              </div>
            </Link>
            <Link
              href="/dashboard/events/new"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="flex items-center">
                <Plus className="h-8 w-8 text-[#c9a227] mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Add New Event</h3>
                  <p className="text-sm text-gray-600">Create a new event poster</p>
                </div>
              </div>
            </Link>
            <Link
              href="/dashboard/journal/new"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-[#c9a227] mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Add Journal Entry</h3>
                  <p className="text-sm text-gray-600">Create a new journal entry</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Programs Section */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Programs</h2>
            </div>
            <div className="p-6">
              {loading ? (
                <p className="text-gray-600">Loading programs...</p>
              ) : programs.length === 0 ? (
                <p className="text-gray-600">No programs found.</p>
              ) : (
                <div className="space-y-4">
                  {programs.map((program) => (
                    <div
                      key={program.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">{program.title.rendered}</h3>
                        <p className="text-sm text-gray-600">Slug: {program.slug}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/dashboard/programs/edit?id=${program.id}`}
                          className="p-2 text-[#c9a227] hover:bg-[#c9a227]/10 rounded-md transition-colors"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        {!hardcodedProgramSlugs.includes(program.slug) && (
                          <button
                            onClick={() => handleDeleteProgram(program.id, program.title.rendered)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Events Section */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Events</h2>
            </div>
            <div className="p-6">
              {events.length === 0 ? (
                <p className="text-gray-600">No events found.</p>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">{event.title.rendered}</h3>
                        <p className="text-sm text-gray-600">Slug: {event.slug}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/dashboard/events/edit?id=${event.id}`}
                          className="p-2 text-[#c9a227] hover:bg-[#c9a227]/10 rounded-md transition-colors"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDeleteProgram(event.id, event.title.rendered)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Journal Section */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Journal</h2>
            </div>
            <div className="p-6">
              {journals.length === 0 ? (
                <p className="text-gray-600">No journal entries found.</p>
              ) : (
                <div className="space-y-4">
                  {journals.map((journal) => (
                    <div
                      key={journal.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">{journal.title.rendered}</h3>
                        <p className="text-sm text-gray-600">Slug: {journal.slug}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/dashboard/journal/edit?id=${journal.id}`}
                          className="p-2 text-[#c9a227] hover:bg-[#c9a227]/10 rounded-md transition-colors"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDeleteProgram(journal.id, journal.title.rendered)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Event Scheduling Requests Section */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Event Scheduling Requests</h2>
            </div>
            <div className="p-6">
              {eventRequests.length === 0 ? (
                <p className="text-gray-600">No event scheduling requests found.</p>
              ) : (
                <div className="space-y-4">
                  {eventRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors border border-amber-200"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">{request.title.rendered}</h3>
                        <p className="text-sm text-gray-600">Status: Pending Review</p>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/dashboard/events/edit?id=${request.id}`}
                          className="p-2 text-[#c9a227] hover:bg-[#c9a227]/10 rounded-md transition-colors"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDeleteProgram(request.id, request.title.rendered)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <Image
                src="https://mhma.us/wp-content/uploads/2023/12/MHMA-Site-Logo-345x70-1.webp"
                alt="MHMA Logo"
                width={200}
                height={45}
                className="h-12 w-auto"
              />
            </div>
            <div className="flex space-x-4 mb-8">
              <a
                href="https://www.facebook.com/mhma95391"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a227] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/mhma.ig/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a227] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/i/flow/login?redirect_after_login=%2Fmhmatweets"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a227] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/mountain-house-muslim-association/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a227] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@MHMAYouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a227] transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div className="text-center text-gray-400 text-sm">
              <p>Copyright 2024 MHMA - Mountain House Muslim Association</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
