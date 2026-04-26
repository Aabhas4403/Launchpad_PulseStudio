import { NextResponse } from 'next/server';
import { z } from 'zod';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export const runtime = 'nodejs';

const Body = z.object({
  email: z.string().email(),
  product: z.enum(['content-pulse', 'shelf-pulse', 'both']),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON' },
      { status: 400 },
    );
  }

  const parsed = Body.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Please provide a valid email and product.' },
      { status: 400 },
    );
  }

  const { email, product } = parsed.data;
  const entry = {
    email,
    product,
    ts: new Date().toISOString(),
    ua: req.headers.get('user-agent') ?? null,
  };

  // 1) Always log — visible in `vercel logs` and `next dev` output.
  console.log('[waitlist]', JSON.stringify(entry));

  // 2) In local dev, also append to a JSON file. On Vercel the filesystem is
  //    read-only, so we swallow the error and rely on logs / future provider.
  if (process.env.NODE_ENV !== 'production') {
    try {
      const file = path.join(process.cwd(), 'data', 'waitlist.json');
      await fs.mkdir(path.dirname(file), { recursive: true });
      const existing = await fs
        .readFile(file, 'utf8')
        .then((s) => JSON.parse(s) as unknown[])
        .catch(() => [] as unknown[]);
      existing.push(entry);
      await fs.writeFile(file, JSON.stringify(existing, null, 2));
    } catch {
      /* non-fatal */
    }
  }

  // 3) Extension points — wire whichever ESP you prefer:
  //    - Resend:  await fetch('https://api.resend.com/emails', { ... headers: Bearer RESEND_API_KEY ... })
  //    - Loops:   await fetch('https://app.loops.so/api/v1/contacts/create', { ... })
  //    - Supabase / Convex / Postgres for durable storage
  //    Keep the call wrapped in try/catch so a vendor outage never breaks signup.

  return NextResponse.json({ ok: true });
}
