import { Card, CardContent, CardDescription, CardHeader, CardTitle, cn } from "@portais-orion/ui";

/*
 * Extraído de governanca/comparar: comparação lado a lado entre duas (ou
 * mais) entidades, organizada em grupos (ex.: "Permissões", "Módulos"), cada
 * um com colunas coloridas por tom (comum, só A, só B).
 */
export type DiffColumnTone = "default" | "success" | "warning" | "danger" | "info" | "muted";

export type DiffColumn = {
	label: string;
	tone?: DiffColumnTone;
	items: string[];
	emptyMessage?: string;
};

export type ComparisonDiffGroup = {
	title: string;
	description?: string;
	columns: DiffColumn[];
};

export type ComparisonDiffViewProps = {
	groups: ComparisonDiffGroup[];
	className?: string;
};

const boxByTone: Record<DiffColumnTone, string> = {
	default: "border-border bg-muted/30",
	success: "border-emerald-100 bg-emerald-50/50",
	warning: "border-amber-100 bg-amber-50/50",
	danger: "border-rose-100 bg-rose-50/50",
	info: "border-sky-100 bg-sky-50/50",
	muted: "border-border bg-muted/20",
};

const textByTone: Record<DiffColumnTone, string> = {
	default: "text-foreground",
	success: "text-emerald-900",
	warning: "text-amber-900",
	danger: "text-rose-900",
	info: "text-sky-900",
	muted: "text-muted-foreground",
};

const gridByCount: Record<number, string> = {
	2: "md:grid-cols-2",
	3: "md:grid-cols-3",
	4: "md:grid-cols-4",
};

/**
 * Comparação lado a lado entre duas ou mais entidades, organizada em grupos
 * (ex.: "Permissões", "Módulos"), cada um com colunas coloridas por tom.
 * Dados via props — não busca nem calcula o diff.
 */
export function ComparisonDiffView({ groups, className }: ComparisonDiffViewProps) {
	return (
		<div className={cn("space-y-6", className)}>
			{groups.map((group) => (
				<Card key={group.title}>
					<CardHeader>
						<CardTitle className="text-lg">{group.title}</CardTitle>
						{group.description && <CardDescription>{group.description}</CardDescription>}
					</CardHeader>
					<CardContent>
						<div className={cn("grid gap-4", gridByCount[group.columns.length] ?? "md:grid-cols-2")}>
							{group.columns.map((column) => (
								<div
									key={column.label}
									className={cn("rounded-lg border p-4", boxByTone[column.tone ?? "default"])}
								>
									<h4 className={cn("mb-3 font-medium", textByTone[column.tone ?? "default"])}>
										{column.label}
									</h4>
									{column.items.length > 0 ? (
										<ul
											className={cn(
												"list-inside list-disc space-y-1 text-sm",
												textByTone[column.tone ?? "default"],
											)}
										>
											{column.items.map((item) => (
												<li key={item} className="font-mono text-xs">
													{item}
												</li>
											))}
										</ul>
									) : (
										<p className={cn("text-sm opacity-70", textByTone[column.tone ?? "default"])}>
											{column.emptyMessage ?? "Nenhum item."}
										</p>
									)}
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
