create
or replace view view_timed_calendars
with
  (security_invoker = on) as
select
  *,
  case
    when calendar_type = 'concert' then (
      now () at time zone time_zone - interval '4 hours'
    )::date
    else (now () at time zone time_zone)::date
  end as current_display_date
from
  calendars
  join regions using (region);