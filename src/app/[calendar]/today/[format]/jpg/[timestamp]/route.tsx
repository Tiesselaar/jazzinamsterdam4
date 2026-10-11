import { metaData } from "@/lib/supabase";
import { notFound } from "next/navigation";

export async function GET(
  req: Request,
  props: {
    params: Promise<{ calendar: string, format: string }>
  }
) {
  const params = await props.params;
  const { calendar, format } = params;

  if (!['post', 'story'].includes(format) || !metaData.get(calendar))
    notFound()

  const date = new Date().toISOString().slice(0, 10);

  const screenshot_parameters = {
    access_key: process.env.APIFLASH_API_KEY as string,
    url: `https://jazzinamsterdam4.vercel.app/${calendar}/today/${format}/html/${date}`,
    quality: "100",
    scale_factor: "2",
    element: "#container",
    wait_for: "#container",
    wait_until: "network_idle",
    // fresh: "true"
  }
  const imageURL = 'https://api.apiflash.com/v1/urltoimage?' + new URLSearchParams(screenshot_parameters);

  return fetch(imageURL, { cache: 'no-store' })
    .then(response => response.blob())
    .then(blob => new Response(blob,
      {
        headers: {
          'Content-Type': 'image/jpeg',
          'Content-Length': String(blob.size)
        }
      })
    )
}