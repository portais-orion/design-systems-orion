import { Check } from "lucide-react";
import type * as React from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, cn } from "@portais-orion/ui";

/*
 * Extraído de configurador/permissions/permission-impact.tsx (PermissionImpact):
 * modal com grid de categorias (cada uma com ícone + título + contagem +
 * lista de itens) mais um box de "última alteração" destacado. Generalizado
 * sem semântica de permissão — "assunto" e "categorias" são genéricos, então
 * serve para qualquer "onde isso é usado" (campo, regra, chave, etc.).
 */
export type ImpactCategory = {
	id: string;
	title: string;
	icon?: React.ComponentType<{ className?: string }>;
	items: string[];
	emptyMessage?: string;
};

export type ImpactLastChangeRow = {
	label: string;
	value: React.ReactNode;
};

export type ImpactAnalysisDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title?: string;
	description?: string;
	/** Identificador do assunto analisado (ex.: um Badge com a chave). */
	subject?: React.ReactNode;
	subjectDescription?: string;
	lastChange?: ImpactLastChangeRow[];
	categories: ImpactCategory[];
	isLoading?: boolean;
	loadingMessage?: string;
	error?: React.ReactNode;
	className?: string;
};

const gridColsByCount: Record<number, string> = {
	1: "sm:grid-cols-1",
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-2 lg:grid-cols-3",
	4: "sm:grid-cols-2",
};

/**
 * Modal de análise de impacto: "onde isso é usado", em grid de categorias
 * (ícone + título + contagem + lista), com um box opcional de última
 * alteração (por/data/ação) destacado no cabeçalho. Dados via props.
 */
export function ImpactAnalysisDialog({
	open,
	onOpenChange,
	title = "Análise de Impacto",
	description = "Visão geral de como este item está sendo utilizado no sistema.",
	subject,
	subjectDescription,
	lastChange,
	categories,
	isLoading = false,
	loadingMessage = "Carregando análise...",
	error,
	className,
}: ImpactAnalysisDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className={cn("max-h-[85vh] max-w-2xl overflow-y-auto", className)}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				{isLoading ? (
					<div className="py-12 text-center text-sm text-muted-foreground">{loadingMessage}</div>
				) : error ? (
					<div className="py-12 text-center text-sm text-destructive">{error}</div>
				) : (
					<div className="mt-2 space-y-6">
						{(subject || lastChange) && (
							<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
								{subject && (
									<div className="space-y-2">
										<h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
											Assunto
										</h3>
										<div>{subject}</div>
										{subjectDescription && (
											<p className="text-sm text-foreground">{subjectDescription}</p>
										)}
									</div>
								)}
								{lastChange && lastChange.length > 0 && (
									<div className="space-y-1 rounded-lg border border-border bg-muted/30 p-3 text-right">
										<p className="mb-2 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">
											Última Alteração
										</p>
										{lastChange.map((row) => (
											<div
												key={row.label}
												className="flex justify-between gap-4 text-sm text-foreground"
											>
												<span className="text-muted-foreground">{row.label}:</span>
												<span className="font-medium">{row.value}</span>
											</div>
										))}
									</div>
								)}
							</div>
						)}

						<div className={cn("grid grid-cols-1 gap-6", gridColsByCount[categories.length] ?? "sm:grid-cols-2")}>
							{categories.map((category) => {
								const Icon = category.icon;
								return (
									<div key={category.id} className="space-y-3">
										<h3 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
											{Icon && <Icon className="size-4" />}
											{category.title} ({category.items.length})
										</h3>
										<div className="space-y-2">
											{category.items.length > 0 ? (
												category.items.map((item) => (
													<div key={item} className="flex items-center gap-2 text-sm">
														<Check className="size-3.5 text-emerald-600" />
														<span>{item}</span>
													</div>
												))
											) : (
												<span className="text-sm text-muted-foreground">
													{category.emptyMessage ?? "Nenhum item"}
												</span>
											)}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
