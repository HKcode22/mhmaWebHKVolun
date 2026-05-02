import { NextRequest, NextResponse } from 'next/server';

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://mhma-update.local/wp-json';

export async function GET(request: NextRequest) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const programsResponse = await fetch(
      `${WP_API_URL}/wp/v2/pages?parent=70&per_page=100`,
      { next: { revalidate: 60 }, signal: controller.signal }
    );
    clearTimeout(timeout);
    
    if (!programsResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
    }

    const programs = await programsResponse.json();

    // Fetch media URLs for programs with numeric image IDs
    const programsWithMedia = await Promise.all(
      programs.map(async (program: any) => {
        if (program.acf?.program_image && typeof program.acf.program_image === 'number') {
          try {
            const mediaResponse = await fetch(`${WP_API_URL}/wp/v2/media/${program.acf.program_image}`);
            if (mediaResponse.ok) {
              const media = await mediaResponse.json();
              return {
                ...program,
                acf: {
                  ...program.acf,
                  program_image: media.source_url || media.guid?.rendered || "",
                },
              };
            }
          } catch (e) {
            // Ignore media fetch errors
          }
        }
        return program;
      })
    );

    return NextResponse.json(programsWithMedia);
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}