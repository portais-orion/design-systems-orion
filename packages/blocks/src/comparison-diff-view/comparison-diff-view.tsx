import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	cn,
} from "@design-systems-orion/ui";

import { type Tone, toneClass } from "../_internal/tone";

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

/* Os tons públicos deste bloco traduzidos para os tons semânticos do núcleo. */
const semanticTone: Record<DiffColumnTone, Tone> = {
	default: "neutral",
	success: "success",
	warning: "warning",
	danger: "danger",
	info: "info",
	muted: "neutral",
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
						<div
							className={cn("grid gap-4", gridByCount[group.columns.length] ?? "md:grid-cols-2")}
						>
							{group.columns.map((column) => {
								const tone = semanticTone[column.tone ?? "default"];
								return (
									<div
										key={column.label}
										className={cn("rounded-lg p-4", toneClass(tone, "surface"))}
									>
										<h4 className="mb-3 font-medium">{column.label}</h4>
										{column.items.length > 0 ? (
											<ul className="list-inside list-disc space-y-1 text-sm">
												{column.items.map((item) => (
													<li key={item} className="font-mono text-xs">
														{item}
													</li>
												))}
											</ul>
										) : (
											<p className="text-sm opacity-70">{column.emptyMessage ?? "Nenhum item."}</p>
										)}
									</div>
								);
							})}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
