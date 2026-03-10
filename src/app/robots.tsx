import type { MetadataRoute } from "next"

export default async function robots(): Promise<MetadataRoute.Robots> {
    const res = await fetch("https://jazzin.amsterdam/api/meta?fields=id,slug")
    const calendars = await res.json() as { "id": string, "slug": string }[]
    
    // Build dynamic promo disallow rules from DB
    const mainPaths = calendars.map(g => `/${g.slug}`)
    const promoPaths = calendars.map(g => `/${g.slug}/promo/*`)
    const legacyPromoPaths = calendars.map(g => `/cal/${g.id}/promo/*`)

    return {
        rules: [
            {
                userAgent: "*",
                allow: [
                    "/",
                    ...mainPaths
                ],
                disallow: [
                    "/ics/",
                    "/ics/*",
                    "*/promo/*",
                    ...promoPaths,
                    ...legacyPromoPaths,
                ],
            },
            {
                userAgent: [
                    "Googlebot",
                    "Bingbot",
                    "Amazonbot",
                    "Yandex",
                    "DuckDuckBot",
                    "Baiduspider",
                    "Sogou",
                    "Exabot",
                    "facebot",
                    "ia_archiver",
                    "IbouBot",
                    "PetalBot",
                ],
                disallow: [
                    "/ics/",
                    "/ics/*",
                    "/*/promo/*",
                    "/cal/*/promo/*"
                ],
            },
        ],
        sitemap: "https://jazzin.amsterdam/sitemap.xml",
    }
}