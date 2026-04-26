import type { Product } from '@/lib/products';

export default function FeatureGrid({ product }: { product: Product }) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {product.features.map((f, i) => (
            <div
              key={f.title}
              className="group relative rounded-2xl border border-white/8 bg-[var(--color-surface)] p-6 hover:bg-[var(--color-surface-2)] transition overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-[var(--color-brand)]/0 group-hover:bg-[var(--color-brand)]/12 blur-2xl rounded-full transition-all duration-500" />
              <div className="relative">
                <div className="w-9 h-9 rounded-lg bg-[var(--color-brand)]/15 border border-[var(--color-brand)]/30 inline-flex items-center justify-center mb-4 text-xs font-black text-[var(--color-brand)]">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h4 className="font-black text-white mb-2 tracking-tight">
                  {f.title}
                </h4>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {f.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
