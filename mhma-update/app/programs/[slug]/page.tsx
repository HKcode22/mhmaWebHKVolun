"use client";

import { useState, useEffect } from "react";
import { useParams, redirect } from "next/navigation";
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
  slug: string;
  acf?: {
    program_title?: string;
    program_description?: string;
    program_image?: string;
    program_image_poster?: string;
    use_hardcoded_version?: boolean;
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
  const [posterImageUrl, setPosterImageUrl] = useState<string>("");

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

          // Fetch media URL if program_image_poster is an integer (media ID)
          if (data[0].acf?.program_image_poster) {
            const programPosterImage = data[0].acf.program_image_poster;
            if (typeof programPosterImage === 'number') {
              const posterMediaResponse = await fetch(`${WP_API_URL}/wp/v2/media/${programPosterImage}`);
              if (posterMediaResponse.ok) {
                const posterMediaData = await posterMediaResponse.json();
                setPosterImageUrl(posterMediaData.source_url);
              }
            } else {
              setPosterImageUrl(programPosterImage);
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
        <div className="text-center py-12">Loading...</div>
      </div>
    );
  }

  if (!programData) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation currentPage="programs" />
        <div className="text-center py-12">Program not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="programs" />

      <main className="pt-20">
        <section className="py-0">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-2/3 py-16 px-6 md:px-12 lg:px-16">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 uppercase mb-6">
                {programData.acf?.program_title || programData.title.rendered}
              </h1>
              <div className="w-48 h-1 bg-[#c9a227] mb-8"></div>
              <div className="prose max-w-none">
                {programData.content.rendered && (
                  <div className="mb-6" dangerouslySetInnerHTML={{ __html: programData.content.rendered }} />
                )}
                {programData.acf?.program_description && (
                  <div dangerouslySetInnerHTML={{ __html: programData.acf.program_description }} />
                )}
                {posterImageUrl && (
                  <div className="my-8">
                    <img src={posterImageUrl} alt="Program Poster" className="rounded-lg shadow-lg w-full" />
                  </div>
                )}
                {programData.acf?.additional_content && (
                  <div className="mt-6" dangerouslySetInnerHTML={{ __html: programData.acf.additional_content }} />
                )}
              </div>
            </div>
            <div className="w-full lg:w-1/3 bg-gray-100 py-16 px-6 md:px-8">
              {isLoggedIn && (
                <Link
                  href={`/dashboard/programs/edit?id=${programData.id}`}
                  className="flex items-center justify-center bg-[#c9a227] hover:bg-[#8c7622] text-white py-2 px-4 rounded mb-4 transition-colors"
                >
                  Edit Program
                </Link>
              )}
              <div className="bg-white/50 p-8 mb-8">
                {programData.acf?.stat_1_value && (
                  <div className="text-center mb-8">
                    <div className="text-5xl font-bold text-gray-800 mb-2">{programData.acf.stat_1_value}</div>
                    <div className="text-gray-600 uppercase">{programData.acf.stat_1_label}</div>
                  </div>
                )}
                {programData.acf?.stat_2_value && (
                  <div className="text-center mb-8">
                    <div className="text-5xl font-bold text-gray-800 mb-2">{programData.acf.stat_2_value}</div>
                    <div className="text-gray-600 uppercase">{programData.acf.stat_2_label}</div>
                  </div>
                )}
                {programData.acf?.stat_3_value && (
                  <div className="text-center mb-8">
                    <div className="text-5xl font-bold text-gray-800 mb-2">{programData.acf.stat_3_value}</div>
                    <div className="text-gray-600 uppercase">{programData.acf.stat_3_label}</div>
                  </div>
                )}
                {programData.acf?.stat_4_value && (
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-800 mb-2">{programData.acf.stat_4_value}</div>
                    <div className="text-gray-600 uppercase">{programData.acf.stat_4_label}</div>
                  </div>
                )}
              </div>
              {isLoggedIn ? (
                <div className="block w-full bg-gray-300 text-gray-500 font-semibold py-3 px-6 rounded text-center mb-8 cursor-not-allowed">
                  Already Registered
                </div>
              ) : (
                <Link href="/register" className="block w-full bg-[#b49c2e] hover:bg-[#8c7622] text-white font-semibold py-3 px-6 rounded text-center transition-colors mb-8">
                  Join Now
                </Link>
              )}
              <div className="mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977704984784!2d-121.5405094!3d37.7786645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80900c02b5b8f353%3A0xa8e69c4f6e63c44a!2sMountain%20House%20Unity%20Center!5e0!3m2!1sen!2sus!4v1699400000000!5m2!1sen!2sus"
                  width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg"
                ></iframe>
              </div>
              <div className="bg-[#333] text-white p-6 rounded-lg">
                <div className="relative">
                  <div className="text-4xl text-[#c9a227] absolute -top-2 -left-2">"</div>
                  <p className="text-white/90 italic mb-4 pt-4">Understanding the language of the Quran gives the reader a better understanding of the message form Allah (SWT)</p>
                  <div className="text-4xl text-[#c9a227] absolute -bottom-2 -right-2">"</div>
                  <p className="font-semibold text-[#c9a227] mt-4">
                    OUSSAMA SAAFIEN • BOARD TRUSTEE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto text-center">
            <Link href="/programs" className="inline-block bg-[#b49c2e] hover:bg-[#8c7622] text-white font-semibold py-3 px-8 rounded transition-colors">Back to Programs</Link>
          </div>
        </section>
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
