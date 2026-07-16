import brandCatalog from '@portais-orion/tokens/brands.json';

export type Brand = (typeof brandCatalog.brands)[number];

export const brands: Brand[] = brandCatalog.brands;
export const defaultBrand: string = brandCatalog.defaultBrand;

export const brandStorageKey = 'portais-orion-brand';

/*
 * Aplica a marca persistida antes da primeira pintura. Sem isto o HTML chega
 * com defaultBrand e a troca no efeito do switcher pisca a cor da marca errada.
 */
export function BrandScript() {
  const script = `(function(){try{var b=localStorage.getItem(${JSON.stringify(
    brandStorageKey,
  )});var ids=${JSON.stringify(
    brands.map((brand) => brand.id),
  )};if(b&&ids.indexOf(b)>-1)document.documentElement.dataset.brand=b;}catch(e){}})()`;

  // biome-ignore lint/security/noDangerouslySetInnerHtml: script inline precisa rodar antes da hidratação
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
