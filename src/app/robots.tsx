import { getHostName } from "@/lib/paths"
import { canonical, metaDataList } from "@/lib/supabase"
import type { MetadataRoute } from "next"
import { headers } from "next/headers"

export default async function robots(): Promise<MetadataRoute.Robots> {
  const hostname = canonical.get(getHostName(await headers()))
  const calendars = metaDataList.filter(m => m.canonical == hostname)

  const mainPaths = calendars.filter(c => c.order != 1).map(g => `/${g.slug}`)
  const promoPaths = calendars.map(g => `/${g.slug}/promo/*`)
  const legacyPromoPaths = calendars.map(g => `/cal/${g.calendar}/promo/*`)


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
    sitemap: `https://${hostname}/sitemap.xml`,
  }
}