// lib/wordpress.ts - Headless WordPress GraphQL utility
// This file provides robust fetch functions to query the WordPress GraphQL API

const WP_GRAPHQL_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://mhma-update.local/graphql";

/**
 * Generic GraphQL fetch function for WordPress
 * @param query - GraphQL query string
 * @param variables - Optional variables for the query
 * @returns Promise with the data or null on error
 */
export async function fetchGraphQL<T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<T | null> {
  try {
    const response = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      // Cache for 5 minutes to avoid hammering WordPress
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      console.warn(`WPGraphQL fetch failed: ${response.status} ${response.statusText}`);
      return null;
    }

    const json = await response.json();

    if (json.errors) {
      console.warn("WPGraphQL errors:", json.errors);
      return null;
    }

    return json.data as T;
  } catch (error) {
    console.warn("Failed to fetch from WordPress:", error);
    return null;
  }
}

// Types for MHMA Management ACF fields
// Field names match the GraphQL schema (camelCase)
export interface MHMASiteManagement {
  homeHeroText?: string;
  urgentAnnouncement?: string;
  fajr?: string;
  zuhr?: string;
  asr?: string;
  magribh?: string;
  isha?: string;
  activitiesList?: string;
}

/**
 * Fetch MHMA Site Management ACF fields
 * Tries multiple GraphQL queries in order of preference
 */
export async function fetchMHMAManagement(): Promise<MHMASiteManagement | null> {
  // Query the Homepage (/) which has the Site Management ACF fields
  const query = `
    query GetSiteManagement {
      page(id: "cG9zdDoyNA==", idType: ID) {
        id
        title
        mhmaManagement {
          homeHeroText
          urgentAnnouncement
          fajr
          zuhr
          asr
          magribh
          isha
          activitiesList
        }
      }
    }
  `;

  const data = await fetchGraphQL<{
    page: {
      mhmaManagement: MHMASiteManagement;
    }
  }>(query);

  return data?.page?.mhmaManagement || null;
}

// Types for WordPress Posts (Activities)
export interface WordPressPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  uri: string;
}

/**
 * Fetch WordPress Posts for Activities section
 * Returns posts sorted by date (newest first)
 */
export async function fetchActivitiesPosts(limit: number = 10): Promise<WordPressPost[]> {
  const query = `
    query GetActivitiesPosts($limit: Int!) {
      posts(first: $limit, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          title
          excerpt
          date
          uri
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL<{ posts: { nodes: WordPressPost[] } }>(query, { limit });
  return data?.posts?.nodes || [];
}

// Types for WordPress Events (pages with Event Details ACF)
export interface WordPressEvent {
  id: number;
  title: { rendered: string };
  acf: {
    event_poster?: string;
    event_date?: string;
    event_time?: string;
    event_location?: string;
    event_rsvp_link?: string;
    event_description?: string;
    event_name?: string;
  };
}

/**
 * Fetch WordPress Events from REST API (children of homepage)
 * Uses REST API instead of GraphQL for ACF fields
 * Also fetches media URLs for event posters
 */
export async function fetchEvents(parentId: number = 152): Promise<WordPressEvent[]> {
  try {
    const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://mhma-update.local/wp-json";
    // Add timestamp to bust cache
    const timestamp = Date.now();
    const response = await fetch(`${WP_API_URL}/wp/v2/pages?parent=${parentId}&per_page=100&_=${timestamp}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.warn(`Failed to fetch events: ${response.status}`);
      return [];
    }

    const events: WordPressEvent[] = await response.json();
    
    // Fetch media URLs for events that have numeric poster IDs
    const eventsWithMedia = await Promise.all(
      events.map(async (event) => {
        if (event.acf.event_poster && typeof event.acf.event_poster === 'number') {
          try {
            const mediaResponse = await fetch(`${WP_API_URL}/wp/v2/media/${event.acf.event_poster}?_=${timestamp}`);
            if (mediaResponse.ok) {
              const media = await mediaResponse.json();
              return {
                ...event,
                acf: {
                  ...event.acf,
                  event_poster: media.source_url || media.guid?.rendered || "",
                },
              };
            }
          } catch (error) {
            console.warn(`Failed to fetch media for event ${event.id}:`, error);
          }
        }
        return event;
      })
    );
    
    return eventsWithMedia || [];
  } catch (error) {
    console.warn("Failed to fetch events:", error);
    return [];
  }
}

/**
 * Utility hook data fetcher for client components
 * This is used for client-side data fetching with fallback
 */
export function useWordPressData<T>(
  fetcher: () => Promise<T | null>,
  defaultValue: T
): { data: T; loading: boolean; error: boolean } {
  // This is a placeholder for client-side fetching logic
  // In practice, you'd use React hooks here, but since this is a utility file,
  // we export the fetcher functions for use in useEffect hooks
  return { data: defaultValue, loading: false, error: false };
}
