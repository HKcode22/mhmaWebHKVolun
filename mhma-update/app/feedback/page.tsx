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
  MessageSquare,
  Users,
  FileText,
  Building2,
  ClipboardList,
  Heart,
  User,
} from "lucide-react";

export default function FeedbackPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mhmaDropdownOpen, setMhmaDropdownOpen] = useState(false);
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
              <Link
                href="/"
                className="text-gray-700 hover:text-[#c9a227] transition-colors font-medium"
              >
                HOME
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setMhmaDropdownOpen(true)}
                onMouseLeave={() => setMhmaDropdownOpen(false)}
              >
                <button className="flex items-center text-gray-700 hover:text-[#c9a227] transition-colors font-medium">
                  <Building2 className="mr-1 h-4 w-4" /> MHMA
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {mhmaDropdownOpen && (
                  <div className="absolute top-full left-0 mt-0 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                    <Link
                      href="/board"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]"
                    >
                      <Users className="mr-2 h-4 w-4" /> BOARD
                    </Link>
                    <Link
                      href="/committees"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]"
                    >
                      <Users className="mr-2 h-4 w-4" /> COMMITTEES
                    </Link>
                    <Link
                      href="/bylaws"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]"
                    >
                      <FileText className="mr-2 h-4 w-4" /> BYLAWS
                    </Link>
                    <Link
                      href="/feedback"
                      className="flex items-center px-4 py-2 text-sm text-[#c9a227] hover:bg-gray-100"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" /> FEEDBACK
                    </Link>
                  </div>
                )}
              </div>
              <div
                className="relative"
                onMouseEnter={() => setProgramsDropdownOpen(true)}
                onMouseLeave={() => setProgramsDropdownOpen(false)}
              >
                <button className="flex items-center text-gray-700 hover:text-[#c9a227] transition-colors font-medium">
                  <ClipboardList className="mr-1 h-4 w-4" /> PROGRAMS
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {programsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-0 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                    <Link
                      href="/programs"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]"
                    >
                      ALL PROGRAMS
                    </Link>
                    <Link
                      href="/programs/maktab-program"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]"
                    >
                      MHMA MAKTAB
                    </Link>
                    <Link
                      href="/zakat"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]"
                    >
                      ZAKAT
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="/donate"
                className="flex items-center text-gray-700 hover:text-[#c9a227] transition-colors font-medium"
              >
                <Heart className="mr-1 h-4 w-4" /> DONATE
              </Link>
              <Link
                href="/login"
                className="flex items-center text-gray-700 hover:text-[#c9a227] transition-colors font-medium"
              >
                <User className="mr-1 h-4 w-4" /> LOGIN
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
                  href="/bylaws"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  BYLAWS
                </Link>
                <Link
                  href="/feedback"
                  className="block px-3 py-2 text-[#c9a227] font-medium"
                >
                  FEEDBACK
                </Link>
                <Link
                  href="/programs"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  ALL PROGRAMS
                </Link>
                <Link
                  href="/programs/maktab-program"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  MHMA MAKTAB
                </Link>
                <Link
                  href="/zakat"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  ZAKAT
                </Link>
                <Link
                  href="/login"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  LOGIN
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
        {/* Feedback Form Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-lg rounded-lg p-8">
              {/* Logo - Black version with tagline */}
              <div className="text-center mb-8">
                <Image
                  src="https://mhma.us/wp-content/uploads/2023/12/MHMA-Logo-Wide-White-Black-2560-x-600-.png"
                  alt="MHMA Logo"
                  width={428}
                  height={100}
                  className="mx-auto"
                />
              </div>

              <form className="space-y-6">
                {/* Feedback Type Dropdown */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Please select the type of feedback <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c9a227] focus:border-transparent bg-white">
                    <option value="">Feedback</option>
                    <option value="general">General Feedback</option>
                    <option value="complaint">Complaint</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="compliment">Compliment</option>
                  </select>
                </div>

                {/* Details Text Editor Area */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Details</label>
                  <div className="border border-gray-300 rounded-md">
                    {/* Toolbar */}
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 bg-gray-50">
                      <select className="text-sm bg-transparent border-none focus:outline-none">
                        <option>Paragraph</option>
                      </select>
                      <div className="w-px h-4 bg-gray-300 mx-1"></div>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded font-bold">B</button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded italic">I</button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded underline">U</button>
                      <div className="w-px h-4 bg-gray-300 mx-1"></div>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      </button>
                      <div className="flex-1"></div>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      </button>
                    </div>
                    {/* Text Area */}
                    <textarea
                      rows={8}
                      className="w-full px-4 py-3 border-none focus:outline-none focus:ring-0 resize-none"
                    />
                  </div>
                </div>

                {/* Anonymous Radio Buttons */}
                <div>
                  <label className="block text-sm text-gray-600 mb-3">
                    Do you wish to remain anonymous?
                  </label>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="anonymous"
                        value="yes"
                        className="mr-2 text-[#c9a227] focus:ring-[#c9a227]"
                      />
                      <span className="text-sm text-gray-600">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="anonymous"
                        value="no"
                        defaultChecked
                        className="mr-2 text-[#c9a227] focus:ring-[#c9a227]"
                      />
                      <span className="text-sm text-gray-600">No</span>
                    </label>
                  </div>
                </div>

                {/* First Name and Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">First Name</label>
                    <input
                      type="text"
                      placeholder="Enter Your First Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c9a227] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter Your Last Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c9a227] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-[#c9a227] border-gray-300 rounded focus:ring-[#c9a227]"
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    I have read and agree to the{" "}
                    <Link
                      href="/rsvp-terms-and-conditions"
                      className="text-[#c9a227] hover:underline"
                    >
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-[#c9a227] hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded transition-colors"
                  >
                    Submit Form
                  </button>
                </div>
              </form>
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
