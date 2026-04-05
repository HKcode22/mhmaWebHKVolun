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
  Download,
  Mail,
} from "lucide-react";

const zakatSteps = [
  {
    number: "1",
    title: "Collection",
    description:
      "Funds are collected through secure channels and kept in a dedicated Zakat account, completely separate from operational funds. Each contribution is tracked and verified to ensure proper handling.",
  },
  {
    number: "2",
    title: "Verification of Recipients",
    description:
      "We carefully verify that potential recipients fall under the eight categories eligible for Zakat as specified in the Quran (Surah At-Tawbah, 9:60): The poor, the needy, Zakat collectors, those whose hearts are to be reconciled, freeing slaves, those in debt, in the cause of Allah, and the wayfarer. Applicants can submit their requests through our secure, confidential application form. We understand the sensitive nature of financial hardship and guarantee complete privacy – all information shared will be treated with absolute confidentiality and accessed only by authorized Zakat administrators.",
  },
  {
    number: "3",
    title: "Documentation",
    description:
      "Every Zakat transaction is thoroughly documented. We maintain detailed records of donors, recipients, amounts, and distribution dates. These records are regularly audited by independent Islamic scholars.",
  },
  {
    number: "4",
    title: "Distribution",
    description:
      "Zakat is distributed promptly to avoid delays. Priority is given based on urgency of need. We ensure recipients receive 100% of allocated funds with no deductions for administrative costs.",
  },
  {
    number: "5",
    title: "Reporting",
    description:
      "Monthly reports detail all Zakat distributions, including total amounts collected and disbursed, number of beneficiaries helped, and categories of assistance provided. These reports are available to all donors.",
  },
];

export default function ZakatPage() {
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
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]"
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
                      href="/programs/maktab"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]"
                    >
                      MHMA MAKTAB
                    </Link>
                    <Link
                      href="/zakat"
                      className="block px-4 py-2 text-sm text-[#c9a227] hover:bg-gray-100"
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
                  href="/bylaws"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
                >
                  BYLAWS
                </Link>
                <Link
                  href="/feedback"
                  className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium"
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
                  className="block px-3 py-2 text-[#c9a227] font-medium"
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
        {/* Zakat Title Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Transparent Zakat Distribution Process
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              The{" "}
              <Link
                href="/committees/zakat-committee"
                className="text-[#c9a227] hover:underline font-medium"
              >
                Zakat Committee
              </Link>{" "}
              follows strict Islamic guidelines and maintain complete
              transparency in collecting and distributing Zakat funds.
            </p>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-12 max-w-2xl mx-auto">
              <p className="text-gray-700 mb-4">
                All zakat related requests should be emailed to{" "}
                <a
                  href="mailto:zakat@mhma.info"
                  className="text-[#c9a227] hover:underline font-medium inline-flex items-center"
                >
                  <Mail className="w-4 h-4 mr-1" />
                  zakat@mhma.info
                </a>
              </p>
              <a
                href="https://mhma.us/wp-content/uploads/2025/01/Zakat-and-Sadqah-Application.docx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#b49c2e] hover:bg-[#8c7622] text-white font-semibold py-3 px-6 rounded transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Zakat Application
              </a>
            </div>

            {/* Separator */}
            <div className="w-full max-w-xs mx-auto border-t border-gray-200 mb-12"></div>

            {/* Zakat Steps */}
            <div className="space-y-8 text-left">
              {zakatSteps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#c9a227] hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-[#c9a227] text-white rounded-full text-sm font-bold mr-3">
                      {step.number}
                    </span>
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed pl-11">
                    {step.description}
                  </p>
                </div>
              ))}
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
