"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { fetchGraphQL } from "@/lib/wordpress";
import Navigation from "@/components/Navigation";

interface ProgramData {
  title: string;
  description: string;
  stat1Label: string;
  stat1Value: string;
  stat2Label: string;
  stat2Value: string;
  stat3Label: string;
  stat3Value: string;
  stat4Label: string;
  stat4Value: string;
  additionalContent: string;
}

export default function ArabicAcademyPage() {
  const [programData, setProgramData] = useState<ProgramData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [programId, setProgramId] = useState<number | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("jwt_token");
    const username = localStorage.getItem("username");
    const userRole = localStorage.getItem("user_role");
    console.log("Arabic Academy - Login state check:", { token: !!token, username, userRole, programId });
    setIsLoggedIn(!!token);

    // Debug: check if edit button should show
    console.log("Arabic Academy - Should show edit button?", { isLoggedIn: !!token, programId });

    const fetchProgramData = async () => {
      const query = `
        query GetProgramPage {
          page(id: "arabic-academy", idType: SLUG) {
            databaseId
            title
            content
            acfProgramContent {
              program_title
              program_description
              program_image {
                sourceUrl
              }
              stat1_label
              stat1_value
              stat2_label
              stat2_value
              stat3_label
              stat3_value
              stat4_label
              stat4_value
              additional_content
            }
          }
        }
      `;

      const data = await fetchGraphQL(query);
      console.log("GraphQL data:", data);
      if (data?.page) {
        setProgramId(data.page.databaseId);
        const programData = {
          title: data.page.acfProgramContent?.program_title || data.page.title || "LEARN ARABIC LANGUAGE",
          description: data.page.acfProgramContent?.program_description || "",
          stat1Label: data.page.acfProgramContent?.stat1_label || "Students",
          stat1Value: data.page.acfProgramContent?.stat1_value || "25",
          stat2Label: data.page.acfProgramContent?.stat2_label || "Days/Week",
          stat2Value: data.page.acfProgramContent?.stat2_value || "5",
          stat3Label: data.page.acfProgramContent?.stat3_label || "",
          stat3Value: data.page.acfProgramContent?.stat3_value || "",
          stat4Label: data.page.acfProgramContent?.stat4_label || "",
          stat4Value: data.page.acfProgramContent?.stat4_value || "",
          additionalContent: data.page.acfProgramContent?.additional_content || "",
        };
        console.log("Program data set:", programData);
        setProgramData(programData);
      } else {
        console.log("No page data found, using fallbacks");
        setProgramData({
          title: "LEARN ARABIC LANGUAGE",
          description: "A Fully accredited Arabic language course designed to equip students with the ability to understand the Quranic language.",
          stat1Label: "Students",
          stat1Value: "25",
          stat2Label: "Days/Week",
          stat2Value: "5",
          stat3Label: "",
          stat3Value: "",
          stat4Label: "",
          stat4Value: "",
          additionalContent: "",
        });
      }
      setLoading(false);
    };

    fetchProgramData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="programs" />

      <main className="pt-20">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : (
          <section className="py-0">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-2/3 py-16 px-6 md:px-12 lg:px-16">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 uppercase mb-6">
                  {programData?.title || "LEARN ARABIC LANGUAGE"}
                </h1>
                <div className="w-48 h-1 bg-[#c9a227] mb-8"></div>
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 mb-4">
                    {programData?.description || "A Fully accredited Arabic language course designed to equip students with the ability to understand the Quranic language."}
                  </p>
                  {programData?.additionalContent && (
                    <div className="mt-6" dangerouslySetInnerHTML={{ __html: programData.additionalContent }} />
                  )}
                </div>
              </div>
              <div className="w-full lg:w-1/3 bg-gray-100 py-16 px-6 md:px-8">
                {isLoggedIn && (
                  <Link
                    href={`/dashboard/programs/edit?id=${programId || "arabic-academy"}`}
                    className="flex items-center justify-center bg-[#c9a227] hover:bg-[#8c7622] text-white py-2 px-4 rounded mb-4 transition-colors"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Program
                  </Link>
                )}
                <div className="bg-white/50 p-8 mb-8">
                  {programData?.stat1Value && (
                    <div className="text-center mb-8">
                      <div className="text-5xl font-bold text-gray-800 mb-2">{programData.stat1Value}</div>
                      <div className="text-gray-600 uppercase">{programData.stat1Label}</div>
                    </div>
                  )}
                  {programData?.stat2Value && (
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-800 mb-2">{programData.stat2Value}</div>
                      <div className="text-gray-600 uppercase">{programData.stat2Label}</div>
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
        )}
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
