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
} from "@portais-orion/ui";

import { EmptyState } from "../empty-state";
import { ErrorState } from "../error-state";
import { Pagination } from "../pagination";
import { TableSkeletonRows } from "../table-skeleton-rows";
import type { DataTableColumn, DataTableProps } from "./data-table.types";

/*
 * DataTable — bloco oficial de listagem do grupo ("melhor dos dois"):
 * API e requisitos: Portal-Aurora (ui/DataTable — Column<T>, keyExtractor,
 *   estados embutidos, paginação, onRowClick, alinhamento, 32 telas reais).
 * Markup/stack: Núcleo (ui/Table do Supertrans, tokens, TW4) + blocks
 *   TableSkeletonRows/EmptyState/ErrorState/Pagination.
 * Motor interno: TanStack Table (getCoreRowModel; sorting controlado/manual).
 * O consumidor comum usa apenas DataTableColumn<T> — nada do TanStack vaza.
 */

const ACTIONS_COL_ID = "__actions";

const alignClass = {
	left: "text-left",
	center: "text-center",
	right: "text-right",
} as const;

function columnId<TData>(col: DataTableColumn<TData>, index: number): string {
	return col.id ?? (col.accessorKey != null ? String(col.accessorKey) : `col-${index}`);
}

export function DataTable<TData>({
	data,
	columns,
	keyExtractor,
	isLoading = false,
	isError = false,
	errorTitle,
	errorDescription,
	errorAction,
	emptyTitle = "Nenhum registro encontrado",
	emptyDescription,
	emptyAction,
	loadingRows = 6,
	pagination,
	sorting,
	toolbar,
	footer,
	actions,
	onRowClick,
	rowClassName,
	getRowDisabled,
	className,
}: DataTableProps<TData>) {
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

	const totalColumns = columns.length + (actions ? 1 : 0);

	const handleSortClick = (id: string) => {
		if (!sorting?.onSortChange) return;
		const nextOrder = sorting.sortBy === id && sorting.sortOrder === "asc" ? "desc" : "asc";
		sorting.onSortChange(id, nextOrder);
	};

	const renderBody = () => {
		if (isLoading) {
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

	const showTable = !isError && (isLoading || data.length > 0);

	return (
		<div className={cn("space-y-4", className)}>
			<div className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm">
				{toolbar && <div className="border-b border-border p-4">{toolbar}</div>}

				{isError && (
					<ErrorState title={errorTitle} description={errorDescription} action={errorAction} />
				)}

				{!isError && !isLoading && data.length === 0 && (
					<EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />
				)}

				{showTable && (
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
				)}

				{footer && !isError && <div className="border-t border-border">{footer}</div>}
			</div>

			{pagination && !isError && <Pagination {...pagination} />}
		</div>
	);
}
