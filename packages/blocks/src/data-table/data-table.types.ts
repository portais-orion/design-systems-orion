import type * as React from "react";

/** Coluna do DataTable. API inspirada no Column<T> do Portal-Aurora. */
export type DataTableColumn<TData> = {
	/** Identificador �nico; default: String(accessorKey) ou �ndice. Obrigat�rio se a coluna for sortable sem accessorKey. */
	id?: string;
	header: React.ReactNode;
	/** Caminho simples para o valor da c�lula. */
	accessorKey?: keyof TData;
	/** Valor derivado; tem preced�ncia sobre accessorKey. */
	accessorFn?: (row: TData) => React.ReactNode;
	/** Render custom da c�lula; tem preced�ncia sobre accessorKey/accessorFn. */
	cell?: (row: TData, index: number) => React.ReactNode;
	className?: string;
	headerClassName?: string;
	align?: "left" | "center" | "right";
	width?: string | number;
	/** Habilita clique de ordena��o no header (requer prop sorting no DataTable). */
	sortable?: boolean;
};

/** Compat�vel com o envelope { data, total, page, limit } da API padr�o do grupo. */
export type DataTablePagination = {
	page: number;
	limit: number;
	total: number;
	limitOptions?: number[];
	onPageChange: (page: number) => void;
	onLimitChange?: (limit: number) => void;
};

/** Sorting controlado (server-side first). O DataTable N�O ordena dados internamente. */
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
	/** Slot de a��o no ErrorState (ex.: bot�o tentar novamente). */
	errorAction?: React.ReactNode;
	emptyTitle?: string;
	emptyDescription?: string;
	/** Slot de a��o no EmptyState (ex.: bot�o novo registro). */
	emptyAction?: React.ReactNode;
	loadingRows?: number;
	pagination?: DataTablePagination;
	sorting?: DataTableSorting;
	/** �rea de composi��o acima da tabela (SearchBar, FilterPills...). N�o acoplada. */
	toolbar?: React.ReactNode;
	/** �rea abaixo do corpo da tabela (sum�rios, totais). */
	footer?: React.ReactNode;
	/** Coluna final de a��es por linha. Cliques aqui n�o disparam onRowClick. */
	actions?: (row: TData, index: number) => React.ReactNode;
	onRowClick?: (row: TData, index: number) => void;
	rowClassName?: string | ((row: TData, index: number) => string | undefined);
	getRowDisabled?: (row: TData, index: number) => boolean;
	className?: string;
};
