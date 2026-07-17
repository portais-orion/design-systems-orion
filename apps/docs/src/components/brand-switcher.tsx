"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { brandLogos } from "./brand-logos";
import { brandStorageKey, brands, defaultBrand } from "./brand-provider";

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
          title={item.label}
          className="flex cursor-pointer items-center rounded-full px-2 py-1 opacity-60 transition-opacity hover:opacity-100 has-checked:opacity-100 has-checked:bg-fd-accent has-focus-visible:ring-2 has-focus-visible:ring-fd-ring"
        >
          <input
            type="radio"
            name={groupName}
            value={item.id}
            checked={brand === item.id}
            onChange={() => select(item.id)}
            className="sr-only"
          />
          {/* Seleção por logo; o texto fica só para leitores de tela. */}
          <span className="sr-only">{item.label}</span>
          {brandLogos[item.id] ? (
            <Image
              src={brandLogos[item.id]}
              alt=""
              aria-hidden
              height={16}
              style={{ height: 16, width: "auto" }}
            />
          ) : (
            <span aria-hidden className="text-xs font-medium">
              {item.label}
            </span>
          )}
        </label>
      ))}
    </fieldset>
  );
}
