-- submit.sql
DROP POLICY "submissions" on public.gigs;

CREATE POLICY "submissions" ON public.gigs as permissive FOR ALL USING (
  (
    user_id = auth.uid ()
    or (
      auth.uid () in (
        select
          moderator_id
        from
          permissions
      )
    )
  )
  and gigs.date >= cal_today (gigs.calendar)
)
WITH
  CHECK (
    (
      gigs.reviewed = false
      or is_moderator()
      or true
    )
    and gigs.date >= cal_today (gigs.calendar)
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

