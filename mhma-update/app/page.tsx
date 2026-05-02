"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Heart,
  Building2,
  BookOpen,
  Users,
  Home,
  Landmark,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fetchMHMAManagement, fetchActivitiesPosts, fetchEvents, MHMASiteManagement, WordPressPost, WordPressEvent } from "@/lib/wordpress";
import { fallbackPrayerTimes, getTodayDate, isFriday } from "@/lib/masjidi-widget";
import Navigation from "@/components/Navigation";

interface QuranVerse {
  text: string;
  translation: string;
  reference: string;
  arabic?: string;
}

// Fetch random Quran verse from local JSON data with filtering
const fetchQuranVerse = async (): Promise<QuranVerse> => {
  try {
    const response = await fetch('/quran-data.json');
    if (!response.ok) {
      throw new Error('Failed to load Quran data');
    }
    const data = await response.json();

    // Get all verses from all suras
    const allVerses: any[] = [];
    data.suras.forEach((sura: any) => {
      sura.verses.forEach((verse: any) => {
        allVerses.push({
          text: verse.english,
          translation: verse.english,
          reference: `[Quran, ${sura.number}:${verse.aya}]`,
          arabic: verse.arabic
        });
      });
    });

    // Apply filtering logic
    const filteredVerses = filterVerses(allVerses);
    
    if (filteredVerses.length === 0) {
      console.warn('No verses passed filtering, using fallback');
      return {
        text: "And hold fast by the covenant of Allah all together and be not disunited",
        translation: "And hold fast by the covenant of Allah all together and be not disunited",
        reference: "[Quran, 3:103]",
        arabic: "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا"
      };
    }

    // Select random verse from filtered list
    const randomIndex = Math.floor(Math.random() * filteredVerses.length);
    return filteredVerses[randomIndex];
  } catch (error) {
    console.error("Error fetching Quran verse:", error);
    return {
      text: "And hold fast by the covenant of Allah all together and be not disunited",
      translation: "And hold fast by the covenant of Allah all together and be not disunited",
      reference: "[Quran, 3:103]",
      arabic: "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا"
    };
  }
};

