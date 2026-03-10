create
or replace view view_gigs
with (security_invoker = on) as
select
  *,
  case
    when calendar_type = 'concert' then display_date < (
      (current_timestamp - interval '3 hours') at time zone time_zone
    )::date
    when calendar_type = 'film' then date_time < current_timestamp
    when calendar_type = 'exhibition' then display_date < (
      (current_timestamp) at time zone time_zone
    )::date
  end as archive
from
  view_gigs_with_display_date