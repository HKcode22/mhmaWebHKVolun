import { NextRequest, NextResponse } from 'next/server';

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://mhma-update.local/wp-json';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(
      `${WP_API_URL}/wp/v2/pages?parent=199&per_page=100`,
      { next: { revalidate: 60 } }
    );
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch journal entries' }, { status: 500 });
    }

    const entries = await response.json();
    return NextResponse.json(entries);
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}