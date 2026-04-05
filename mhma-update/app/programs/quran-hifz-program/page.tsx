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

export default function QuranHifzProgramPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <Image src="https://mhma.us/wp-content/uploads/2023/12/MHMA-Site-Logo-345x70-1.webp" alt="MHMA Logo" width={180} height={40} className="h-10 w-auto" />
              </Link>
            </div>
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-[#c9a227] transition-colors font-medium">HOME</Link>
              <div className="relative" onMouseEnter={() => setAboutDropdownOpen(true)} onMouseLeave={() => setAboutDropdownOpen(false)}>
                <Link href="/mhmapage" className="flex items-center text-gray-700 hover:text-[#c9a227] transition-colors font-medium">
                  MHMA<ChevronDown className="ml-1 h-4 w-4" />
                </Link>
                {aboutDropdownOpen && (
                  <div className="absolute top-full left-0 mt-0 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                    <Link href="/board" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">BOARD</Link>
                    <Link href="/committees" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">COMMITTEES</Link>
                    <Link href="/bylaws" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">BYLAWS</Link>
                    <Link href="/feedback" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">FEEDBACK</Link>
                  </div>
                )}
              </div>
              <div className="relative" onMouseEnter={() => setProgramsDropdownOpen(true)} onMouseLeave={() => setProgramsDropdownOpen(false)}>
                <Link href="/programs" className="flex items-center text-[#c9a227] font-medium">
                  PROGRAMS<ChevronDown className="ml-1 h-4 w-4" />
                </Link>
                {programsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-0 w-56 bg-white shadow-lg rounded-md py-2 z-50">
                    <Link href="/programs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">ALL PROGRAMS</Link>
                    <Link href="/programs/maktab-program" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">MHMA MAKTAB</Link>
                    <Link href="/zakat" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">ZAKAT</Link>
                  </div>
                )}
              </div>
              <Link href="/donate" target="_blank" className="text-gray-700 hover:text-[#c9a227] transition-colors font-medium">DONATE</Link>
              <Link href="/login" className="text-gray-700 hover:text-[#c9a227] transition-colors font-medium">LOGIN</Link>
            </div>
            <div className="lg:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 hover:text-[#c9a227] p-2">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium">HOME</Link>
                <Link href="/mhmapage" className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium">MHMA</Link>
                <Link href="/board" className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium">BOARD</Link>
                <Link href="/committees" className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium">COMMITTEES</Link>
                <Link href="/programs" className="block px-3 py-2 text-[#c9a227] font-medium">PROGRAMS</Link>
                <Link href="/donate" target="_blank" className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium">DONATE</Link>
                <Link href="/login" className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium">LOGIN</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="pt-20">
        <section className="py-0">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-2/3 py-16 px-6 md:px-12 lg:px-16">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 uppercase mb-6">Building a Legacy of Huffaaz</h1>
              <div className="w-48 h-1 bg-[#c9a227] mb-8"></div>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-4">
                  The memorization of the Quran is a long-living tradition from the time of the Prophet Muhammad (Peace be upon him). We offer a unique program that fulfills the needs of local Mountain House Muslim community.
                </p>
                <div className="my-8">
                  <Image
                    src="https://mhma.us/wp-content/uploads/2026/02/Part-time-Hifdh.jpg"
                    alt="Quran Hifz Program"
                    width={800}
                    height={600}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3 bg-gray-100 py-16 px-6 md:px-8" style={{ backgroundImage: "url('https://mhma.us/wp-content/uploads/2016/08/home-content-bg-1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="bg-white/50 p-8 mb-8">
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-gray-800 mb-2">24789</div>
                  <div className="text-gray-600 uppercase">Fair Trade Farms</div>
                </div>
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-gray-800 mb-2">3.9M</div>
                  <div className="text-gray-600 uppercase">Donated</div>
                </div>
                <div className="text-center">
                  <a
                    href="/donate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#b49c2e] hover:bg-[#8c7622] text-white font-semibold py-3 px-6 rounded transition-colors w-full"
                  >
                    Donate Now
                  </a>
                </div>
              </div>
              <div className="mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977704984784!2d-121.536491!3d37.7787928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80900c02b5b8f353%3A0xa8e69c4f6e63c44a!2s250%20E%20Main%20St%2C%20Tracy%2C%20CA%2095391!5e0!3m2!1sen!2sus!4v1699400000000!5m2!1sen!2sus"
                  width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg"
                ></iframe>
              </div>
              <div className="bg-[#333] text-white p-6 rounded-lg">
                <div className="relative">
                  <div className="text-4xl text-[#c9a227] absolute -top-2 -left-2">"</div>
                  <p className="text-white/90 italic mb-4 pt-4">Realize the wealth of sympathy, the kindness and generosity hidden in the soul of a child.</p>
                  <div className="text-4xl text-[#c9a227] absolute -bottom-2 -right-2">"</div>
                  <p className="font-semibold text-[#c9a227] mt-4">
                    DANIEL CROSS • EXECUTIVE DIRECTOR
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Annual Month of Giving */}
        <section className="py-16 px-4 bg-[#f5a623]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 uppercase mb-2">Annual Month of Giving</h2>
            <p className="text-gray-700 mb-2">Make your donation</p>
            <p className="text-gray-800 font-semibold mb-8">Land Closing</p>
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="bg-gray-800 text-white px-4 py-3 rounded text-center min-w-[70px]">
                  <div className="text-2xl font-bold">00</div>
                  <div className="text-xs">Days</div>
                </div>
                <div className="bg-gray-800 text-white px-4 py-3 rounded text-center min-w-[70px]">
                  <div className="text-2xl font-bold">00</div>
                  <div className="text-xs">Hrs</div>
                </div>
                <div className="bg-gray-800 text-white px-4 py-3 rounded text-center min-w-[70px]">
                  <div className="text-2xl font-bold">00</div>
                  <div className="text-xs">Min</div>
                </div>
                <div className="bg-gray-800 text-white px-4 py-3 rounded text-center min-w-[70px]">
                  <div className="text-2xl font-bold">00</div>
                  <div className="text-xs">Sec</div>
                </div>
                <a
                  href="/donate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white font-semibold py-3 px-6 rounded hover:bg-gray-700 transition-colors"
                >
                  DONATE NOW
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Change a Life Section */}
        <section className="py-24 px-4 bg-cover bg-center bg-fixed relative" style={{ backgroundImage: "url('https://mhma.us/wp-content/uploads/2016/08/home-footer.jpg')" }}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase mb-6">Change a life today</h2>
            <div className="w-24 h-1 bg-white/50 mx-auto mb-8"></div>
            <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
              The memorization of the Quran is a long-living tradition from the time of the Prophet Muhammad (Peace be upon him). We offer a unique program that fulfills the needs of local Mountain House Muslim community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/volunteer" className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-3 px-8 rounded transition-colors">VOLUNTEER</Link>
              <Link href="/donate" target="_blank" className="inline-block bg-[#b49c2e] hover:bg-[#8c7622] text-white font-semibold py-3 px-8 rounded transition-colors">DONATE NOW</Link>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto text-center">
            <Link href="/programs" className="inline-block bg-[#b49c2e] hover:bg-[#8c7622] text-white font-semibold py-3 px-8 rounded transition-colors">Back to Programs</Link>
          </div>
        </section>
      </main>

      <footer className="bg-[#1a1a1a] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <Image src="https://mhma.us/wp-content/uploads/2023/12/MHMA-Site-Logo-345x70-1.webp" alt="MHMA Logo" width={200} height={45} className="h-12 w-auto" />
            </div>
            <div className="flex space-x-4 mb-8">
              <a href="https://www.facebook.com/mhma95391" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a227] transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="https://www.instagram.com/mhma.ig/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a227] transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="https://x.com/i/flow/login?redirect_after_login=%2Fmhmatweets" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a227] transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="https://www.linkedin.com/company/mountain-house-muslim-association/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a227] transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="https://www.youtube.com/@MHMAYouTube" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a227] transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
            <div className="text-center text-gray-400 text-sm"><p>Copyright 2024 MHMA - Mountain House Muslim Association</p></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
