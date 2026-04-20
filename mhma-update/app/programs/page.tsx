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
    program_title?: string;
    program_description?: string;
    program_image?: string;
    use_hardcoded_version?: boolean;
  };
  featured_media?: number;
}

interface HardcodedProgram {
  title: string;
  description: string;
  image: string;
  href: string;
}

const hardcodedPrograms: HardcodedProgram[] = [
  {
    title: "Youth Sports League",
    description: "Healthy sports activity for the youth",
    image: "https://mhma.us/wp-content/uploads/2024/06/Youth-Sports-League.webp",
    href: "/programs/youth-sports-league",
  },
  {
    title: "Ladies Meetup",
    description: "Weekly ladies get together, fun activities & food.",
    image: "https://mhma.us/wp-content/uploads/2024/06/Ladies-Meetup.webp",
    href: "/programs/ladies-meetup",
  },
  {
    title: "Learn 3D Printing",
    description: "Learn how to design and print 3D objects",
    image: "https://mhma.us/wp-content/uploads/2024/06/3D-Printing.webp",
    href: "/programs/learn-3d-printing",
  },
  {
    title: "Urdu Academy",
    description: "Urdu Ka Safar (The Journey of Urdu)",
    image: "https://mhma.us/wp-content/uploads/2024/06/Urdu-Academy.webp",
    href: "/programs/urdu-academy",
  },
  {
    title: "Maktab Program",
    description: "Quran Recitation and Islamic Studies Program",
    image: "https://mhma.us/wp-content/uploads/2024/06/Maktab.webp",
    href: "/programs/maktab-program",
  },
  {
    title: "Family Night",
    description: "Bringing together the Muslim families of Mountain House.",
    image: "https://mhma.us/wp-content/uploads/2024/06/Family-Night.webp",
    href: "/programs/family-night",
  },
  {
    title: "Jummah And Salah",
    description: "Jummah and Salah at the Unity Center",
    image: "https://mhma.us/wp-content/uploads/2024/06/Jummah.webp",
    href: "/programs/jummah-and-salah",
  },
  {
    title: "Islamic Center of Mountain House",
    description: "We are committed to building this center of excellence.",
    image: "https://mhma.us/wp-content/uploads/2024/06/Islamic-Center-of-Mountain-House.webp",
    href: "/programs/islamic-center-of-mountain-house",
  },
  {
    title: "WISH",
    description: "Weekend Islamic schooling and sports for youth",
    image: "https://mhma.us/wp-content/uploads/2024/06/Hifz-Program-2.webp",
    href: "/programs/wish",
  },
  {
    title: "Quran Hifz Program",
    description: "Quran memorization for boys and girls",
    image: "https://mhma.us/wp-content/uploads/2024/06/Hifz-Program.webp",
    href: "/programs/quran-hifz-program",
  },
  {
    title: "Arabic Academy",
    description: "We offer a LUSD certified Arabic language course",
    image: "https://mhma.us/wp-content/uploads/2016/08/Arabic.png",
    href: "/programs/arabic-academy",
  },
  {
    title: "Boy Scouts",
    description: "Scouting activities for Boys and Girls",
    image: "https://mhma.us/wp-content/uploads/2024/06/Scouts.webp",
    href: "/programs/boy-scouts",
  },
];

