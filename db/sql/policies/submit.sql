DROP POLICY "submissions" on public.gigs;

CREATE POLICY "submissions" ON public.gigs as permissive FOR ALL USING (
  (
    user_id = auth.uid ()
    or is_moderator ()
  )
  and gigs.date >= cal_today (gigs.calendar)
  and current_setting('request.headers', true)::json->>'x-request-type' = 'authorized'
)
WITH
  CHECK (
    (
      gigs.reviewed = false
      or is_moderator ()
    )
    and gigs.date >= cal_today (gigs.calendar)
    and current_setting('request.headers', true)::json->>'x-request-type' = 'authorized'
  );