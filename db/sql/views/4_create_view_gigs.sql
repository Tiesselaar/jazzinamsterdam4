create or replace view view_gigs
with (security_invoker = on) as
select
  *,
  case
    when calendar_type = 'concert' then display_date < current_display_date
    when calendar_type = 'film' then date_time < current_timestamp
    when calendar_type = 'exhibition' then display_date < current_display_date
    else display_date < current_display_date
  end as archive
from
  view_gigs_with_display_date;