"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import Navigation from "@/components/Navigation";

interface ProgramData {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf?: {
    program_title?: string;
    program_description?: string;
    program_image?: string;
    stat_1_label?: string;
    stat_1_value?: string;
    stat_2_label?: string;
    stat_2_value?: string;
    stat_3_label?: string;
    stat_3_value?: string;
    stat_4_label?: string;
    stat_4_value?: string;
    additional_content?: string;
  };
}

export default function DynamicProgramPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [programData, setProgramData] = useState<ProgramData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("jwt_token");
      setIsLoggedIn(!!token);
    };
    checkLogin();
  }, []);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://mhma-update.local/wp-json";
        const response = await fetch(`${WP_API_URL}/wp/v2/pages?slug=${slug}`);
        const data = await response.json();
        if (data.length > 0) {
          setProgramData(data[0]);

          // Fetch media URL if program_image is an integer (media ID)
          if (data[0].acf?.program_image) {
            const programImage = data[0].acf.program_image;
            if (typeof programImage === 'number') {
              const mediaResponse = await fetch(`${WP_API_URL}/wp/v2/media/${programImage}`);
              if (mediaResponse.ok) {
                const mediaData = await mediaResponse.json();
                setImageUrl(mediaData.source_url);
              }
            } else {
              setImageUrl(programImage);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching program:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProgramData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation currentPage="programs" />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-center py-12">Loading...</div>
        </div>
      </div>
    );
  }

  if (!programData) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation currentPage="programs" />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-center py-12">Program not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="programs" />

      {/* Hero Section */}
      <section className="relative h-[400px] bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl || programData.acf?.program_image || "https://mhma.us/wp-content/uploads/2024/08/MHMA-Ultra-Wide-Banner.webp"})` }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center uppercase">
            {programData.acf?.program_title || programData.title.rendered}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Edit Button for Board Members */}
        {isLoggedIn && (
          <div className="mb-6">
            <Link href={`/dashboard/programs/edit?id=${programData.id}`} className="inline-flex items-center px-4 py-2 bg-[#c9a227] text-white rounded hover:bg-[#8c7622] transition-colors">
              Edit Program
            </Link>
          </div>
        )}

        {/* Program Description */}
        <div className="prose max-w-none mb-8">
          {programData.content.rendered && (
            <div className="mb-6" dangerouslySetInnerHTML={{ __html: programData.content.rendered }} />
          )}
          {programData.acf?.program_description && (
            <div dangerouslySetInnerHTML={{ __html: programData.acf.program_description }} />
          )}
        </div>

        {/* Stats Section */}
        {(programData.acf?.stat_1_value || programData.acf?.stat_2_value) && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            {programData.acf?.stat_1_value && (
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-800 mb-2">{programData.acf.stat_1_value}</div>
                <div className="text-gray-600 uppercase">{programData.acf.stat_1_label}</div>
              </div>
            )}
            {programData.acf?.stat_2_value && (
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-800 mb-2">{programData.acf.stat_2_value}</div>
                <div className="text-gray-600 uppercase">{programData.acf.stat_2_label}</div>
              </div>
            )}
          </div>
        )}

        {/* Additional Content */}
        {programData.acf?.additional_content && (
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <div dangerouslySetInnerHTML={{ __html: programData.acf.additional_content }} />
          </div>
        )}

        {/* Join Now Button */}
        {isLoggedIn ? (
          <div className="block w-full bg-gray-300 text-gray-500 font-semibold py-3 px-6 rounded text-center mb-8 cursor-not-allowed">
            Already Registered
          </div>
        ) : (
          <Link href="/register" className="block w-full bg-[#b49c2e] hover:bg-[#8c7622] text-white font-semibold py-3 px-6 rounded text-center transition-colors mb-8">
            Join Now
          </Link>
        )}

        {/* Back Button */}
        <div className="mt-8">
          <Link href="/programs" className="inline-flex items-center text-[#c9a227] hover:text-[#8c7622]">
            ← Back to All Programs
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/mhma.mountainhouse" target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a227]">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="https://www.instagram.com/mhma_mountainhouse" target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a227]">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="https://twitter.com/mhma_mountainhouse" target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a227]">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="https://www.linkedin.com/company/mhma-mountain-house" target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a227]">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="https://www.youtube.com/@mhma_mountainhouse" target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a227]">
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/programs" className="hover:text-[#c9a227]">All Programs</Link></li>
                <li><Link href="/board" className="hover:text-[#c9a227]">Board</Link></li>
                <li><Link href="/donate" className="hover:text-[#c9a227]">Donate</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-sm text-gray-400">Mountain House, CA</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">MHMA</h3>
              <p className="text-sm text-gray-400">Serving the Muslim community of Mountain House</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Mountain House Muslim Association. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