export default function ProgramsPage() {
  const [wpPrograms, setWpPrograms] = useState<Program[]>([]);
  const [programImageUrls, setProgramImageUrls] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://mhma-update.local/wp-json";
        const response = await fetch(`${WP_API_URL}/wp/v2/pages?per_page=100`);
        if (!response.ok) {
          throw new Error("Failed to fetch programs");
        }
        const data = await response.json();
        setWpPrograms(data);

        // Fetch media URLs for programs with integer program_image
        const imageUrls: Record<number, string> = {};
        for (const program of data) {
          if (program.acf?.program_image) {
            const programImage = program.acf.program_image;
            if (typeof programImage === 'number') {
              try {
                const mediaResponse = await fetch(`${WP_API_URL}/wp/v2/media/${programImage}`);
                if (mediaResponse.ok) {
                  const mediaData = await mediaResponse.json();
                  imageUrls[program.id] = mediaData.source_url;
                }
              } catch (error) {
                console.error("Error fetching media URL for program", program.id, error);
              }
            }
          }
        }
        setProgramImageUrls(imageUrls);
      } catch (err) {
        console.error("Failed to fetch programs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="programs" />

      {/* Main Content */}
      <main className="pt-20">
        {/* Programs Header - Banner without text overlay */}
        <section
          className="relative h-[400px] md:h-[500px] bg-cover bg-center"
          style={{
            backgroundImage: "url('https://mhma.us/wp-content/uploads/2024/08/MHMA-Ultra-Wide-Banner.webp')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </section>

        {/* Programs Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-12">Loading programs...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Hardcoded programs - but check if WordPress version exists and use_hardcoded_version is false */}
                {hardcodedPrograms.map((program) => {
                  // Check if there's a WordPress version of this program
                  const programSlug = program.href.replace('/programs/', '');
                  const wpVersion = wpPrograms.find(wp => wp.slug === programSlug);
                  const useHardcoded = wpVersion?.acf?.use_hardcoded_version === true;

                  // Debug logging for Arabic Academy
                  if (programSlug === 'arabic-academy') {
                    console.log("=== Arabic Academy Debug ===");
                    console.log("Program slug:", programSlug);
                    console.log("WordPress programs:", wpPrograms.map(wp => ({ id: wp.id, slug: wp.slug })));
                    console.log("WordPress version found:", !!wpVersion);
                    console.log("WordPress version data:", wpVersion);
                    console.log("Use hardcoded:", useHardcoded);
                    console.log("Program title from WordPress:", wpVersion?.acf?.program_title);
                  }

                  // Use WordPress data if available and not set to use hardcoded version
                  if (wpVersion && !useHardcoded) {
                    return (
                      <Link
                        key={program.href}
                        href={program.href}
                        className="group block border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={programImageUrls[wpVersion.id] || wpVersion.acf?.program_image || program.image}
                            alt={wpVersion.acf?.program_title || program.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <h3 className="text-white text-xl font-bold uppercase text-center px-4 drop-shadow-lg">
                              {wpVersion.acf?.program_title || program.title}
                            </h3>
                          </div>
                        </div>
                        <div className="p-4 bg-white">
                          <h2 className="text-lg font-semibold text-gray-800 uppercase mb-2 group-hover:text-[#c9a227] transition-colors">
                            {wpVersion.acf?.program_title || program.title}
                          </h2>
                          <div className="w-full h-px bg-gray-200 mb-3"></div>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {wpVersion.acf?.program_description || program.description}
                          </p>
                        </div>
                      </Link>
                    );
                  }

                  // Use hardcoded version
                  return (
                    <Link
                      key={program.href}
                      href={program.href}
                      className="group block border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={program.image}
                          alt={program.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <h3 className="text-white text-xl font-bold uppercase text-center px-4 drop-shadow-lg">
                            {program.title}
                          </h3>
                        </div>
                      </div>
                      <div className="p-4 bg-white">
                        <h2 className="text-lg font-semibold text-gray-800 uppercase mb-2 group-hover:text-[#c9a227] transition-colors">
                          {program.title}
                        </h2>
                        <div className="w-full h-px bg-gray-200 mb-3"></div>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {program.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
                {/* WordPress programs (excluding those that match hardcoded programs) */}
                {wpPrograms
                  .filter(program => !hardcodedPrograms.some(hc => hc.href === `/programs/${program.slug}`))
                  .map((program) => (
                  <Link
                    key={program.id}
                    href={`/programs/${program.slug}`}
                    className="group block border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow relative"
                  >
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded z-10">
                      New
                    </div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={programImageUrls[program.id] || program.acf?.program_image || "https://mhma.us/wp-content/uploads/2024/06/MHMA-Default-Program.webp"}
                        alt={program.title.rendered}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <h3 className="text-white text-xl font-bold uppercase text-center px-4 drop-shadow-lg">
                          {program.acf?.program_title || program.title.rendered}
                        </h3>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <h2 className="text-lg font-semibold text-gray-800 uppercase mb-2 group-hover:text-[#c9a227] transition-colors">
                        {program.acf?.program_title || program.title.rendered}
                      </h2>
                      <div className="w-full h-px bg-gray-200 mb-3"></div>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {program.acf?.program_description || "Program description"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Together We Are Stronger Section */}
        <section
          className="py-24 px-4 bg-cover bg-center bg-fixed relative"
          style={{
            backgroundImage: "url('https://mhma.us/wp-content/uploads/2024/04/Community.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase mb-6">
              Together we are stronger
            </h2>
            <div className="w-24 h-1 bg-white/50 mx-auto mb-8"></div>
            <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
              Join us in our mission to build a vibrant Muslim community in Mountain House. Your support makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/volunteer"
                className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-3 px-8 rounded transition-colors"
              >
                VOLUNTEER
              </Link>
              <Link
                href="/donate"
                target="_blank"
                className="inline-block bg-[#b49c2e] hover:bg-[#8c7622] text-white font-semibold py-3 px-8 rounded transition-colors"
              >
                DONATE NOW
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center">
            {/* Logo */}
            <div className="mb-6">
              <Image
                src="https://mhma.us/wp-content/uploads/2023/12/MHMA-Site-Logo-345x70-1.webp"
                alt="MHMA Logo"
                width={200}
                height={45}
                className="h-12 w-auto"
              />
            </div>

            {/* Social Links */}
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

            {/* Copyright */}
            <div className="text-center text-gray-400 text-sm">
              <p>Copyright 2024 MHMA - Mountain House Muslim Association</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
