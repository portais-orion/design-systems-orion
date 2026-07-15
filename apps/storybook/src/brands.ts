export const BRANDS = ["supertrans", "aurora"] as const;

export type Brand = (typeof BRANDS)[number];

export const BRAND_LABELS: Record<Brand, string> = {
	supertrans: "Supertrans",
	aurora: "Aurora",
};
