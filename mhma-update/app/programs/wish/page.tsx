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
  Landmark,
  BookOpen,
  Heart,
  User,
} from "lucide-react";

export default function WISHPage() {
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
                <button className="flex items-center text-gray-700 hover:text-[#c9a227] transition-colors font-medium">
                  <Landmark className="mr-1 h-4 w-4" />
                  MHMA
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
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
                <button className="flex items-center text-[#c9a227] font-medium">
                  <BookOpen className="mr-1 h-4 w-4" />
                  PROGRAMS
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {programsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-0 w-56 bg-white shadow-lg rounded-md py-2 z-50">
                    <Link href="/programs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">ALL PROGRAMS</Link>
                    <Link href="/programs/maktab-program" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">MHMA MAKTAB</Link>
                    <Link href="/zakat" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#c9a227]">ZAKAT</Link>
                  </div>
                )}
              </div>
              <Link href="/donate" className="flex items-center text-gray-700 hover:text-[#c9a227] transition-colors font-medium">
                <Heart className="mr-1 h-4 w-4" />
                DONATE
              </Link>
              <Link href="/login" className="flex items-center text-gray-700 hover:text-[#c9a227] transition-colors font-medium">
                <User className="mr-1 h-4 w-4" />
                LOGIN
              </Link>
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
                <Link href="/board" className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium">BOARD</Link>
                <Link href="/committees" className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium">COMMITTEES</Link>
                <Link href="/programs" className="block px-3 py-2 text-[#c9a227] font-medium">PROGRAMS</Link>
                <Link href="/donate" className="block px-3 py-2 text-gray-700 hover:text-[#c9a227] font-medium">DONATE</Link>
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
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 uppercase mb-6">
                Weekend Islamic Social Hub (WISH)
              </h1>
              <div className="w-48 h-1 bg-[#c9a227] mb-8"></div>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-4">
                  Weekend Islamic Social Hub (WISH), is MHMA's flagship program in its fourth successful year serving the Mountain House Muslim community.
                </p>
                <p className="text-gray-700 mb-4">
                  The program breaks the mold of the traditional Sunday School model that typically focuses only on theoretical Islamic education. The WISH program takes a much broader and holistic approach of catering for residents of all ages including school aged students.
                </p>
                
                <h3 className="text-xl font-bold text-gray-800 uppercase mt-8 mb-4">Weekend Learning - Grade Pre K-3</h3>
                <table className="w-full border-collapse border border-gray-300 mb-6">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Event</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Venue</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">10:30 AM</td>
                      <td className="border border-gray-300 px-4 py-2">Islamic Education (45 min)</td>
                      <td className="border border-gray-300 px-4 py-2">Classroom</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">11:15 AM</td>
                      <td className="border border-gray-300 px-4 py-2">Quranic Education (45 min)</td>
                      <td className="border border-gray-300 px-4 py-2">Classroom</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">12:00 PM</td>
                      <td className="border border-gray-300 px-4 py-2">Lunch Break (30 min)</td>
                      <td className="border border-gray-300 px-4 py-2">Outside Area</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">12:30 PM</td>
                      <td className="border border-gray-300 px-4 py-2">Arts & Craft (30 min)</td>
                      <td className="border border-gray-300 px-4 py-2">Outside Area</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">1:00 PM</td>
                      <td className="border border-gray-300 px-4 py-2">Sports/Social Activity (30 min)</td>
                      <td className="border border-gray-300 px-4 py-2">Big Gym</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">1:30 PM</td>
                      <td className="border border-gray-300 px-4 py-2">Zuhr Prayer (15 min)</td>
                      <td className="border border-gray-300 px-4 py-2">Big Gym</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">1:45 PM</td>
                      <td className="border border-gray-300 px-4 py-2">End of Day</td>
                      <td className="border border-gray-300 px-4 py-2">-</td>
                    </tr>
                  </tbody>
                </table>

                <h3 className="text-xl font-bold text-gray-800 uppercase mt-8 mb-4">Weekend Learning - Grade 4-8</h3>
                <table className="w-full border-collapse border border-gray-300 mb-6">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Event</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Venue</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">10:30 AM</td>
                      <td className="border border-gray-300 px-4 py-2">Sports Activity (60 min)</td>
                      <td className="border border-gray-300 px-4 py-2">Big Gym</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">11:30 AM</td>
                      <td className="border border-gray-300 px-4 py-2">Lunch Break (30 min)</td>
                      <td className="border border-gray-300 px-4 py-2">Big Gym</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">12:00 PM</td>
                      <td className="border border-gray-300 px-4 py-2">Islamic Education (45 min)</td>
                      <td className="border border-gray-300 px-4 py-2">Classroom</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">12:45 PM</td>
                      <td className="border border-gray-300 px-4 py-2">Quranic Education (45 min)</td>
                      <td className="border border-gray-300 px-4 py-2">Classroom</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">1:30 PM</td>
                      <td className="border border-gray-300 px-4 py-2">Zuhr Prayer (15 min)</td>
                      <td className="border border-gray-300 px-4 py-2">Big Gym</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">1:45 PM</td>
                      <td className="border border-gray-300 px-4 py-2">End of Day</td>
                      <td className="border border-gray-300 px-4 py-2">-</td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
            <div className="w-full lg:w-1/3 bg-gray-100 py-16 px-6 md:px-8">
              <div className="bg-white/50 p-8 mb-8">
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-gray-800 mb-2">2019</div>
                  <div className="text-gray-600 uppercase">Established</div>
                </div>
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-gray-800 mb-2">197</div>
                  <div className="text-gray-600 uppercase">Students</div>
                </div>
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-gray-800 mb-2">30</div>
                  <div className="text-gray-600 uppercase">Faculty</div>
                </div>
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-gray-800 mb-2">59</div>
                  <div className="text-gray-600 uppercase">Volunteers</div>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977704984784!2d-121.5463444!3d37.7647551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80900c02b5b8f353%3A0xa8e69c4f6e63c44a!2sMountain%20House%20High%20School!5e0!3m2!1sen!2sus!4v1699400000000!5m2!1sen!2sus"
                  width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg"
                ></iframe>
              </div>
              <div className="bg-[#333] text-white p-6 rounded-lg">
                <div className="relative">
                  <div className="text-4xl text-[#c9a227] absolute -top-2 -left-2">"</div>
                  <p className="text-white/90 italic mb-4 pt-4">The WISH program is one of the best Islamic programs in the Bay Area</p>
                  <div className="text-4xl text-[#c9a227] absolute -bottom-2 -right-2">"</div>
                  <p className="font-semibold text-[#c9a227] mt-4">
                    NAEEM BAIG • PROGRAM DIRECTOR
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
