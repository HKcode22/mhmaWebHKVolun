import { NextRequest, NextResponse } from 'next/server';

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://mhma-update.local/wp-json';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const parentId = searchParams.get('parent') || '277';

  try {
    const response = await fetch(
      `${WP_API_URL}/wp/v2/pages?parent=${parentId}&per_page=100`,
      { next: { revalidate: 60 } }
    );
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }

    const events = await response.json();

    // Fetch media URLs for events with numeric poster IDs
    const eventsWithMedia = await Promise.all(
      events.map(async (event: any) => {
        if (event.acf?.event_poster && typeof event.acf.event_poster === 'number') {
          try {
            const mediaResponse = await fetch(`${WP_API_URL}/wp/v2/media/${event.acf.event_poster}`);
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
          } catch (e) {
            // Ignore media fetch errors
          }
        }
        return event;
      })
    );

    return NextResponse.json(eventsWithMedia);
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}