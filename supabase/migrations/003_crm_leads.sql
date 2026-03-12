-- CRM Leads table for sales outreach tracking
create table public.crm_leads (
  id uuid primary key default gen_random_uuid(),
  clinic_name text not null,
  contact_name text,
  title text,
  phone text,
  email text,
  city text,
  tier int default 1 check (tier in (1, 2, 3)),
  status text not null default 'new' check (status in ('new', 'contacted', 'interested', 'demo_scheduled', 'closed_won', 'closed_lost')),
  services_offered text[] default '{}',
  why_good_fit text,
  objections text,
  website_url text,
  source text default 'google',
  deal_value int default 19900, -- cents per month
  last_contacted_at timestamptz,
  next_followup_at timestamptz,
  notes jsonb default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS: only providers can access
alter table public.crm_leads enable row level security;

create policy "Providers manage crm_leads"
  on public.crm_leads
  for all
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'provider'
    )
  );

-- Auto-update updated_at
create or replace function update_crm_leads_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger crm_leads_updated_at
  before update on public.crm_leads
  for each row execute function update_crm_leads_updated_at();

-- Seed: 13 Utah clinics from outreach research
insert into public.crm_leads
  (clinic_name, contact_name, phone, email, city, tier, status, services_offered, why_good_fit, website_url, source, deal_value, next_followup_at)
values
  ('Joint Regeneration Center of Utah', null, '(801) 996-3592', null, 'Salt Lake City', 1, 'contacted',
   ARRAY['peptides','regenerative'], 'Already offers peptides — easiest sell', 'https://regenerationutah.com', 'google', 19900, now() + interval '3 days'),

  ('Modern SLC Injections & Aesthetics', null, '(801) 516-8884', 'info@modernslc.com', 'Holladay', 1, 'contacted',
   ARRAY['peptides','aesthetics'], 'Already offering peptide therapy — great Holladay positioning', 'https://modernslc.com', 'google', 19900, now() + interval '3 days'),

  ('Gameday Men''s Health', null, '(801) 749-4263', null, 'Cottonwood Heights', 1, 'contacted',
   ARRAY['trt','mens_health'], 'TRT + peptide recovery combo — natural upsell', 'https://gamedaymenshealth.com', 'google', 39900, now() + interval '3 days'),

  ('Altitude MedSpa', null, '(801) 230-2822', null, 'Millcreek', 1, 'contacted',
   ARRAY['aesthetics','wellness'], 'MedSpa — peptide + aesthetic bundle angle', 'https://altitudemedspa.com', 'google', 19900, now() + interval '3 days'),

  ('Revive Wellness & Aesthetics', null, '(435) 774-2728', null, 'Logan', 1, 'contacted',
   ARRAY['wellness','aesthetics'], 'Underserved Logan market — first mover advantage', 'https://reviveutah.org', 'google', 19900, now() + interval '3 days'),

  ('FIKA Infusion + Wellness', null, '(801) 866-2201', null, 'Salt Lake City', 2, 'new',
   ARRAY['iv_therapy','weight_loss'], 'Offers semaglutide + NAD+ — natural peptide upsell', null, 'google', 39900, now() + interval '1 day'),

  ('Integrative Medica', 'Jake Schmutz', '(801) 676-9876', 'integrativemedica@gmail.com', 'Salt Lake City', 2, 'new',
   ARRAY['functional','naturopathic'], 'NMD — naturopathic + peptide synergy pitch', null, 'google', 39900, now() + interval '1 day'),

  ('Salt Lake Health & Vitality', 'Leslie Cooper', null, null, 'Murray', 2, 'new',
   ARRAY['concierge'], 'Concierge practice — premium tier candidate', 'https://saltlakevitality.com', 'google', 39900, now()),

  ('Evolutionary Healthcare', null, '(801) 519-2461', null, 'Salt Lake City', 2, 'new',
   ARRAY['concierge'], 'Concierge since 2005 — established loyal patient base', null, 'google', 39900, now()),

  ('Genesys Men''s Health', null, '(801) 671-7456', null, 'Sandy', 2, 'new',
   ARRAY['trt','mens_health'], 'TRT + hormone clinic — peptide recovery angle', null, 'google', 39900, now() + interval '1 day'),

  ('Knepper Concierge Medicine', 'Jennifer Knepper', null, null, 'Park City', 2, 'new',
   ARRAY['concierge'], 'Concierge — high-income Park City patients', 'https://knepperconciergemedicine.com', 'google', 39900, now() + interval '2 days'),

  ('Heron Wellness', 'Amy de la Garza', '(801) 447-1812', null, 'Salt Lake City', 2, 'new',
   ARRAY['functional','concierge'], 'Functional/concierge — fits peptide protocol model', null, 'google', 39900, now() + interval '2 days'),

  ('Precision Pointe Regenerative Health', null, '(801) 613-8002', null, 'Draper', 2, 'new',
   ARRAY['regenerative'], 'Regenerative ortho — peptide recovery pitch', null, 'google', 39900, now() + interval '3 days');
