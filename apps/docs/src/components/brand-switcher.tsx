'use client';

import { useEffect, useId, useState } from 'react';
import { brandStorageKey, brands, defaultBrand } from './brand-provider';

export function BrandSwitcher() {
  const [brand, setBrand] = useState(defaultBrand);
  const groupName = useId();

  useEffect(() => {
    const stored = localStorage.getItem(brandStorageKey);
    if (stored && brands.some((item) => item.id === stored)) setBrand(stored);
  }, []);

  function select(id: string) {
    setBrand(id);
    document.documentElement.dataset.brand = id;
    localStorage.setItem(brandStorageKey, id);
  }

  return (
    <fieldset className="flex items-center gap-1 rounded-full border border-fd-border p-0.5">
      <legend className="sr-only">Marca</legend>
      {brands.map((item) => (
        <label
          key={item.id}
          className="flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-fd-muted-foreground transition-colors hover:text-fd-foreground has-checked:bg-fd-accent has-checked:text-fd-accent-foreground has-focus-visible:ring-2 has-focus-visible:ring-fd-ring"
        >
          <input
            type="radio"
            name={groupName}
            value={item.id}
            checked={brand === item.id}
            onChange={() => select(item.id)}
            className="sr-only"
          />
          {/* data-brand no próprio swatch resolve --brand-primary da marca que ele
              representa, e não da marca ativa no <html>. */}
          <span aria-hidden data-brand={item.id} className="size-2 rounded-full bg-brand-primary" />
          {item.label}
        </label>
      ))}
    </fieldset>
  );
}
