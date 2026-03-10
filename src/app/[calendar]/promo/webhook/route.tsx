import { createSupabaseClient } from '@/lib/supabase';
import createMollieClient from '@mollie/api-client';
import { BTW_TARIEF } from '../BASEPRICE';

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_PRIVATE_KEY as string });

export async function POST(req: Request) {
  const body = await req.text();
  const params = new URLSearchParams(body);

  const id = params.get("id") as string
  const payment = await mollieClient.payments.get(id)

  const metadata = payment.metadata as { promo_gig_id: number, days: number }
  const promo_gig_id = metadata.promo_gig_id
  const days = metadata.days

  console.log(`Days: ${days}`)
  console.log(`Payment status: ${payment.status}`)

  if (['canceled', 'expired'].includes(payment.status)) return new Response('not a vibe')
  if (payment.status != 'paid') return Response.error()

  const expiration_date = new Date()
  expiration_date.setDate(expiration_date.getDate() + days)
  expiration_date.setHours(expiration_date.getHours() + 6)

  // await createSupabaseClient()
  //   .from('promo_gigs')
  //   .insert({
  //     promo_gig_id: promo_gig_id,
  //     expiration_date: expiration_date,
  //     invoice: payment.redirectUrl,
  //     invoice_date: payment.createdAt.slice(0, 10),
  //     amount: (parseFloat(payment.amount.value) / (1 + BTW_TARIEF / 100)).toFixed(2),
  //     btw: (parseFloat(payment.amount.value) / (1 + BTW_TARIEF / 100) * BTW_TARIEF / 100).toFixed(2)
  //   })

  // const promo_gig = await createSupabaseClient()
  //   .from('gigs')
  //   .update({ reviewed: true })
  //   .eq('id', promo_gig_id)
  //   .select()
  //   .then(({ error, data }) => data?.pop())

  // if (promo_gig == undefined) return new Response("Promo gig not found!")

  return new Response("OK")
}