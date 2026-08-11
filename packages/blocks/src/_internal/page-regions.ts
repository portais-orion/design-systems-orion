/*
 * As decisões de esqueleto de página, em um lugar só.
 *
 * NÃO exportar pelo barrel público. Antes disso, `PageLayout`,
 * `ListPageLayout`, `FormPageLayout`, `DetailPageLayout` e
 * `DashboardPageLayout` repetiam as mesmas strings de padding, espaçamento e
 * grid de aside — a mesma ideia escrita quatro vezes, divergindo aos poucos.
 * Aqui elas viram dados; os layouts especializados escolhem uma `PageVariant`.
 *
 * Puro de propósito: sem JSX e sem React, então roda no runner de node.
 */

export const PAGE_VARIANTS = ["plain", "list", "form", "detail", "dashboard"] as const;

export type PageVariant = (typeof PAGE_VARIANTS)[number];

export type PageMaxWidth = "none" | "screen-xl" | "screen-2xl";

/** Padding e pilha vertical da página inteira. */
export const PAGE_SHELL_CLASS = "space-y-6 p-6";

export const PAGE_MAX_WIDTH_CLASS: Record<PageMaxWidth, string> = {
	none: "",
	"screen-xl": "mx-auto w-full max-w-screen-xl",
	"screen-2xl": "mx-auto w-full max-w-screen-2xl",
};

/** Grid conteúdo + coluna lateral de 20rem, usado quando há `aside`. */
export const ASIDE_GRID_CLASS = "grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]";

export const ASIDE_COLUMN_CLASS = "space-y-4";

/** Faixas separadoras dentro de um card (filtros no topo, rodapé embaixo). */
export const BAND_TOP_CLASS = "border-t border-border";
export const BAND_BOTTOM_CLASS = "border-b border-border";

/**
 * Classe da coluna de conteúdo. `min-w-0` só entra quando existe `aside` —
 * sem ele a coluna não é item de grid e o zero-width vira ruído. O formulário
 * é o único que centraliza e limita a largura quando está sozinho.
 */
export function pageContentClass(variant: PageVariant, hasAside: boolean): string {
	if (variant === "form") {
		return hasAside ? "min-w-0" : "mx-auto w-full max-w-3xl";
	}
	return hasAside ? "min-w-0 space-y-6" : "space-y-6";
}
