-- sumbit.sql
DROP POLICY "submissions" on public.gigs;
CREATE POLICY "submissions"
ON public.gigs
FOR ALL
USING (
  (
    gigs.date >= (
      current_timestamp AT TIME ZONE (
        select
          regions.time_zone
        from
          (
            calendars
            join regions using (region)
          )
        where
          gigs.calendar = calendars.calendar
      )
    )::date
  )
  -- and
  -- (
  --   (select auth.uid()) = gigs.user_id
  -- )
)
WITH CHECK (
  gigs.date >= ((
    current_timestamp AT TIME ZONE (
      select
        regions.time_zone
      from
        (
          calendars
          join regions using (region)
        )
      where
        gigs.calendar = calendars.calendar
    )
  )::date
))

