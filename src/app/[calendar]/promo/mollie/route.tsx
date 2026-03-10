import createMollieClient from '@mollie/api-client';
import { BASE_PRICE } from '../BASEPRICE';
import { Tables } from '@/types/supabase';

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_PRIVATE_KEY as string });

function description(title: string, venue: string, date: string, days: number) {
  return `Promotion (${days} day${days>1?"s":""}) ${title} // ${venue} // ${date}`
}

async function make_payment(
  calendar: string,
  id: number,
  days: number,
  description: string,
  price: string,
) {

  const payment = await mollieClient.payments.create({
    amount: {
      value: price,
      currency: 'EUR'
    },
    description: description,
    redirectUrl: `https://jazzin.amsterdam/calendar/${calendar}/promo/invoice`,
    webhookUrl: `https://jazzin.amsterdam/calendar/${calendar}/promo/webhook`,
    metadata: {
      id: id,
      days: days
    }
  });

  await mollieClient.payments.update(payment.id, {
    redirectUrl: `https://jazzin.amsterdam/cal/${calendar}/promo/invoice/${payment.id}`
  })

  try {
    const checkoutUrl = payment.getCheckoutUrl()
    if (checkoutUrl) {
      return Response.redirect(checkoutUrl)
    } else {
      return new Response('failed to get payment link...', { status: 500 })
    }
  } catch (error: unknown) {
    return new Response('failed to get load checkout page...', { status: 500 })
  }
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const calendar = formData.get("calendar") as string
  const id = Number.parseInt(formData.get("id") as string)
  const title = formData.get("title") as string
  const venue = formData.get("venue") as string
  const date = formData.get("date") as string
  const days = Number.parseInt(formData.get("days") as string)

  return make_payment(
    calendar,
    id,
    days,
    description(title, venue, date, days),
    (BASE_PRICE * days).toFixed(2),
  )
}