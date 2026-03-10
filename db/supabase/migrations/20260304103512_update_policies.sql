-- sumbit.sql
DROP POLICY "Future events" on public.gigs;
CREATE POLICY "Future events"
ON public.gigs
AS restrictive
FOR ALL
USING (
  (date + "time")::date >= (
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
  )::date
)
WITH CHECK (
  (date + "time")::date >= (
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
  )::date
)

