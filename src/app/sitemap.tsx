import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const res = await fetch("https://jazzin.amsterdam/api/meta?fields=id,slug")
    const calendars = await res.json()

    const base = "https://jazzin.amsterdam"

    // Static homepage
    const urls: MetadataRoute.Sitemap = [
        {
            url: base,
            changeFrequency: "daily",
            priority: 1.0,
        },
    ]

    for (const calendar of calendars) {
        const slug = calendar.slug

        urls.push(
            {
                url: `${base}/${slug}`,
                changeFrequency: "daily",
                priority: 1.0,
            },
            {
                url: `${base}/${slug}/submit`,
                changeFrequency: "yearly",
                priority: 0.5,
            },
            {
                url: `${base}/${slug}/archive`,
                changeFrequency: "daily",
                priority: 0.8,
            },
            {
                url: `${base}/${slug}/about`,
                changeFrequency: "yearly",
                priority: 0.8,
            }
        )
    }

    return urls
}
