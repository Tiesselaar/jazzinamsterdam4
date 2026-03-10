import { Tables } from '@/types/supabase';

export class Form {
  title: string = "";
  date: string = "";
  time: string = "";
  venue: string = "";
  price: string = "";
  site: string = "";
  address: string = "";
}

export const tableToForm = (table: Tables<'gigs'> | Tables<'view_gigs'>): Form => ({
  date: table.date,
  time: table.time,
  title: table.title,
  venue: table.venue,
  address: table.address,
  site: table.site,
  price: table.price,
});

function formatPrice(price: string) {
  if (price) {
    const priceFloat = Math.round(Number(price) * 100) / 100;
    if (priceFloat == 0)
      return 'free';

    else
      return '\u20ac' + priceFloat.toString();
  } else {
    return "";
  }
}

export const formToTable = (form: Form) => ({
  ...form,
  price: formatPrice(form.price)
});