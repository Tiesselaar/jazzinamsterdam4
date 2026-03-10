-- submit.sql
CREATE or replace function cal_today(cal text)
RETURNS date
LANGUAGE sql STABLE
AS $$
  SELECT (current_timestamp AT TIME ZONE r.time_zone)::date
  FROM calendars c
  JOIN regions r USING (region)
  WHERE c.calendar = cal
$$;

DROP POLICY "submissions" on public.gigs;
CREATE POLICY "submissions"
ON public.gigs
as permissive
FOR ALL
USING (
  -- user_id = auth.uid()
  gigs.date >= cal_today(gigs.calendar)
)
WITH CHECK (
  gigs.reviewed = false
  and gigs.date >= cal_today(gigs.calendar)
);

-- view.sql
DROP POLICY "read" on public.gigs;
CREATE POLICY "read"
ON public.gigs
as permissive
FOR select
USING (
  current_setting('request.headers', true)::json->>'x-request-type' = 'read-only'
);

