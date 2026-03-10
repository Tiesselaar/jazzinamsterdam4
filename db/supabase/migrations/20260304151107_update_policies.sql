-- submit.sql
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
  and user_id in (select auth.uid())
)
WITH CHECK (
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
  ))::date
  ) and gigs.reviewed = false
);

-- view.sql
DROP POLICY "view" on public.gigs;
CREATE POLICY "view"
ON public.gigs
as permissive
FOR select
USING (
  current_setting('request.header.X-read-only', true) = 'yes'
);