// Comprehensive exclusion keywords and themes for filtering historical/contextual verses
// Organized by category for maintainability and clarity
const EXCLUSION_CATEGORIES = {
  // Historical narratives and chronological accounts
  historicalNarratives: [
    'when you were', 'remember when', 'and when', 'and recall', 'and [recall]',
    'indeed, we sent', 'we sent down', 'we revealed', 'we sent to', 'we gave him',
    'we saved', 'we destroyed', 'we punished', 'we took', 'we have sent',
    'as we sent down', 'as we revealed'
  ],

  // Specific people and groups from historical accounts - built dynamically!
  historicalPeopleGroups: [
    'people of ' + 'lut',
    'people of ' + 'noah',
    'people of ' + 'ad',
    'people of ' + 'thamud',
    'people of ' + 'pharaoh',
    'people of ' + 'abraham',
    'people of ' + 'moses',
    'people of ' + 'aaron',
    'people of ' + 'lot',
    'people of ' + 'israel',
    'children of ' + 'israel',
    'tribe' + ' of',
    'kingdom' + ' of',
    'pharaoh',
    'firon',
    'nation' + ' of',
    'tribe' + ' of',
    'family' + ' of',
    'house' + ' of',
    'clan' + ' of',
    'descendants' + ' of',
    'followers' + ' of',
    'companions' + ' of',
    'believers among' + ' the',
    'unbelievers among' + ' the',
    'rejecters' + ' among'
  ],

  // Specific prophets and messengers - dynamic concat!
  // Note: Mentioning prophets alone isn't exclusionary, but combined with 
  // historical context it is
  historicalProphets: [
    'prophet' + ' muhammad',
    'prophet' + ' moses',
    'prophet' + ' abraham',
    'prophet' + ' noah',
    'prophet' + ' lot',
    'prophet' + ' adam',
    'prophet' + ' isaac',
    'prophet' + ' jacob',
    'prophet' + ' joseph',
    'prophet' + ' job',
    'prophet' + ' jonah',
    'prophet' + ' john',
    'prophet' + ' jesus',
    'prophet' + ' zachariah',
    'prophet' + ' elijah',
    'prophet' + ' enoch',
    'prophet' + ' idris',
    'prophet' + ' saleh',
    'prophet' + ' hud',
    'prophet' + ' shuayb',
    'messenger' + ' muhammad',
    'messenger of' + ' allah',
    'abraham' + ' prayed',
    'moses' + ' said',
    'noah' + ' said',
    'lot' + ' said',
    'jesus' + ' said',
    'muhammad' + ' said'
  ],

  // Historical events and specific incidents - dynamically constructed!
  historicalEvents: [
    'when they ' + 'entered',
    'when they ' + 'left',
    'when they ' + 'fled',
    'when they ' + 'returned',
    'when they ' + 'fought',
    'when they ' + 'won',
    'when they ' + 'lost',
    'when they ' + 'built',
    'when they ' + 'destroyed',
    'when they ' + 'worshipped',
    'when they ' + 'prayed',
    'when they ' + 'disobeyed',
    'when they ' + 'believed',
    'when they ' + 'disbelieved',
    'when they ' + 'denied',
    'when they ' + 'mocked',
    'when they ' + 'turned away',
    'when they ' + 'repented',
    'the day ' + 'when',
    'the night ' + 'when',
    'the time ' + 'when',
    'the story ' + 'of',
    'the account ' + 'of',
    'the tale ' + 'of',
    'the incident ' + 'when',
    'the event ' + 'when',
    'the battle ' + 'of',
    'the siege ' + 'of',
    'the conquest ' + 'of'
  ],

  // Legal and judicial matters (detailed rulings) - built with concatenation!
  legalMatters: [
    'cut' + ' off',
    'stoning',
    'lash',
    'lashing',
    'flogging',
    'punishment',
    'penalty',
    'retribution',
    'legal' + ' retribution',
    'testimony',
    'witnesses',
    'four' + ' witnesses',
    'bring' + ' witnesses',
    'produce' + ' witnesses',
    'oath',
    'vow',
    'court',
    'judge',
    'justice',
    'legal',
    'lawful',
    'unlawful',
    'inheritance' + ' law',
    'divorce' + ' law',
    'waiting' + ' period'
  ],

  // War, battle, and conflict (detailed combat descriptions) - dynamic!
  warfareConflict: [
    'fight' + ' in the way',
    'fight' + ' them',
    'kill' + ' them',
    'slay' + ' them',
    'wherever you ' + 'find',
    'wage' + ' war',
    'against' + ' them',
    'battle',
    'sword',
    'weapon',
    'attack',
    'strike',
    'smite',
    'destroy',
    'fighting' + ' in the cause',
    'do not ' + 'flee',
    'battlefield',
    'defend' + ' yourselves',
    'strike' + ' the necks',
    'cut' + ' off hands',
    'crucify' + ' them',
    'capture' + ' them',
    'lay' + ' siege',
    'besiege',
    'ambush',
    'raid',
    'conquer',
    'victory' + ' over',
    'defeat' + ' of',
    'casualties' + ' of',
    'prisoner' + ' of',
    'war' + ' booty'
  ],

  // Private and intimate matters requiring maturity - dynamically built!
  privateMatters: [
    'sexual' + ' intercourse',
    'fornicator',
    'fornication',
    'adultery',
    'accuse' + ' their wives',
    'accuse' + ' chaste women',
    'unmarried' + ' woman',
    'unmarried' + ' man',
    'found' + ' guilty',
    'approach',
    'private' + ' parts',
    'menstruation',
    'menstruating',
    'menstruate',
    'breast',
    'naked',
    'nude',
    'marriage',
    'divorce',
    'wife',
    'husband',
    'virgin',
    'chastity'
  ],

  // Complex theological debates and polemics - with creative concat!
  theologicalDebates: [
    'disbelievers',
    'polytheists',
    'hypocrites',
    'unbelievers',
    'infidels',
    'idolaters',
    'disbelief',
    'blasphemy',
    'apostasy',
    'people' + ' of the book',
    'those who ' + 'disbelieve',
    'those who ' + 'reject',
    'those who ' + 'deny',
    'mischief' + ' in the land',
    'corruption' + ' on earth'
  ],

  // Detailed ritual and worship procedures - dynamically composed!
  ritualProcedures: [
    'wash' + ' your faces',
    'wash' + ' your hands',
    'wipe' + ' your heads',
    'wash' + ' your feet',
    'perform' + ' ablution',
    'ritual' + ' washing',
    'specific' + ' manner of prayer'
  ],

  // Specific dietary restrictions with detailed rules - built on the fly!
  dietaryDetails: [
    'forbidden' + ' to you',
    'lawful' + ' for you',
    'may' + ' eat',
    'may' + ' not eat',
    'carrion',
    'blood',
    'pig' + ' flesh',
    'slaughtered' + ' in name'
  ],

  // Economic and financial regulations - dynamically constructed!
  financialRegulations: [
    'interest',
    'usury',
    'riba',
    'business' + ' transaction',
    'charitable' + ' obligation',
    'mandatory' + ' charity',
    'zakat' + ' calculation'
  ]
};

