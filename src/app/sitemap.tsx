import { getHostName } from "@/lib/paths"
import { canonical, metaDataList } from "@/lib/supabase"
import type { MetadataRoute } from "next"
import { headers } from "next/headers"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  
  const canonicalHost = canonical.get(getHostName(await headers()))
    

  const calendars = metaDataList.filter(m => m.canonical == canonicalHost)
  const domains = calendars.filter(c => c.order == 1)
  const urls: MetadataRoute.Sitemap = []

  for (const d of domains) {
    const base = 'https://' + d.canonical
    urls.push(
      {
        url: base,
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: base + '/about',
        changeFrequency: "yearly",
        priority: 0.3,
      }
    )
  }

  for (const c of calendars) {
    if (c.order !== 1) {
      const path = `https://${c.canonical}/${c.slug}`
      urls.push(
        {
          url: path,
          changeFrequency: "daily",
          priority: 1.0,
        },
        {
          url: `https://${c.canonical}/${c.slug}/archive`,
          changeFrequency: "daily",
          priority: 0.3,
        },
      )
    }
  }

  return urls
}
