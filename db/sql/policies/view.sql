DROP POLICY "read" on public.gigs;
CREATE POLICY "read"
ON public.gigs
as permissive
FOR select
USING (
  current_setting('request.headers', true)::json->>'x-request-type' = 'read-only'
  and reviewed = true
);