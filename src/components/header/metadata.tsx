import { metaData } from "@/lib/supabase"

export default async function metaPages(calendar: string) {
  let meta = metaData.get(calendar) ?? metaData.get('jazzAmsterdam')!

  const path = meta.order == 1 ? '/' : meta.slug

  return {
    metadataBase: new URL(`https://${meta.host}`),
    title: meta.title,
    alternates: {
      canonical: path
    },
    description: meta.description,
    appleWebApp: {
      title: meta.title,
    },
    openGraph: {
      type: "website",
      url: path,
      title: meta.title,
      description: meta.description,
      siteName: meta.title,
      images: [{
        url: "/graph.jpg",
      }],
    }
  }
}