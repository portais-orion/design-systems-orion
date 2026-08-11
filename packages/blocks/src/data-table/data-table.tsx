"use client";

import {
	type ColumnDef,
	type SortingState,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	cn,
} from "@design-systems-orion/ui";

import { BAND_BOTTOM_CLASS, BAND_TOP_CLASS } from "../_internal/page-regions";
import { SurfaceCard } from "../_internal/surface-card";
import { EmptyState } from "../empty-state";
import { ErrorState } from "../error-state";
import { Pagination as PaginationBlock } from "../pagination";
import { TableSkeletonRows } from "../table-skeleton-rows";
import {
	type DataTableView,
	columnId,
	nextSortOrder,
	resolveDataTableView,
} from "./data-table.logic";
import type {
	DataTableColumn,
	DataTableContentProps,
	DataTableEmptyProps,
	DataTableErrorProps,
	DataTableFooterProps,
	DataTablePaginationProps,
	DataTableRootProps,
	DataTableSorting,
	DataTableToolbarProps,
} from "./data-table.types";

const ACTIONS_COL_ID = "__actions";

const alignClass = {
	left: "text-left",
	center: "text-center",
	right: "text-right",
} as const;

type DataTableContextValue<TData> = {
	table: ReturnType<typeof useReactTable<TData>>;
	/** Estado único da tabela, decidido pelo Root — ver data-table.logic.ts. */
	view: DataTableView;
	data: TData[];
	columns: DataTableColumn<TData>[];
	actions?: (row: TData, index: number) => React.ReactNode;
	sorting?: DataTableSorting;
	handleSortClick: (id: string) => void;
};

/*
 * O contexto é guardado sobre `unknown` e reaberto com o `TData` de quem lê:
 * o React não carrega o parâmetro de tipo do Provider até o Consumer, então a
 * conversão acontece aqui, uma vez, em vez de `any` espalhado.
 */
const DataTableContext = React.createContext<DataTableContextValue<unknown> | null>(null);

function useDataTableContext<TData>(): DataTableContextValue<TData> {
	const ctx = React.useContext(DataTableContext);
	if (!ctx) {
		throw new Error("DataTable compound components must be used within a DataTable.Root");
	}
	return ctx as DataTableContextValue<TData>;
}

function DataTableRoot<TData>({
	data,
	columns,
	keyExtractor,
	isLoading = false,
	isError = false,
	sorting,
	actions,
	children,
	className,
}: DataTableRootProps<TData>) {
	const columnDefs = React.useMemo<ColumnDef<TData>[]>(() => {
		const defs: ColumnDef<TData>[] = columns.map((col, index) => {
			const accessor =
				col.accessorFn ??
				(col.accessorKey != null
					? (row: TData) => row[col.accessorKey as keyof TData] as React.ReactNode
					: () => undefined);
			return {
				id: columnId(col, index),
				accessorFn: (row: TData) => accessor(row),
				header: () => col.header,
				cell: (ctx) =>
					col.cell
						? col.cell(ctx.row.original, ctx.row.index)
						: ((ctx.getValue() as React.ReactNode) ?? "—"),
				enableSorting: col.sortable === true,
				meta: col,
			};
		});
		if (actions) {
			defs.push({
				id: ACTIONS_COL_ID,
				header: () => <span className="sr-only">Ações</span>,
				cell: (ctx) => actions(ctx.row.original, ctx.row.index),
				enableSorting: false,
				meta: { align: "right" } as DataTableColumn<TData>,
			});
		}
		return defs;
	}, [columns, actions]);

	const sortingState = React.useMemo<SortingState>(
		() => (sorting?.sortBy ? [{ id: sorting.sortBy, desc: sorting.sortOrder === "desc" }] : []),
		[sorting?.sortBy, sorting?.sortOrder],
	);

	const table = useReactTable({
		data,
		columns: columnDefs,
		getCoreRowModel: getCoreRowModel(),
		getRowId: (row, index) => keyExtractor(row, index),
		manualSorting: true,
		enableSortingRemoval: false,
		state: { sorting: sortingState },
	});

	const handleSortClick = React.useCallback(
		(id: string) => {
			if (!sorting?.onSortChange) return;
			sorting.onSortChange(id, nextSortOrder(sorting, id));
		},
		[sorting],
	);

	const view = resolveDataTableView({ isLoading, isError, rowCount: data.length });

	const contextValue = React.useMemo(
		() => ({
			table,
			view,
			data,
			columns,
			actions,
			sorting,
			handleSortClick,
		}),
		[table, view, data, columns, actions, sorting, handleSortClick],
	);

	return (
		<DataTableContext.Provider value={contextValue as DataTableContextValue<unknown>}>
			<div className={cn("space-y-4", className)}>{children}</div>
		</DataTableContext.Provider>
	);
}

