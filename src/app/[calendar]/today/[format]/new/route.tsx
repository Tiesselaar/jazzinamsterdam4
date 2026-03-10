import { createSupabaseClient } from "@/lib/supabase"

export async function GET(
    req: Request,
    props: {
        params: Promise<{ calendar: string, format: string }>
    }
) {
    const params = await props.params;
    const { calendar, format } = params;

    if (!['post', 'story'].includes(format) ||
        !['jazzAmsterdam', 'classicalAmsterdam'].includes(calendar)) {
        return new Response("no such page", { status: 404 })
    }

    const blob = (await createSupabaseClient().storage.from('today').download(`/${calendar}/${format}.jpg`)).data

    return new Response(
        blob,
        {
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Length': String(blob?.size)
            }
        }
    )
}