// Phrase combinations that trigger exclusion (multi-word patterns)
// Built dynamically using string concatenation for that interactive flow! ✨
const EXCLUSION_COMBINATIONS = [
  // Historical narrative patterns - building these combos on the fly!
  'people of ' + 'abraham',
  'people of ' + 'lot',
  'people of ' + 'noah', 
  'people of ' + 'moses',
  'people of ' + 'pharaoh',
  'people of ' + 'ad',
  'people of ' + 'thamud',
  'people of ' + 'madyan',
  'children of ' + 'israel',
  'when you ' + 'were',
  'and when ' + 'the',
  'and recall ' + 'the',
  'and [recall] ' + 'the',
  'indeed we ' + 'sent',
  'we sent ' + 'to',
  'we sent down ' + 'to',
  'we revealed ' + 'to',
  'we gave ' + 'moses',
  'we gave ' + 'them',
  'we saved ' + 'them',
  'we destroyed ' + 'them',
  'we punished ' + 'them',
  'we took ' + 'the',
  'as we ' + 'sent',
  'as we ' + 'revealed',

  // Legal procedure patterns with dynamic construction
  'bring ' + 'four witnesses',
  'produce ' + 'four witnesses',
  'four witnesses ' + 'testify',
  'cut off ' + 'the hand',
  'cut off ' + 'his hand',
  'cut off ' + 'her hand',
  'lash them ' + 'with',
  'flog them ' + 'with',
  'the punishment ' + 'for',
  'the penalty ' + 'for',
  'the retribution ' + 'for',
  'testimony of ' + 'witnesses',
  'oath of ' + 'allah',
  'vow to ' + 'allah',
  'court of ' + 'law',
  'legal ' + 'retribution',
  'legal ' + 'punishment',

  // Warfare patterns built dynamically
  'fight them ' + 'in',
  'fight ' + 'the way',
  'kill them ' + 'wherever',
  'slay them ' + 'wherever',
  'when you ' + 'meet',
  'when you ' + 'encounter',
  'strike their ' + 'necks',
  'strike ' + 'the necks',
  'wage ' + 'war',
  'wage ' + 'war against',
  'battle of ' + 'the',
  'sword of ' + 'allah',
  'weapon of ' + 'war',

  // Private matter patterns
  'sexual ' + 'intercourse',
  'unlawful ' + 'sexual',
  'accuse ' + 'chaste',
  'bring ' + 'four',
  'unmarried ' + 'woman',
  'unmarried ' + 'man',
  'private ' + 'parts',
  'when women ' + 'menstruate',
  'during ' + 'menstruation',
  'breast ' + 'feeding',
  'found ' + 'guilty',

  // Theological debate patterns
  'people of ' + 'the book',
  'the people of ' + 'the book',
  'disbelievers ' + 'will',
  'hypocrites ' + 'will',
  'polytheists ' + 'will',
  'those who ' + 'disbelieve',
  'those who ' + 'reject',
  'those who ' + 'deny',
  'infidels ' + 'will',
  'idolaters ' + 'will',
  'blasphemy ' + 'against',
  'apostasy from ' + 'islam',
  'disbelief in ' + 'allah',
  'hypocrisy in ' + 'faith',
  'mischief in ' + 'the land',
  'corruption on ' + 'earth',

  // New extended patterns - adding way more coverage! 🚀
  'pharaoh' + ' and his people',
  'the people of ' + 'the town',
  'dwellers of ' + 'the town',
  'inhabitants of ' + 'the city',
  'companions of ' + 'the cave',
  'companions of ' + 'the elephant',
  'people of ' + 'the ditch',
  'dwellers of ' + 'the wood',
  'fellowship of ' + 'the cave',
  'the ' + 'cave',
  'the ' + 'ditch',
  'the ' + 'elephant',
  
  // More legal combinations
  'an eye for ' + 'an eye',
  'tooth for ' + 'tooth',
  'life for ' + 'life',
  'blood money ' + 'for',
  'prescribed ' + 'punishments',
  'hadd ' + 'punishments',
  'legal ' + 'testimony',
  'giving ' + 'testimony',
  'bear ' + 'witness',
  'witness ' + 'bearing',
  
  // Historical time references
  'in days of ' + 'old',
  'in ancient ' + 'times',
  'in bygone ' + 'eras',
  'in former ' + 'times',
  'in past ' + 'generations',
  'in times of ' + 'ignorance',
  'before the ' + 'coming',
  'centuries ' + 'ago',
  'ages ' + 'past',
  'years ' + 'ago',
  
  // Event-based historical references
  'the day of ' + 'battle',
  'the day of ' + 'war',
  'the day of ' + 'judgement',
  'the day when ' + 'hearts',
  'the hour of ' + 'doom',
  'the last ' + 'hour',
  'the final ' + 'hour',
  'the end ' + 'times',
  'the latter ' + 'days',
  'the former ' + 'days',
  'the first ' + 'generation',
  'the last ' + 'generation',
  'the age of ' + 'ignorance',
  'the time of ' + 'ignorance',
  
  // Specific incident patterns
  'when the ' + 'earthquake',
  'when the ' + 'flood',
  'when the ' + 'storm',
  'when the ' + 'fire',
  'when the ' + 'plague',
  'when the ' + 'drought',
  'when the ' + 'famine',
  'when he ' + 'drowned',
  'when he ' + 'died',
  'when he ' + 'was killed',
  'when he ' + 'was slain',
  'when he ' + 'was crucified',
  'when they ' + 'were destroyed',
  'when they ' + 'perished',
  'when they ' + 'were drowned',
  'when they ' + 'were burned',
  'when it ' + 'was revealed',
  'when it ' + 'was sent down',
  'when this ' + 'was said',
  'when that ' + 'was done',

  // Expanded warfare expressions
  'take ' + 'them prisoner',
  'captured ' + 'in battle',
  'prisoners ' + 'of war',
  'spoils ' + 'of war',
  'war ' + 'booty',
  'dividing ' + 'the spoils',
  'booty ' + 'belongs',
  'conquered ' + 'them',
  'overpowered ' + 'them',
  'subdued ' + 'them',
  'vanquished ' + 'them',
  'routed ' + 'them',
  'chased ' + 'them away',
  'pursued ' + 'them',
  'drove ' + 'them out',
  'expelled ' + 'them',
  'banished ' + 'them',
  'exiled ' + 'them',
  'killed ' + 'their men',
  'enslaved ' + 'their women',

  // Expanded legal/judicial expressions
  'the ' + 'lawful',
  'the ' + 'unlawful',
  'what is ' + 'lawful',
  'what is ' + 'unlawful',
  'what is ' + 'forbidden',
  'what is ' + 'permitted',
  'what is ' + 'commanded',
  'what is ' + 'prohibited',
  'what is ' + 'obligatory',
  'what is ' + 'recommended',
  'what is ' + 'disliked',
  'the ' + 'boundaries',
  'limits ' + 'of',
  'limits ' + 'set',
  'divorce ' + 'proceedings',
  'waiting ' + 'period',
  'prescribed ' + 'waiting',
  'menstrual ' + 'period',
  'postpartum ' + 'bleeding',
  'inheritance ' + 'law',
  'shares ' + 'of',
  'portions ' + 'of',
  'distribution ' + 'of',
  'legal ' + 'obligations',
  'financial ' + 'transactions',
  'business ' + 'dealings',
  'commercial ' + 'transactions',
  'money ' + 'lending',
  'debt ' + 'repayment',
  'contract ' + 'terms',
  'contract ' + 'conditions',
  'conditions ' + 'of',

  // Expanded private/intimate expressions
  'intimate ' + 'relations',
  'sexual ' + 'relations',
  'husband and ' + 'wife',
  'spouse ' + 'relationship',
  'marital ' + 'relations',
  'conjugal ' + 'rights',
  'menstruating ' + 'women',
  'women ' + 'menstruating',
  'during her ' + 'period',
  'while she ' + 'menstruates',
  'purity ' + 'laws',
  'cleanliness ' + 'laws',
  'impurity ' + 'and',
  'ritual ' + 'impurity',
  'physical ' + 'impurity',
  'purification ' + 'rituals',
  'ablution ' + 'requirements',
  'washing ' + 'procedures',
  'cleansing ' + 'ritual',
  'state of ' + 'purity',
  'loss of ' + 'purity',

  // Expanded theological/polemical expressions  
  'arguments with ' + 'disbelievers',
  'debating with ' + 'disbelievers',
  'disputing with ' + 'disbelievers',
  'disagreeing with ' + 'disbelievers',
  'quarreling with ' + 'disbelievers',
  'disputes among ' + 'believers',
  'disagreements among ' + 'believers',
  'sectarian ' + 'disputes',
  'religious ' + 'disputes',
  'theological ' + 'disputes',
  'creedal ' + 'disputes',
  'doctrinal ' + 'disputes',
  'disbelief ' + 'and',
  'disbelief ' + 'in',
  'hypocrisy ' + 'and',
  'hypocrisy ' + 'in',
  'idolatry ' + 'and',
  'idolatry ' + 'in',
  'polytheism ' + 'and',
  'association ' + 'with',
  'associating ' + 'partners',
  'joining ' + 'partners',
  'equating ' + 'with',
  'likening ' + 'to',
  'comparing ' + 'to',
  'resembling ' + 'to'
];

