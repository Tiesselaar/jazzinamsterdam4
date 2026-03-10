create
or replace view view_gigs_with_time
with
  (security_invoker = on) as
select
  *,
  (
    (gigs.date + gigs."time") AT TIME ZONE regions.time_zone
  ) AS date_time
FROM
  (
    gigs
    JOIN (
      calendars
      JOIN regions using (region)
    ) USING (calendar)
  )
WHERE
  (reviewed = true)
ORDER BY
  date,
  "time",
  venue,
  title,
  id;