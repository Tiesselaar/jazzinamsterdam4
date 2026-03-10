-- archive.sql
CREATE POLICY "Future events"
ON public.gigs
FOR ALL
USING (
  (date + "time") > (
    current_timestamp AT TIME ZONE (
      select
        regions.time_zone
      from
        (
          calendars
          join regions using (region)
        )
      where
        calendar = calendars.calendar
    )
  )
)
WITH CHECK (
  (date + "time") > (
    current_timestamp AT TIME ZONE (
      select
        regions.time_zone
      from
        (
          calendars
          join regions using (region)
        )
      where
        calendar = calendars.calendar
    )
  )
)

