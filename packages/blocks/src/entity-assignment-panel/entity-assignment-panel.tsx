"use client";

import { Loader2, Plus, Search, X } from "lucide-react";
import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

/*
 * Extraído de profile-assignments-panel e user-groups-selector (configurador):
 * gerenciador de vínculo N:N (usuário↔perfil, usuário↔grupo) — busca com
 * dropdown de candidatos + lista de vinculados com remoção.
 */
export type AssignmentCandidate = {
	id: string;
	label: string;
	sublabel?: string;
};

export type EntityAssignmentPanelProps = {
	title: string;
	icon?: React.ComponentType<{ className?: string }>;
	assignedItems: AssignmentCandidate[];
	searchQuery: string;
	onSearchQueryChange: (query: string) => void;
	searchPlaceholder?: string;
	/** Candidatos já filtrados pelo consumidor (busca + exclusão dos já atribuídos). */
	candidates: AssignmentCandidate[];
	onAssign: (candidate: AssignmentCandidate) => void;
	onUnassign: (item: AssignmentCandidate) => void;
	isLoading?: boolean;
	emptyAssignedMessage?: string;
	unassignLabel?: string;
	className?: string;
};

/**
 * Painel de gerenciamento de vínculo N:N: busca com dropdown de candidatos +
 * lista de itens vinculados com remoção. Não busca dados nem filtra — recebe
 * `candidates` já prontos do consumidor (que decide debounce, API, etc.).
 */
export function EntityAssignmentPanel({
	title,
	icon: Icon,
	assignedItems,
	searchQuery,
	onSearchQueryChange,
	searchPlaceholder = "Buscar para adicionar...",
	candidates,
	onAssign,
	onUnassign,
	isLoading = false,
	emptyAssignedMessage = "Nenhum item vinculado.",
	unassignLabel = "Remover",
	className,
}: EntityAssignmentPanelProps) {
	if (isLoading) {
		return (
			<div
				className={cn(
					"flex items-center justify-center rounded-xl border border-border bg-card py-12 shadow-sm",
					className,
				)}
			>
				<Loader2 className="size-5 animate-spin text-muted-foreground" />
			</div>
		);
	}

	return (
		<div className={cn("rounded-xl border border-border bg-card p-4 shadow-sm", className)}>
			<div className="mb-3 flex items-center gap-2">
				{Icon && <Icon className="size-4 text-primary" />}
				<h4 className="text-sm font-semibold text-foreground">{title}</h4>
				<span className="text-xs text-muted-foreground">({assignedItems.length})</span>
			</div>

			<div className="relative mb-3">
				<Search className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
				<input
					value={searchQuery}
					onChange={(event) => onSearchQueryChange(event.target.value)}
					placeholder={searchPlaceholder}
					className="h-9 w-full rounded-md border border-border bg-card pr-3 pl-8 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
				/>
				{searchQuery.length > 0 && candidates.length > 0 && (
					<div className="absolute z-10 mt-1 w-full rounded-md border border-border bg-card shadow-lg">
						{candidates.map((candidate) => (
							<button
								key={candidate.id}
								type="button"
								onClick={() => onAssign(candidate)}
								className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted"
							>
								<Plus className="size-3.5 text-primary" />
								<span>{candidate.label}</span>
								{candidate.sublabel && (
									<span className="text-xs text-muted-foreground">{candidate.sublabel}</span>
								)}
							</button>
						))}
					</div>
				)}
			</div>

			<div className="space-y-1">
				{assignedItems.length === 0 ? (
					<p className="py-4 text-center text-xs text-muted-foreground">{emptyAssignedMessage}</p>
				) : (
					assignedItems.map((item) => (
						<div
							key={item.id}
							className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm"
						>
							<div className="min-w-0">
								<span className="font-medium text-foreground">{item.label}</span>
								{item.sublabel && (
									<span className="ml-2 text-xs text-muted-foreground">{item.sublabel}</span>
								)}
							</div>
							<button
								type="button"
								onClick={() => onUnassign(item)}
								className="text-muted-foreground hover:text-destructive"
								title={unassignLabel}
							>
								<X className="size-4" />
							</button>
						</div>
					))
				)}
			</div>
		</div>
	);
}
