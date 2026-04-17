"use client";

import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

export default function BoyScoutsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="programs" />

      <main className="pt-20">
        <section className="py-0">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-2/3 py-16 px-6 md:px-12 lg:px-16">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 uppercase mb-6">BRINGING OUT THE BEST IN OUR YOUTH</h1>
              <div className="w-48 h-1 bg-[#c9a227] mb-8"></div>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-4">
                  The Boy Scouts program under MHMA's Charter is a successful program that enriches the life of our youth by teaching them real life skills. We are proud to be an active part of the Boy Scouts of America and are proud of our troop and cubs.
                </p>
                <p className="text-gray-700 mb-4">
                  We recently had our first eagle scout graduate and have several scouts inline to graduate as eagle scout in 2024.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/3 bg-gray-100 py-16 px-6 md:px-8" style={{ backgroundImage: "url('https://mhma.us/wp-content/uploads/2016/08/home-content-bg-1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="bg-white/50 p-8 mb-8">
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-gray-800 mb-2">14</div>
                  <div className="text-gray-600 uppercase">Total Kids</div>
                </div>
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-gray-800 mb-2">54</div>
                  <div className="text-gray-600 uppercase">Activities This Year</div>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977704984784!2d-121.543234!3d37.7793901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80900c02b5b8f353%3A0xa8e69c4f6e63c44a!2sMountain%20House%2C%20CA!5e0!3m2!1sen!2sus!4v1699400000000!5m2!1sen!2sus"
                  width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg"
                ></iframe>
              </div>
              <div className="bg-[#333] text-white p-6 rounded-lg">
                <div className="relative">
                  <div className="text-4xl text-[#c9a227] absolute -top-2 -left-2">"</div>
                  <p className="text-white/90 italic mb-4 pt-4">Through engaging activities and dedicated mentorship, kids are developing essential life skills, a strong sense of responsibility, and a deep appreciation for the outdoors.</p>
                  <div className="text-4xl text-[#c9a227] absolute -bottom-2 -right-2">"</div>
                  <p className="font-semibold text-[#c9a227] mt-4">
                    VAQAS KHAN • TROOP LEADER
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
            <div className="w-48 h-1 bg-gray-800 mb-8"></div>
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="bg-[#f5a623] p-6 rounded-lg flex items-center gap-4">
                <div className="text-white">
                  <p className="text-sm uppercase mb-1">Always Do Your Part</p>
                  <p className="text-xl font-bold uppercase">Helping Others</p>
                </div>
                <div className="flex gap-2">
                  <div className="bg-gray-800 text-white px-3 py-2 rounded text-center min-w-[60px]">
                    <div className="text-xl font-bold">00</div>
                    <div className="text-xs">Days</div>
                  </div>
                  <div className="bg-gray-800 text-white px-3 py-2 rounded text-center min-w-[60px]">
                    <div className="text-xl font-bold">00</div>
                    <div className="text-xs">Hrs</div>
                  </div>
                  <div className="bg-gray-800 text-white px-3 py-2 rounded text-center min-w-[60px]">
                    <div className="text-xl font-bold">00</div>
                    <div className="text-xs">Min</div>
                  </div>
                  <div className="bg-gray-800 text-white px-3 py-2 rounded text-center min-w-[60px]">
                    <div className="text-xl font-bold">00</div>
                    <div className="text-xs">Sec</div>
                  </div>
                </div>
                <a
                  href="/donate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-800 font-semibold py-3 px-6 rounded hover:bg-gray-100 transition-colors"
                >
                  DONATE NOW
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Change a Life Section */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 uppercase mb-6">Change a life today</h2>
            <div className="w-24 h-1 bg-[#c9a227] mx-auto mb-8"></div>
            <p className="text-gray-700 text-lg mb-10 max-w-2xl mx-auto">
              The Boy Scouts program under MHMA's Charter is a successful program that enriches the life of our youth by teaching them real life skills. We are proud to be an active part of the Boy Scouts of America and are proud of our troop and cubs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/volunteer" className="inline-block bg-transparent border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-semibold py-3 px-8 rounded transition-colors">VOLUNTEER</Link>
              <Link href="/donate" target="_blank" className="inline-block bg-[#b49c2e] hover:bg-[#8c7622] text-white font-semibold py-3 px-8 rounded transition-colors">DONATE NOW</Link>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 bg-white">
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
            <div className="text-center text-gray-400 text-sm">
              <p>© Copyright 2010- 2026 | Mountain House Muslim Association</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
