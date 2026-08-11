import type { DataTableColumn, DataTableSorting } from "./data-table.types";

/*
 * As decisões do DataTable que não dependem de React nem do DOM.
 *
 * O estado da tabela é um só: ou está carregando, ou falhou, ou não tem
 * registro, ou tem linhas. Antes, cada subcomponente (Footer, Error, Empty,
 * Pagination, Content) relia `isError`/`isLoading`/`data.length` do contexto e
 * decidia sozinho se sumia — a mesma máquina de estados escrita cinco vezes.
 * Aqui ela é resolvida uma vez, e dá para testá-la sem subir um browser.
 */

export const DATA_TABLE_VIEWS = ["loading", "error", "empty", "rows"] as const;

export type DataTableView = (typeof DATA_TABLE_VIEWS)[number];

export type DataTableViewInput = {
	isLoading?: boolean;
	isError?: boolean;
	rowCount: number;
};

/**
 * Erro vence carregamento, que vence a lista vazia. Enquanto carrega, a tabela
 * aparece com linhas-esqueleto — por isso `loading` não é o mesmo que `empty`.
 */
export function resolveDataTableView({
	isLoading = false,
	isError = false,
	rowCount,
}: DataTableViewInput): DataTableView {
	if (isError) return "error";
	if (isLoading) return "loading";
	return rowCount > 0 ? "rows" : "empty";
}

/** Identificador da coluna: o explícito, senão a chave de acesso, senão a posição. */
export function columnId<TData>(column: DataTableColumn<TData>, index: number): string {
	return column.id ?? (column.accessorKey != null ? String(column.accessorKey) : `col-${index}`);
}

/**
 * Próxima direção ao clicar no header: só inverte quando já se está ordenando
 * por aquela coluna em ordem crescente; qualquer outro clique começa em `asc`.
 */
export function nextSortOrder(
	sorting: DataTableSorting | undefined,
	columnKey: string,
): "asc" | "desc" {
	return sorting?.sortBy === columnKey && sorting.sortOrder === "asc" ? "desc" : "asc";
}
