-- 0_drop_views.sql
drop view if exists view_gigs;
drop view if exists view_gigs_with_display_date;
drop view if exists view_gigs_with_time;
drop view if exists view_timed_calendars;

-- 1_create_view_timed_calendars.sql
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

-- 2_create_view_gigs_with_time.sql
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

-- 3_create_view_gigs_with_display_date.sql
create or replace view view_gigs_with_display_date
with
  (security_invoker = on) as
select
  *,
  case
    when calendar_type = 'concert' then ((date_time - interval '4 hours') at time zone time_zone)::date
    when calendar_type = 'film' then date
    when calendar_type = 'exhibition' then
      case
        when current_display_date between date and end_date
        then current_display_date
        else date
      end
    else date
  end as display_date
FROM
  view_gigs_with_time;

-- 4_create_view_gigs.sql
create or replace view view_gigs
with (security_invoker = on) as
select
  *,
  display_date >= current_display_date as is_after_yesterday,
  case
    when calendar_type = 'concert' then display_date < current_display_date
    when calendar_type = 'film' then date_time < current_timestamp
    when calendar_type = 'exhibition' then display_date < current_display_date
    else display_date < current_display_date
  end as archive
from
  view_gigs_with_display_date
-- where
  -- reviewed = true
order by
  date,
  "time",
  id;