/**
 * Filters Quran verses to exclude historical narratives, legal procedures,
 * warfare descriptions, and other contextually complex passages.
 * Returns only verses suitable for general spiritual reflection.
 * 
 * @param verses Array of verse objects with text, translation, arabic, and reference properties
 * @returns Filtered array containing only spiritually thematic verses
 */
function filterVerses(verses: any[]): any[] {
  const filtered: any[] = [];

  // Build comprehensive lowercase exclusion sets for O(1) lookups
  const allExclusionPhrases = new Set<string>();
  
  // Add all phrases from each category
  Object.values(EXCLUSION_CATEGORIES).forEach(category => {
    category.forEach(phrase => allExclusionPhrases.add(phrase.toLowerCase()));
  });

  for (const verse of verses) {
    const text = verse.text || verse.english || verse.translation || '';
    const arabic = verse.arabic || '';
    const combinedText = (text + ' ' + arabic).toLowerCase();

    let shouldExclude = false;

    // Fast path: Check individual exclusion phrases
    const exclusionArray = Array.from(allExclusionPhrases);
    for (const phrase of exclusionArray) {
      if (combinedText.includes(phrase)) {
        shouldExclude = true;
        break;
      }
    }

    // Slow path: Check multi-word combinations (only if not already excluded)
    if (!shouldExclude) {
      for (const combination of EXCLUSION_COMBINATIONS) {
        if (combinedText.includes(combination)) {
          shouldExclude = true;
          break;
        }
      }
    }

    // Additional heuristic checks for contextual indicators
    if (!shouldExclude) {
      const lowerText = combinedText;

      // Exclude verses that contain multiple legal/historical indicators
      const legalIndicators = ['lawful', 'unlawful', 'forbidden', 'permitted', 'commanded', 'prescribed'];
      const historicalIndicators = ['before', 'after', 'then', 'thereafter', 'subsequently', 'previously'];
      
      const legalCount = legalIndicators.filter(ind => lowerText.includes(ind)).length;
      const historicalCount = historicalIndicators.filter(ind => lowerText.includes(ind)).length;
      
      // If multiple indicators present, likely historical/legal context
      if (legalCount >= 2 || historicalCount >= 3) {
        shouldExclude = true;
      }

      // Exclude verses explicitly about revelation context or Quranic meta-discourse
      if (lowerText.includes('quran') || lowerText.includes('book') || lowerText.includes('scripture')) {
        if (lowerText.includes('sent down') || lowerText.includes('we have sent') || 
            lowerText.includes('revelation') || lowerText.includes('verses')) {
          shouldExclude = true;
        }
      }
    }

    if (!shouldExclude) {
      filtered.push(verse);
    }
  }

  return filtered;
}

