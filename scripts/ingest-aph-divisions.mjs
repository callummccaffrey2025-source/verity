import 'node-fetch-polyfill';
import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const srk = process.env.SUPABASE_SERVICE_ROLE_KEY;
const sb = createClient(url, srk);

// RSS of divisions (House)
const FEED = 'https://www.aph.gov.au/house/rss/divisions';
const xml = await (await fetch(FEED)).text();

// super-light parse to get titles/links/dates
const items = [...xml.matchAll(/<item>[\s\S]*?<\/item>/g)].map(block=>{
  const get = (tag) => (block[0].match(new RegExp(`<${tag}><!\\[CDATA\\[(.*?)\\]\\]>`) )?.[1]
                      || block[0].match(new RegExp(`<${tag}>(.*?)<\\/${tag}>`))?.[1] || '').trim();
  return { title:get('title'), url:get('link'), status:'Division' };
});

if (!items.length) { console.log('No divisions'); process.exit(0); }
const { error } = await sb.from('bills')
  .upsert(items.map(x => ({ title:x.title, status:x.status })));
if (error) { console.error('Upsert error', error); process.exit(1); }
console.log(`Upserted ${items.length} divisions into bills`);
