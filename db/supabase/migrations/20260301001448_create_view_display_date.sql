create
or replace view view_gigs_with_display_date
with
  (security_invoker = on) as
select
  *,
  case
    when calendar_type = 'concert' then (date_time - interval '15 hours')::date
  end as display_date
FROM
  view_gigs_with_time