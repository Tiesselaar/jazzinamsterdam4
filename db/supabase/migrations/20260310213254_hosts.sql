create
or replace view view_hosts
with
  (security_invoker = on) as
select
  *
from
  hosts
  join metadata using (region);