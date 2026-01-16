-- Add service_type column to live_stream table
alter table public.live_stream 
add column if not exists service_type text default 'Sunday Service';
