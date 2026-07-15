import type * as React from "react";

/** Coluna do DataTable. API inspirada no Column<T> do Portal-Aurora. */
export type DataTableColumn<TData> = {
	/** Identificador único; default: String(accessorKey) ou índice. Obrigatório se a coluna for sortable sem accessorKey. */
	id?: string;
	header: React.ReactNode;
	/** Caminho simples para o valor da célula. */
	accessorKey?: keyof TData;
	/** Valor derivado; tem precedência sobre accessorKey. */
	accessorFn?: (row: TData) => React.ReactNode;
	/** Render custom da célula; tem precedência sobre accessorKey/accessorFn. */
	cell?: (row: TData, index: number) => React.ReactNode;
	className?: string;
	headerClassName?: string;
	align?: "left" | "center" | "right";
	width?: string | number;
	/** Habilita clique de ordenação no header (requer prop sorting no DataTable). */
	sortable?: boolean;
};

/** Compatível com o envelope { data, total, page, limit } da API padrão do grupo. */
export type DataTablePagination = {
	page: number;
	limit: number;
	total: number;
	limitOptions?: number[];
	onPageChange: (page: number) => void;
	onLimitChange?: (limit: number) => void;
};

/** Sorting controlado (server-side first). O DataTable NÃO ordena dados internamente. */
export type DataTableSorting = {
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	onSortChange?: (sortBy: string, sortOrder: "asc" | "desc") => void;
};

export type DataTableProps<TData> = {
	data: TData[];
	columns: DataTableColumn<TData>[];
	keyExtractor: (row: TData, index: number) => string;
	isLoading?: boolean;
	isError?: boolean;
	errorTitle?: string;
	errorDescription?: string;
	/** Slot de ação no ErrorState (ex.: botão tentar novamente). */
	errorAction?: React.ReactNode;
	emptyTitle?: string;
	emptyDescription?: string;
	/** Slot de ação no EmptyState (ex.: botão novo registro). */
	emptyAction?: React.ReactNode;
	loadingRows?: number;
	pagination?: DataTablePagination;
	sorting?: DataTableSorting;
	/** Área de composição acima da tabela (SearchBar, FilterPills...). Não acoplada. */
	toolbar?: React.ReactNode;
	/** Área abaixo do corpo da tabela (sumários, totais). */
	footer?: React.ReactNode;
	/** Coluna final de ações por linha. Cliques aqui não disparam onRowClick. */
	actions?: (row: TData, index: number) => React.ReactNode;
	onRowClick?: (row: TData, index: number) => void;
	rowClassName?: string | ((row: TData, index: number) => string | undefined);
	getRowDisabled?: (row: TData, index: number) => boolean;
	className?: string;
};
