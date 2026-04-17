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
  acf?: {
    programTitle?: string;
    programDescription?: string;
  };
}

export default function DashboardPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

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

    // Fetch programs
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://mhma-update.local/wp-json";
      const token = localStorage.getItem("jwt_token");

      const response = await fetch(`${WP_API_URL}/wp/v2/pages?per_page=100&parent=0`, {
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
              href="/"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-[#c9a227] mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">View Website</h3>
                  <p className="text-sm text-gray-600">See the public site</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Programs Section */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
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
