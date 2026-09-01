import { useState, useMemo } from 'react';
import { Section, SectionHeader } from './Section';
import { Search } from 'lucide-react';
import { products } from '@/data/products';
import type { Product } from '@/data/types';
import ProductCard from './ProductCard';
import ProductDetail from './ProductDetail';

export default function ProductCatalogue() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selected, setSelected] = useState<Product | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return ['All', ...cats];
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = search.trim() === '' || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <Section id="catalogue">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          label="PRODUCT CATALOGUE"
          title="Demo Product Catalogue"
          description="A local predefined catalogue of fictional demo products with simulated prices and price history."
        />

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mtext" aria-hidden="true" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products by name or category"
              className="w-full border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-ptext placeholder:text-mtext focus:border-primary/50 focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-px border border-border bg-border overflow-x-auto hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-primary/15 text-primary'
                  : 'bg-bg text-mtext-2 hover:text-ptext'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p, i) => (
            <div key={p.id} className="reveal bg-bg" style={{ animationDelay: `${Math.min(i * 0.05, 0.4)}s` }}>
              <ProductCard product={p} onClick={setSelected} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-mtext-2">No products found matching your search.</div>
        )}

        {selected && <ProductDetail product={selected} onClose={() => setSelected(null)} />}
      </div>
    </Section>
  );
}
