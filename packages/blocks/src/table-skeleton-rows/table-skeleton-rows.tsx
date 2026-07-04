import { Skeleton, TableCell, TableRow } from "@grupo/ui";

/*
 * Origem: portal-supertrans gestao-cadastros/shared.tsx (TableSkeletonRows).
 * Refeito sobre TableRow/TableCell/Skeleton do @grupo/ui (o original usava
 * tr/td cru com bg-slate-100 hardcoded).
 */
export type TableSkeletonRowsProps = {
	rows?: number;
	columns: number;
	withActionsColumn?: boolean;
	className?: string;
};

export function TableSkeletonRows({
	rows = 6,
	columns,
	withActionsColumn = false,
	className,
}: TableSkeletonRowsProps) {
	const total = columns + (withActionsColumn ? 1 : 0);
	return (
		<>
			{Array.from({ length: rows }).map((_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: linhas de skeleton são estáticas
				<TableRow key={i} className={className}>
					{Array.from({ length: total }).map((_, j) => {
						const isActions = withActionsColumn && j === total - 1;
						return (
							// biome-ignore lint/suspicious/noArrayIndexKey: células de skeleton são estáticas
							<TableCell key={j} className={isActions ? "w-20" : undefined}>
								<Skeleton
									className="h-4"
									style={{ width: isActions ? "2.5rem" : `${50 + ((i * total + j) % 5) * 10}%` }}
								/>
							</TableCell>
						);
					})}
				</TableRow>
			))}
		</>
	);
}
