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
} from "lucide-react";

interface CommitteeMember {
  name: string;
  role: string;
  image: string;
}

const committeeMembers: CommitteeMember[] = [
  {
    name: "TARIQ KHAN",
    role: "COMMITTEE LEAD",
    image: "https://mhma.us/wp-content/uploads/2024/01/Tariq-Khan-300-x-350.jpg",
  },
  {
    name: "WAQAR KHAN",
    role: "COMMITTEE MEMBER",
    image: "https://mhma.us/wp-content/uploads/2024/08/Waqar-Profile-1.webp",
  },
  {
    name: "ZAFAR BHATTI",
    role: "COMMITTEE MEMBER",
    image: "https://mhma.us/wp-content/uploads/2024/08/Zafar-Bhatti.webp",
  },
  {
    name: "WAJAHAT HUSSAIN",
    role: "LIAISON OFFICER",
    image: "https://mhma.us/wp-content/uploads/2024/08/Wajahat-Hussain.webp",
  },
];

export default function FuneralCommitteePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

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

            {/* Desktop Navigation - Simplified to match original */}
            <div className="hidden lg:flex items-center space-x-8">
              <div
                className="relative"
                onMouseEnter={() => setAboutDropdownOpen(true)}
                onMouseLeave={() => setAboutDropdownOpen(false)}
              >
                <button className="flex items-center text-gray-700 hover:text-[#c9a227] transition-colors font-medium">
                  HOME
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {aboutDropdownOpen && (
                  <div className="absolute top-full left-0 mt-0 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                    <Link
                      href="/mhmapage"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]"
                    >
                      MHMA
                    </Link>
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
                  </div>
                )}
              </div>
              <Link
                href="https://mhma.new.steeple.app"
                target="_blank"
                className="text-gray-700 hover:text-[#c9a227] transition-colors font-medium"
              >
                PROGRAMS
              </Link>
              <Link
                href="/login"
                className="text-gray-700 hover:text-[#c9a227] transition-colors font-medium"
              >
                LOGIN
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-[#c9a227] transition-colors font-medium"
              >
                CONTACT
              </Link>
              <Link
                href="/donate"
                className="text-white bg-[#b49c2e] hover:bg-[#8c7622] px-6 py-2 rounded-full font-medium transition-colors"
              >
                DONATE
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
                  className="block px-3 py-2 text-[#c9a227] font-medium"
                >
                  COMMITTEES
                </Link>
                <Link
                  href="https://mhma.new.steeple.app"
                  target="_blank"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  PROGRAMS
                </Link>
                <Link
                  href="/login"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  LOGIN
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  CONTACT
                </Link>
                <Link
                  href="/donate"
                  className="block px-3 py-2 text-[#c9a227] font-medium"
                >
                  DONATE
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {/* Committee Title Section */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center uppercase mb-6">
              Funeral Committee
            </h1>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-lg text-gray-700">
                The MHMA Funeral Committee, AKA TMFS (Tracy & Mountain House Funeral Service) provides financial and logistical support to bereaving families with the aim to lightening their burden during such emotionally challenging situation.
              </p>
            </div>
          </div>
        </section>

        {/* Committee Members Section */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {committeeMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-[300px] h-[350px] mx-auto mb-4 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 uppercase">
                    {member.name}
                  </h4>
                  <p className="text-gray-500 text-sm uppercase tracking-wide">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Back Button */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <Link
              href="/committees"
              className="inline-block bg-[#b49c2e] hover:bg-[#8c7622] text-white font-semibold py-3 px-8 rounded transition-colors"
            >
              Back to Committees
            </Link>
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
