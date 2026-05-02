"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";

interface JournalEntry {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  acf?: {
    journal_title?: string;
    date_published?: string;
    date_held_on?: string;
    attendees?: string;
    content?: string;
  };
  meta?: {
    journal_title?: string;
    date_published?: string;
    date_held_on?: string;
    attendees?: string;
    journal_content?: string;
  };
}

export default function JournalPage() {
  const [wpJournalEntries, setWpJournalEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://mhma-update.local/wp-json";
        const response = await fetch(`${WP_API_URL}/wp/v2/pages?parent=199&per_page=100&_fields=id,title,slug,acf,meta,content`);
        if (!response.ok) {
          throw new Error("Failed to fetch journal entries");
        }
        const data = await response.json();
        setWpJournalEntries(data);
      } catch (err) {
        console.error("Failed to fetch journal entries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJournalEntries();
  }, []);

  const hardcodedJournalEntries = [
    {
      id: 1,
      title: "BOD Minutes for MHMA Board of Directors Meeting – 12-Apr-26",
      excerpt: "MHMA Board of Directors Meeting - 12-Apr-26",
      date: "Published On: April 18, 2026",
      slug: "bod-minutes-for-mhma-board-of-directors-meeting-12-apr-26",
      rawDate: "2026-04-18",
    },
    {
      id: 2,
      title: "BOD Minutes for MHMA Board of Directors Meeting – 05-Apr-26",
      excerpt: "MHMA Board of Directors Meeting - 05-Apr-26",
      date: "Published On: April 12, 2026",
      slug: "bod-minutes-for-mhma-board-of-directors-meeting-05-apr-26",
      rawDate: "2026-04-12",
    },
    {
      id: 3,
      title: "Minutes for MHMA Full Board Meeting – 30-Mar-26",
      excerpt: "MHMA Full Board Meeting - 30-Mar-26",
      date: "Published On: April 5, 2026",
      slug: "minutes-for-mhma-full-board-meeting-30-mar-26",
      rawDate: "2026-04-05",
    },
    {
      id: 4,
      title: "Minutes for MHMA Full Board Meeting – Ramadan FR Focus – 24-Feb-26",
      excerpt: "MHMA Full Board Meeting - Ramadan FR Focus - 24-Feb-26",
      date: "Published On: March 25, 2026",
      slug: "minutes-for-mhma-full-board-meeting-ramadan-fr-focus-24-feb-26",
      rawDate: "2026-03-25",
    },
    {
      id: 5,
      title: "Minutes for MHMA Full Board Meeting – 15-Feb-26",
      excerpt: "MHMA Full Board Meeting - 15-Feb-26",
      date: "Published On: March 25, 2026",
      slug: "minutes-for-mhma-full-board-meeting-15-feb-26",
      rawDate: "2026-03-25",
    },
    {
      id: 6,
      title: "Minutes for MHMA Full Board Meeting – 18-Jan-26",
      excerpt: "MHMA Full Board Meeting - 18-Jan-26",
      date: "Published On: January 25, 2026",
      slug: "minutes-for-mhma-full-board-meeting-18-jan-26",
      rawDate: "2026-01-25",
    },
    {
      id: 7,
      title: "Minutes for MHMA Board of Trustees Meeting – 04-Mar-26",
      excerpt: "MHMA Board of Trustees Meeting - 04-Mar-26",
      date: "Published On: March 23, 2026",
      slug: "minutes-for-mhma-board-of-trustees-meeting-04-mar-26",
      rawDate: "2026-03-23",
    },
    {
      id: 8,
      title: "Minutes for MHMA Board of Trustees Meeting – 27-Feb-26",
      excerpt: "MHMA Board of Trustees Meeting - 27-Feb-26",
      date: "Published On: March 23, 2026",
      slug: "minutes-for-mhma-board-of-trustees-meeting-27-feb-26",
      rawDate: "2026-03-23",
    },
    {
      id: 9,
      title: "BOD Minutes for MHMA Board of Directors Meeting – 21-Jan-26",
      excerpt: "MHMA Board of Directors Meeting - 21-Jan-26",
      date: "Published On: January 25, 2026",
      slug: "bod-minutes-for-mhma-board-of-directors-meeting-21-jan-26",
      rawDate: "2026-01-25",
    },
    {
      id: 10,
      title: "Minutes for MHMA Board of Trustees Meeting – 13-Jan-26",
      excerpt: "MHMA Board of Trustees Meeting - 13-Jan-26",
      date: "Published On: January 22, 2026",
      slug: "minutes-for-mhma-board-of-trustees-meeting-13-jan-26",
      rawDate: "2026-01-22",
    },
    {
      id: 11,
      title: "Minutes for MHMA Board Meeting – 11-Jan-26",
      excerpt: "MHMA Board Meeting - 11-Jan-26",
      date: "Published On: January 17, 2026",
      slug: "minutes-for-mhma-board-meeting-11-jan-26",
      rawDate: "2026-01-17",
    },
    {
      id: 12,
      title: "Minutes for MHMA Board of Trustees Meeting – 06-Jan-26",
      excerpt: "MHMA Board of Trustees Meeting - 06-Jan-26",
      date: "Published On: January 11, 2026",
      slug: "minutes-for-mhma-board-of-trustees-meeting-06-jan-26",
      rawDate: "2026-01-11",
    },
    {
      id: 13,
      title: "BOD Minutes for MHMA Board of Directors Meeting – 04-Jan-26",
      excerpt: "MHMA Board of Directors Meeting - 04-Jan-26",
      date: "Published On: January 10, 2026",
      slug: "bod-minutes-for-mhma-board-of-directors-meeting-04-jan-26",
      rawDate: "2026-01-10",
    },
    {
      id: 14,
      title: "Minutes for MHMA Board Meeting – 21-Dec-25",
      excerpt: "MHMA Board Meeting - 21-Dec-25",
      date: "Published On: January 1, 2026",
      slug: "minutes-for-mhma-board-meeting-21-dec-25",
      rawDate: "2026-01-01",
    },
    {
      id: 15,
      title: "BOD Minutes for MHMA Board of Directors Meeting – 14-Dec-25",
      excerpt: "MHMA Board of Directors Meeting - 14-Dec-25",
      date: "Published On: December 19, 2025",
      slug: "bod-minutes-for-mhma-board-of-directors-meeting-14-dec-25",
      rawDate: "2025-12-19",
    },
    {
      id: 16,
      title: "Minutes for MHMA Board of Trustees Meeting – 16-Dec-25",
      excerpt: "MHMA Board of Trustees Meeting - 16-Dec-25",
      date: "Published On: December 18, 2025",
      slug: "minutes-for-mhma-board-of-trustees-meeting-16-dec-25",
      rawDate: "2025-12-18",
    },
    {
      id: 17,
      title: "Minutes for MHMA Board of Trustees Meeting – 09-Dec-25",
      excerpt: "MHMA Board of Trustees Meeting - 09-Dec-25",
      date: "Published On: December 18, 2025",
      slug: "minutes-for-mhma-board-of-trustees-meeting-09-dec-25",
      rawDate: "2025-12-18",
    },
    {
      id: 18,
      title: "BOD Minutes for MHMA Board of Directors Meeting – 07-Dec-25",
      excerpt: "MHMA Board of Directors Meeting - 07-Dec-25",
      date: "Published On: December 11, 2025",
      slug: "bod-minutes-for-mhma-board-of-directors-meeting-07-dec-25",
      rawDate: "2025-12-11",
    },
    {
      id: 19,
      title: "Minutes for MHMA Board of Trustees Meeting – 26-Nov-25",
      excerpt: "MHMA Board of Trustees Meeting - 26-Nov-25",
      date: "Published On: November 30, 2025",
      slug: "minutes-for-mhma-board-of-trustees-meeting-26-nov-25",
      rawDate: "2025-11-30",
    },
    {
      id: 20,
      title: "Minutes for MHMA Board of Trustees Meeting – 23-Nov-25",
      excerpt: "MHMA Board of Trustees Meeting - 23-Nov-25",
      date: "Published On: November 30, 2025",
      slug: "minutes-for-mhma-board-of-trustees-meeting-23-nov-25",
      rawDate: "2025-11-30",
    },
    {
      id: 21,
      title: "Minutes for MHMA Full Board Meeting – 24-Nov-25",
      excerpt: "MHMA Full Board Meeting - 24-Nov-25",
      date: "Published On: November 29, 2025",
      slug: "minutes-for-mhma-full-board-meeting-24-nov-25",
      rawDate: "2025-11-29",
    },
    {
      id: 22,
      title: "Minutes for MHMA Board of Trustees Meeting – 12-Nov-25",
      excerpt: "MHMA Board of Trustees Meeting - 12-Nov-25",
      date: "Published On: November 22, 2025",
      slug: "minutes-for-mhma-board-of-trustees-meeting-12-nov-25",
      rawDate: "2025-11-22",
    },
    {
      id: 23,
      title: "Minutes for MHMA General Body Meeting – 15-Nov-25",
      excerpt: "MHMA General Body Meeting - 15-Nov-25",
      date: "Published On: November 20, 2025",
      slug: "minutes-for-mhma-general-body-meeting-15-nov-25",
      rawDate: "2025-11-20",
    },
    {
      id: 24,
      title: "Minutes for MHMA Board Meeting – 26-Oct-25",
      excerpt: "MHMA Board Meeting - 26-Oct-25",
      date: "Published On: November 2, 2025",
      slug: "minutes-for-mhma-board-meeting-26-oct-25",
      rawDate: "2025-11-02",
    },
    {
      id: 25,
      title: "Minutes for MHMA Board Meeting – 21-Sep-25",
      excerpt: "MHMA Board Meeting - 21-Sep-25",
      date: "Published On: September 23, 2025",
      slug: "minutes-for-mhma-board-meeting-21-sep-25",
      rawDate: "2025-09-23",
    },
    {
      id: 26,
      title: "Minutes for MHMA Board Meeting – 15-Feb-25",
      excerpt: "MHMA Board Meeting - 15-Feb-25",
      date: "Published On: September 6, 2025",
      slug: "minutes-for-mhma-board-meeting-15-feb-25",
      rawDate: "2025-09-06",
    },
    {
      id: 27,
      title: "Minutes for MHMA Board Meeting – 26-May-25",
      excerpt: "MHMA Board Meeting - 26-May-25",
      date: "Published On: September 6, 2025",
      slug: "minutes-for-mhma-board-meeting-26-may-25",
      rawDate: "2025-09-06",
    },
    {
      id: 28,
      title: "Minutes for MHMA Board Meeting – 22-Jun-25",
      excerpt: "MHMA Board Meeting - 22-Jun-25",
      date: "Published On: August 30, 2025",
      slug: "minutes-for-mhma-board-meeting-22-jun-25",
      rawDate: "2025-08-30",
    },
    {
      id: 29,
      title: "Minutes for MHMA Board Meeting – 24-Jul-25",
      excerpt: "MHMA Board Meeting - 24-Jul-25",
      date: "Published On: August 30, 2025",
      slug: "minutes-for-mhma-board-meeting-24-jul-25",
      rawDate: "2025-08-30",
    },
    {
      id: 30,
      title: "Minutes for MHMA Board Meeting – 24-Aug-25",
      excerpt: "MHMA Board Meeting - 24-Aug-25",
      date: "Published On: August 30, 2025",
      slug: "minutes-for-mhma-board-meeting-24-aug-25",
      rawDate: "2025-08-30",
    },
    {
      id: 32,
      title: "Minutes for MHMA Board Meeting – 26-Apr-25",
      excerpt: "MHMA Board Meeting - 26-Apr-25",
      date: "Published On: May 24, 2025",
      slug: "minutes-for-mhma-board-meeting-26-apr-25",
      rawDate: "2025-05-24",
    },
    {
      id: 33,
      title: "Amazing Festivities at the Mountain House Muslim Association Eid Event",
      excerpt: "Amazing Festivities at the Mountain House Muslim Association Eid Event",
      date: "Published On: April 2, 2025",
      slug: "amazing-festivities-at-the-mountain-house-muslim-association-eid-event",
      rawDate: "2025-04-02",
    },
    {
      id: 34,
      title: "Great Event",
      excerpt: "Great Event",
      date: "Published On: April 2, 2025",
      slug: "great-event",
      rawDate: "2025-04-02",
    },
    {
      id: 35,
      title: "WE RESPECT THE WISDOM OF THE ELDERS",
      excerpt: "WE RESPECT THE WISDOM OF THE ELDERS",
      date: "Published On: March 20, 2025",
      slug: "we-respect-the-wisdom-of-the-elders",
      rawDate: "2025-03-20",
    },
    {
      id: 36,
      title: "OUR YOUTH, OUR FUTURE",
      excerpt: "OUR YOUTH, OUR FUTURE",
      date: "Published On: March 20, 2025",
      slug: "our-youth-our-future",
      rawDate: "2025-03-20",
    },
    {
      id: 37,
      title: "WE BELIEVE IN UNITY",
      excerpt: "WE BELIEVE IN UNITY",
      date: "Published On: March 20, 2025",
      slug: "we-believe-in-unity",
      rawDate: "2025-03-20",
    },
    {
      id: 38,
      title: "WE BELIEVE IN A STRONG COHESIVE COMMUNITY",
      excerpt: "WE BELIEVE IN A STRONG COHESIVE COMMUNITY",
      date: "Published On: March 20, 2025",
      slug: "we-believe-in-a-strong-cohesive-community",
      rawDate: "2025-03-20",
    },
    {
      id: 39,
      title: "Sunday May 25th 2025",
      excerpt: "Community, Commitment, and Connection: A Weekend of Purpose at MHMA",
      date: "Published On: May 25, 2025",
      slug: "sunday-may-25th-2025",
      rawDate: "2025-05-25",
    },
  ];

  const wpJournalEntriesFormatted = wpJournalEntries.map(entry => {
    // Check both ACF and meta fields for date
    const datePublished = entry.acf?.date_published || entry.meta?.date_published;
    let formattedDate = "";
    let rawDate = "";

    if (datePublished) {
      // Handle F j, Y format (e.g., "May 19, 2026")
      const dateMatch = datePublished.match(/([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})/);
      if (dateMatch) {
        const [, month, day, year] = dateMatch;
        formattedDate = `Published On: ${month} ${day}, ${year}`;
        // Map month name to number without using Date object
        const monthMap: Record<string, string> = {
          'January': '01', 'February': '02', 'March': '03', 'April': '04',
          'May': '05', 'June': '06', 'July': '07', 'August': '08',
          'September': '09', 'October': '10', 'November': '11', 'December': '12'
        };
        const monthNum = monthMap[month] || '01';
        rawDate = `${year}-${monthNum}-${String(parseInt(day)).padStart(2, '0')}`;
      } else {
        // Fallback to original parsing for Y-m-d format
        const date = new Date(datePublished);
        if (!isNaN(date.getTime())) {
          formattedDate = `Published On: ${date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
          rawDate = datePublished;
        }
      }
    }

    // Check both ACF and meta for title
    const journalTitle = entry.acf?.journal_title || entry.meta?.journal_title;

    return {
      id: entry.id,
      title: journalTitle || entry.title.rendered,
      excerpt: entry.title.rendered,
      date: formattedDate,
      slug: entry.slug,
      rawDate: rawDate || datePublished || "",
    };
  });

  const journalEntries = [...wpJournalEntriesFormatted, ...hardcodedJournalEntries].sort((a, b) => {
    const dateA = new Date((a as any).rawDate || "1970-01-01");
    const dateB = new Date((b as any).rawDate || "1970-01-01");
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage="journal" />

      <main className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 mr-3 text-[#c9a227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h1 className="text-5xl font-bold text-gray-900">Journal</h1>
            </div>
            <p className="text-xl text-gray-600 ml-11">Meeting minutes and community updates</p>
          </div>
        </div>

        {/* Journal Entries */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {journalEntries.map((entry) => (
              <div
                key={entry.id}
                className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-amber-400 transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#c9a227] transition-colors line-clamp-2">
                      <Link href={`/journal/${entry.slug}`}>
                        {entry.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{entry.excerpt}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1 text-[#c9a227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[#c9a227] font-medium">{entry.date}</span>
                  </div>
                  <Link
                    href={`/journal/${entry.slug}`}
                    className="inline-flex items-center px-4 py-2 bg-[#c9a227] text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors text-sm shadow-md hover:shadow-lg"
                  >
                    Read
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <Image
                src="https://mhma.us/wp-content/uploads/2023/12/MHMA-Site-Logo-345x70-1.webp"
                alt="MHMA Logo"
                width={180}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm">
              © Copyright 2010-2026 | Mountain House Muslim Association
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
