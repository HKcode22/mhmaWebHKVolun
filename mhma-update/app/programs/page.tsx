"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Menu,
  X,
  Twitter,
  Linkedin,
  Youtube,
  User,
  Heart,
  Landmark,
  BookOpen,
} from "lucide-react";

interface Program {
  title: string;
  description: string;
  image: string;
  href: string;
}

const programs: Program[] = [
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <Image
                  src="https://mhma.us/wp-content/uploads/2023/12/MHMA-Site-Logo-345x70-1.webp"
                  alt="MHMA Logo"
                  width={180}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="flex items-center text-sm font-medium text-amber-500 transition-colors uppercase tracking-wide">
                Home
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setAboutDropdownOpen(true)}
                onMouseLeave={() => setAboutDropdownOpen(false)}
              >
                <Link href="/mhmapage" className="flex items-center text-sm font-medium text-gray-800 hover:text-amber-500 transition-colors uppercase tracking-wide">
                  <Landmark className="w-4 h-4 mr-1" />
                  MHMA
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Link>
                {aboutDropdownOpen && (
                  <div className="absolute top-full left-0 mt-0 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                    <Link
                      href="/board"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]"
                    >
                      BOARD
                    </Link>
                    <Link
                      href="/committees"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]"
                    >
                      COMMITTEES
                    </Link>
                    <Link
                      href="/bylaws"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]"
                    >
                      BYLAWS
                    </Link>
                    <Link
                      href="/feedback"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]"
                    >
                      FEEDBACK
                    </Link>
                  </div>
                )}
              </div>
              <div
                className="relative group"
                onMouseEnter={() => setProgramsDropdownOpen(true)}
                onMouseLeave={() => setProgramsDropdownOpen(false)}
              >
                <div className="flex items-center text-sm font-medium text-amber-500 uppercase tracking-wide cursor-pointer">
                  <BookOpen className="w-4 h-4 mr-1" />
                  <Link href="/programs" className="hover:text-amber-600">PROGRAMS</Link>
                  <ChevronDown className="ml-1 h-3 w-3" />
                </div>
                {programsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-0 w-56 bg-white shadow-lg rounded-md py-2 z-50">
                    <Link href="/programs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">ALL PROGRAMS</Link>
                    <Link href="/programs/maktab-program" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">MHMA MAKTAB</Link>
                    <Link href="/zakat" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">ZAKAT</Link>
                  </div>
                )}
              </div>
              <Link
                href="/donate"
                target="_blank"
                className="flex items-center text-sm font-medium text-gray-800 hover:text-amber-500 transition-colors uppercase tracking-wide"
              >
                <Heart className="w-4 h-4 mr-1" />
                DONATE
              </Link>
              <Link
                href="/login"
                className="flex items-center text-sm font-medium text-gray-800 hover:text-amber-500 transition-colors uppercase tracking-wide"
              >
                <User className="w-4 h-4 mr-1" />
                Login
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-[#c9a227] p-2"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  HOME
                </Link>
                <Link
                  href="/mhmapage"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  MHMA
                </Link>
                <Link
                  href="/board"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  BOARD
                </Link>
                <Link
                  href="/committees"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  COMMITTEES
                </Link>
                <Link
                  href="/programs"
                  className="block px-3 py-2 text-[#c9a227] font-medium"
                >
                  PROGRAMS
                </Link>
                <Link
                  href="/donate"
                  target="_blank"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  DONATE
                </Link>
                <Link
                  href="/login"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  LOGIN
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {programs.map((program, index) => (
                <Link
                  key={index}
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
              ))}
            </div>
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
