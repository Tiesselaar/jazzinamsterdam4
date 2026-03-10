create or replace view view_gigs_with_time
with
  (security_invoker = on) as
select
  *,
  (
    (gigs.date + gigs."time") AT TIME ZONE time_zone
  ) AS date_time
from
  gigs
  join view_timed_calendars using (calendar);