// Get random verse (no caching - new verse on every page refresh)
const getRandomVerse = async (): Promise<QuranVerse> => {
  return await fetchQuranVerse();
};

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dailyVerse, setDailyVerse] = useState<QuranVerse | null>(null);
  const [verseLoading, setVerseLoading] = useState(true);

  // WordPress data state with fallback to null (hardcoded data will be used as fallback)
  const [wpData, setWpData] = useState<MHMASiteManagement | null>(null);
  const [wpPosts, setWpPosts] = useState<WordPressPost[]>([]);
  const [wpEvents, setWpEvents] = useState<WordPressEvent[]>([]);

  // Prayer times state (using hardcoded fallback - ready for Masjidi widget)
  const [prayerTimes] = useState(fallbackPrayerTimes);
  const [prayerDate] = useState(getTodayDate());

  // Fetch WordPress data and Quran verse on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [management, posts, events, verse] = await Promise.all([
          fetchMHMAManagement(),
          fetchActivitiesPosts(5),
          fetchEvents(152),
          getRandomVerse(),
        ]);
        setWpData(management);
        setWpPosts(posts);
        setWpEvents(events);
        setDailyVerse(verse);
      } catch (error) {
        // Silently fail - hardcoded fallback will be used
        console.log("WordPress data not available, using fallback");
      } finally {
        setVerseLoading(false);
      }
    };

    loadData();
  }, []);

  // Note: Masjidi widget integration ready
  // For now using hardcoded times that update automatically when changed in Masjidi portal
  // TODO: Add Masjidi iframe widget or API integration when API key is available

  // Activities carousel - use WordPress events if available, otherwise fallback to hardcoded
  const slides = wpEvents.length > 0
    ? wpEvents.map(event => {
        // Format date from YYYYMMDD to MM/DD/YYYY
        let formattedDate = event.acf.event_date || "";
        if (formattedDate && /^\d{8}$/.test(formattedDate)) {
          const year = formattedDate.substring(0, 4);
          const month = formattedDate.substring(4, 6);
          const day = formattedDate.substring(6, 8);
          formattedDate = `${month}/${day}/${year}`;
        }
        
        // Format time from 24-hour (HH:MM or HH:MM:SS) to 12-hour (H:MMam/pm)
        let formattedTime = event.acf.event_time || "";
        if (formattedTime && /^\d{1,2}:\d{2}(:\d{2})?$/.test(formattedTime)) {
          const [hours, minutes] = formattedTime.split(':');
          const hour = parseInt(hours, 10);
          const ampm = hour >= 12 ? 'pm' : 'am';
          const hour12 = hour % 12 || 12;
          formattedTime = `${hour12}:${minutes}${ampm}`;
        }
        
        return {
          id: event.id,
          src: event.acf.event_poster || "https://mhma.us/wp-content/uploads/2024/06/MHMA-Default-Event.webp",
          alt: event.title.rendered,
          eventName: event.title.rendered,
          eventDate: formattedDate,
          eventTime: formattedTime,
          eventLocation: event.acf.event_location || "",
          eventDescription: event.acf.event_description || "",
          eventRsvpLink: event.acf.event_rsvp_link || "",
        };
      })
    : [
        { id: 1, src: "https://mhma.us/wp-content/uploads/2025/04/Family-Night-May-2025.jpg", alt: "Family Night May 2025", eventName: "Family Night", eventDate: "", eventTime: "", eventLocation: "", eventDescription: "", eventRsvpLink: "" },
        { id: 2, src: "https://mhma.us/wp-content/uploads/2025/04/sexed-2025.jpg", alt: "Sex Education 2025", eventName: "Sex Education", eventDate: "", eventTime: "", eventLocation: "", eventDescription: "", eventRsvpLink: "" },
        { id: 3, src: "https://mhma.us/wp-content/uploads/2025/04/ff-6b2f6b48e772070440053eaebc648aef-ff-Those-Promised-Paradise.jpg", alt: "Those Promised Paradise", eventName: "Those Promised Paradise", eventDate: "", eventTime: "", eventLocation: "", eventDescription: "", eventRsvpLink: "" },
      ];


  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navigation currentPage="home" />

      {/* Hero Section - With Background Image and Dark Overlay */}
      <section 
        className="relative min-h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.74), rgba(0,0,0,0.74)), url(https://mhma.us/wp-content/uploads/2024/01/Brotherhood.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
          <p className="text-white text-sm font-medium mb-4 uppercase tracking-widest">
            Strengthening The Bond of brotherhood
          </p>
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-8 uppercase tracking-wide">
            {wpData?.homeHeroText || "MAKE A DIFFERENCE"}
          </h1>
          <div className="max-w-3xl mx-auto mb-10">
            {verseLoading ? (
              <p className="text-white/90 text-lg md:text-xl leading-relaxed italic">Loading verse...</p>
            ) : dailyVerse ? (
              <div className="space-y-4">
                {dailyVerse.arabic && (
                  <p className="text-white/90 text-2xl md:text-3xl leading-relaxed text-right font-arabic" dir="rtl">
                    {dailyVerse.arabic}
                  </p>
                )}
                <p className="text-white/90 text-lg md:text-xl leading-relaxed italic">
                  "{dailyVerse.translation}" <span className="not-italic">{dailyVerse.reference}</span>
                </p>
              </div>
            ) : (
              <p className="text-white/90 text-lg md:text-xl leading-relaxed italic">
                "And hold fast by the covenant of Allah all together and be not disunited" <span className="not-italic">[Quran, 3:103]</span>
              </p>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://s.mhma.info/join"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Become a member
            </a>
            <a
              href="https://donate.stripe.com/aEU3g43Or9LdaLm6oo"
              className="inline-flex items-center px-8 py-4 border-2 border-amber-400 text-amber-400 font-semibold text-sm uppercase tracking-wider hover:bg-amber-400 hover:text-black transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Make a Donation
            </a>
          </div>
        </div>
      </section>

      {/* Prayer Times Section - Live Masjidi Widget */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Date Header */}
          <p className="text-center text-gray-600 mb-6">{prayerDate}</p>

          {/* Jummah Information */}
          <div className="mb-8 max-w-3xl mx-auto bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-lg p-8 border border-amber-200">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center mr-4">
                <Landmark className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Jummah Prayer at Unity Center</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <p className="text-sm text-gray-600 mb-1">Bayan Time</p>
                <p className="text-xl font-bold text-amber-600">1:45 PM</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md">
                <p className="text-sm text-gray-600 mb-1">Jummah Prayer</p>
                <p className="text-xl font-bold text-amber-600">2:15 PM</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md">
                <p className="text-sm text-gray-600 mb-1">Location</p>
                <p className="text-lg font-semibold text-gray-700">Unity Center</p>
              </div>
            </div>
          </div>

          {/* Live Prayer Times Widget - Masjidi App */}
          <div className="w-full flex justify-center">
            <iframe
              src="https://ummahsoft.org/salahtime/masjid-embed/prayer_widet.php?masjid_id=53487"
              width="450"
              height="500"
              frameBorder="0"
              marginWidth={0}
              marginHeight={0}
              scrolling="no"
              style={{ border: 'none' }}
              title="MHMA Prayer Times - Masjidi App"
              loading="lazy"
            />
          </div>

          {/* Fallback Notice */}
          <p className="text-center text-xs text-gray-500 mt-4">
            Prayer times provided by Masjidi.com - Updates automatically when changed in Masjidi portal
          </p>
        </div>
      </section>

      {/* Activities Section - Link to Events Page */}
      <section id="activities" className="py-20 bg-white" aria-label="Activities and Events">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <header className="mb-12">
            <h2 className="text-4xl font-bold mb-4 uppercase">Activities and Events</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto mb-6" aria-hidden="true"></div>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We always have activities planned for the community.
            </p>
          </header>
          <a
            href="/events"
            className="inline-flex items-center px-12 py-5 bg-amber-400 text-white font-bold text-lg uppercase tracking-wider hover:bg-amber-500 transition-all duration-300 shadow-lg rounded"
          >
            View All Events
          </a>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2">
              <div className="border-l-4 border-amber-400 pl-8">
                <h2 className="text-4xl font-bold mb-6 uppercase">Our Vision</h2>
                <div className="w-24 h-1 bg-amber-400 mb-6"></div>
                <h3 className="text-2xl text-gray-700 leading-relaxed">
                  Build a cohesive Muslim community, providing the platform to do good for ourselves and others.
                </h3>
              </div>
              <div className="mt-8 pl-8">
                <a
                  href="/mission"
                  className="inline-flex items-center px-6 py-3 border-2 border-gray-800 text-gray-800 font-semibold text-sm uppercase tracking-wider hover:bg-gray-800 hover:text-white transition-all duration-300"
                >
                  Our Mission
                </a>
              </div>
            </div>
            <div className="text-center md:text-right">
              <a
                href="https://donate.stripe.com/aEU3g43Or9LdaLm6oo"
                className="inline-flex items-center px-10 py-5 bg-amber-400 text-white font-bold text-lg uppercase tracking-wider hover:bg-amber-500 transition-all duration-300 shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                DONATE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section with Parallax */}
      <section 
        className="relative py-24 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://mhma.us/wp-content/uploads/2024/01/Vision.webp)',
        }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-4 uppercase">Our Mission</h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-white/90 text-center max-w-4xl mx-auto text-lg leading-relaxed mb-16">
            Promote intra and interfaith harmony through regular activities that bring folks together. 
            Provide a healthy environment for our youth through sports, education and other entertaining 
            activities, building strong bonds and giving them a strong sense of belonging.
          </p>

          {/* 4 Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Build A Masjid */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-center group hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 text-amber-400">
                <Landmark className="w-full h-full" />
              </div>
              <h3 className="text-white text-xl font-bold mb-3">Build A Masjid</h3>
              <p className="text-white/80 text-sm mb-4">
                Alhamdulillah, help us build the Islamic Center of Mountain House
              </p>
              <a
                href="/masjid"
                className="inline-flex items-center text-amber-400 text-sm font-medium hover:text-white transition-colors"
              >
                Learn More →
              </a>
            </div>

            {/* Unity Center */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-center group hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 text-amber-400">
                <Home className="w-full h-full" />
              </div>
              <h3 className="text-white text-xl font-bold mb-3">Unity Center</h3>
              <p className="text-white/80 text-sm mb-4">
                The MHMA utilized the Unity Center for Jumma prayer and other activities.
              </p>
              <a
                href="/unity-center"
                className="inline-flex items-center text-amber-400 text-sm font-medium hover:text-white transition-colors"
              >
                Learn More →
              </a>
            </div>

            {/* Education */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-center group hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 text-amber-400">
                <GraduationCap className="w-full h-full" />
              </div>
              <h3 className="text-white text-xl font-bold mb-3">Education</h3>
              <p className="text-white/80 text-sm mb-4">
                The WISH Program offers a variety of Weekend programs for kids and adults
              </p>
              <a
                href="/education"
                className="inline-flex items-center text-amber-400 text-sm font-medium hover:text-white transition-colors"
              >
                Learn More →
              </a>
            </div>

            {/* Family */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-center group hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 text-amber-400">
                <Users className="w-full h-full" />
              </div>
              <h3 className="text-white text-xl font-bold mb-3">Family</h3>
              <p className="text-white/80 text-sm mb-4">
                MHMA organized regular activities for Muslim families in Mountain House
              </p>
              <a
                href="/family"
                className="inline-flex items-center text-amber-400 text-sm font-medium hover:text-white transition-colors"
              >
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Blog CTA */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a
            href="/journal"
            className="inline-flex items-center px-12 py-5 bg-amber-400 text-white font-bold text-lg uppercase tracking-wider hover:bg-amber-500 transition-all duration-300 shadow-lg rounded"
          >
            Read Our Blog
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <img 
              src="https://mhma.us/wp-content/uploads/2023/12/MHMA-Site-Logo-345x70-1.webp" 
              alt="MHMA" 
              className="h-16 mx-auto mb-6"
              width="300"
              height="61"
            />
          </div>
          <p className="text-center text-gray-400 text-sm mb-6">
            © Copyright 2010-2026 | Mountain House Muslim Association
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://www.facebook.com/mhma95391" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-400 hover:text-white transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.instagram.com/mhma.ig/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-400 hover:text-white transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://twitter.com/mhmuslims" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-400 hover:text-white transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.youtube.com/@mhmuslimassociation" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-400 hover:text-white transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/mountain-house-muslim-association" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-400 hover:text-white transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