function DataTableToolbar({ children }: DataTableToolbarProps) {
	return <div className={cn(BAND_BOTTOM_CLASS, "p-4")}>{children}</div>;
}

function DataTableFooter({ children }: DataTableFooterProps) {
	const { view } = useDataTableContext();
	if (view === "error") return null;
	return <div className={BAND_TOP_CLASS}>{children}</div>;
}

function DataTableError({ title, description, action }: DataTableErrorProps) {
	const { view } = useDataTableContext();
	if (view !== "error") return null;
	return <ErrorState title={title} description={description} action={action} />;
}

function DataTableEmpty({
	title = "Nenhum registro encontrado",
	description,
	action,
}: DataTableEmptyProps) {
	const { view } = useDataTableContext();
	if (view !== "empty") return null;
	return <EmptyState title={title} description={description} action={action} />;
}

function DataTablePagination(props: DataTablePaginationProps) {
	const { view } = useDataTableContext();
	if (view === "error") return null;
	return <PaginationBlock {...props} />;
}

function DataTableContent<TData>({
	loadingRows = 6,
	onRowClick,
	rowClassName,
	getRowDisabled,
}: DataTableContentProps<TData>) {
	const { table, view, columns, actions, sorting, handleSortClick } =
		useDataTableContext<TData>();

	if (view !== "loading" && view !== "rows") return null;

	const renderBody = () => {
		if (view === "loading") {
			return (
				<TableSkeletonRows
					rows={loadingRows}
					columns={columns.length}
					withActionsColumn={!!actions}
				/>
			);
		}
		return table.getRowModel().rows.map((row) => {
			const disabled = getRowDisabled?.(row.original, row.index) ?? false;
			const extraClass =
				typeof rowClassName === "function" ? rowClassName(row.original, row.index) : rowClassName;
			const clickable = !!onRowClick && !disabled;
			return (
				<TableRow
					key={row.id}
					aria-disabled={disabled || undefined}
					onClick={clickable ? () => onRowClick(row.original, row.index) : undefined}
					className={cn(
						clickable && "cursor-pointer",
						disabled && "pointer-events-none opacity-50",
						extraClass,
					)}
				>
					{row.getVisibleCells().map((cell) => {
						const meta = (cell.column.columnDef.meta ?? {}) as DataTableColumn<TData>;
						const isActions = cell.column.id === ACTIONS_COL_ID;
						return (
							<TableCell
								key={cell.id}
								className={cn(
									meta.align && alignClass[meta.align],
									isActions && "w-0 whitespace-nowrap",
									meta.className,
								)}
								onClick={isActions ? (e) => e.stopPropagation() : undefined}
							>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</TableCell>
						);
					})}
				</TableRow>
			);
		});
	};

	return (
		<div className="overflow-x-auto">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								const meta = (header.column.columnDef.meta ?? {}) as DataTableColumn<TData>;
								const sortable = header.column.getCanSort() && !!sorting?.onSortChange;
								const isSorted = sorting?.sortBy === header.column.id;
								const width = meta.width;
								return (
									<TableHead
										key={header.id}
										style={width != null ? { width } : undefined}
										className={cn(
											"whitespace-nowrap text-xs",
											meta.align && alignClass[meta.align],
											meta.headerClassName,
										)}
										aria-sort={
											isSorted
												? sorting?.sortOrder === "asc"
													? "ascending"
													: "descending"
												: undefined
										}
									>
										{sortable ? (
											<button
												type="button"
												onClick={() => handleSortClick(header.column.id)}
												className={cn(
													"inline-flex items-center gap-1 rounded outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
													isSorted && "text-foreground",
												)}
											>
												{flexRender(header.column.columnDef.header, header.getContext())}
												{isSorted ? (
													sorting?.sortOrder === "asc" ? (
														<ChevronUp className="size-3.5" />
													) : (
														<ChevronDown className="size-3.5" />
													)
												) : (
													<ChevronsUpDown className="size-3.5 opacity-50" />
												)}
											</button>
										) : (
											flexRender(header.column.columnDef.header, header.getContext())
										)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>{renderBody()}</TableBody>
			</Table>
		</div>
	);
}

function DataTableCard({ children, className }: { children: React.ReactNode; className?: string }) {
	return <SurfaceCard className={className}>{children}</SurfaceCard>;
}

/**
 * Tabela de listagem do grupo, com carregamento, vazio, erro, paginação e ordenação.
 * Refatorado para o padrão Compound Components.
 */
export const DataTable = Object.assign(DataTableRoot, {
	Root: DataTableRoot,
	Card: DataTableCard,
	Toolbar: DataTableToolbar,
	Content: DataTableContent,
	Empty: DataTableEmpty,
	Error: DataTableError,
	Pagination: DataTablePagination,
	Footer: DataTableFooter,
});
