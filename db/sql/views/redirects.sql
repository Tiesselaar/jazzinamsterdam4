create
or replace view redirects
with
  (security_invoker = on) as
select
  host,
  slug,
  calendar,
  "order"
from
  metadata
  join hosts using (canonical);