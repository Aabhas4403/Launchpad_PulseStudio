'use client';

import { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import type { ProductSlug } from '@/lib/products';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function WaitlistForm({
  defaultProduct = 'both',
}: {
  defaultProduct?: ProductSlug | 'both';
}) {
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState<ProductSlug | 'both'>(defaultProduct);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? 'Something went wrong');
      }
      setStatus('success');
      setMessage("You're on the list. We'll be in touch shortly.");
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return (
    <form
      id="waitlist"
      onSubmit={onSubmit}
      className="relative rounded-2xl border border-white/8 bg-[var(--color-surface)] p-7 md:p-10 space-y-6 overflow-hidden"
    >
      <div className="absolute -top-24 -left-24 w-56 h-56 bg-[var(--color-brand)]/15 blur-3xl rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-56 h-56 bg-[var(--color-accent)]/12 blur-3xl rounded-full" />

      <div className="relative space-y-2">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-brand)]">
          Private beta
        </p>
        <h3 className="text-3xl md:text-4xl font-black tracking-tighter">
          Get on the list
        </h3>
        <p className="text-[var(--color-muted)] text-sm md:text-base max-w-lg">
          We're onboarding ~25 brand and growth teams a month. No spam — just
          access details and a short call to set things up.
        </p>
      </div>

      <div className="relative space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3">
          <input
            type="email"
            required
            placeholder="you@brand.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'submitting' || status === 'success'}
            className="h-12 px-5 rounded-full bg-black/50 border border-white/10 text-white placeholder:text-[var(--color-faint)] focus:outline-none focus:border-[var(--color-brand)]/60 focus:ring-2 focus:ring-[var(--color-brand)]/30 disabled:opacity-50 transition font-medium"
          />
          <select
            value={product}
            onChange={(e) =>
              setProduct(e.target.value as ProductSlug | 'both')
            }
            disabled={status === 'submitting' || status === 'success'}
            className="h-12 px-5 rounded-full bg-black/50 border border-white/10 text-white focus:outline-none focus:border-[var(--color-brand)]/60 focus:ring-2 focus:ring-[var(--color-brand)]/30 disabled:opacity-50 cursor-pointer font-bold text-sm"
          >
            <option value="both">Both products</option>
            <option value="content-pulse">Content Pulse</option>
            <option value="shelf-pulse">Shelf Pulse</option>
          </select>
          <button
            type="submit"
            disabled={status === 'submitting' || status === 'success'}
            className="h-12 px-7 inline-flex items-center justify-center gap-2 bg-[var(--color-brand)] text-black font-black uppercase text-[11px] tracking-[0.18em] rounded-full hover:bg-[var(--color-brand-hover)] hover:scale-[1.03] transition disabled:opacity-60 disabled:hover:scale-100 brand-glow"
          >
            {status === 'submitting' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            {status === 'success' ? 'Welcome aboard' : 'Request access'}
          </button>
        </div>

        {status === 'success' && (
          <div className="flex items-center gap-2 text-sm text-[var(--color-brand)] font-bold pt-1">
            <CheckCircle2 className="w-4 h-4" /> {message}
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center gap-2 text-sm text-rose-400 font-bold pt-1">
            <AlertCircle className="w-4 h-4" /> {message}
          </div>
        )}
      </div>
    </form>
  );
}
