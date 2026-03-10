-- create_view_gigs.sql
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
order by
  date,
  "time",
  id;

-- create_view_gigs_with_display_date.sql
create
or replace view view_gigs_with_display_date
with
  (security_invoker = on) as
select
  *,
  case
    when calendar_type = 'concert' then ((date_time - interval '4 hours') at time zone time_zone)::date
    when calendar_type = 'film' then date
    when calendar_type = 'exhibition' then
      case
        when (current_timestamp at time zone time_zone)::date between date and end_date
        then (current_timestamp at time zone time_zone)::date
        else date
      end
    else date
  end as display_date
FROM
  view_gigs_with_time;

-- create_view_gigs_with_time.sql
create
or replace view view_gigs_with_time
with
  (security_invoker = on) as
select
  *,
  (
    (gigs.date + gigs."time") AT TIME ZONE regions.time_zone
  ) AS date_time
from
  (
    gigs
    join (
      calendars
      join regions using (region)
    ) join (calendar)
  )
where
  (reviewed = true);

