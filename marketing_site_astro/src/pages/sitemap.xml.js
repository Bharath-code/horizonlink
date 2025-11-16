import { glob } from 'astro/glob';

export async function GET() {
  const pages = await glob('./**/*.astro', {
    import: (file) => file.url,
  });

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) => `
            <url>
              <loc>${page}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
            </url>
          `
        )
        .join('')}
    </urlset>
  `;

  return new Response(sitemap.trim(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
