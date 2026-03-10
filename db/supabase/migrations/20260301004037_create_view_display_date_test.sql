create
or replace view view_gigs_with_display_date
with
  (security_invoker = on) as
select
  *,
  case
    when calendar_type = 'concert' then (
      (date_time - interval '5 hours') at time zone time_zone
      )::date
    when calendar_type = 'film' then date
  end as display_date
FROM
  view_gigs_with_time