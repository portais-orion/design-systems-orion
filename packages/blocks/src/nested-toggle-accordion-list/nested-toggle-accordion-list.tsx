"use client";

import { ChevronDown, ChevronRight, Loader2, Lock } from "lucide-react";
import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

import { type Tone, toneClass } from "../_internal/tone";

/*
 * Extraído de configurador/access/access-module-tree.tsx (AccessModuleTree):
 * lista de grupos (módulos), cada um com switch de nível superior + contador
 * "X de Y ativas" + botão expandir; ao expandir, checklist aninhado com
 * badges de origem (herdado de Perfil/Grupo) e ações "Marcar/Desmarcar
 * todas" em lote, por seção e no grupo inteiro. Generalizado sem semântica de
 * permissões — "seções" e "itens" são genéricos.
 */
export type OriginBadge = {
	label: string;
	tone?: "default" | "info" | "warning";
};

export type NestedToggleItem = {
	id: string;
	label: React.ReactNode;
	checked: boolean;
	disabled?: boolean;
	locked?: boolean;
	originBadges?: OriginBadge[];
	onToggle: () => void;
};

export type NestedToggleSection = {
	id: string;
	title: string;
	icon?: React.ComponentType<{ className?: string }>;
	items: NestedToggleItem[];
	onSelectAll?: (enable: boolean) => void;
	isBulkPending?: boolean;
};

export type NestedToggleGroup = {
	id: string;
	title: string;
	icon?: React.ReactNode;
	enabled: boolean;
	onToggleEnabled: () => void;
	isTogglePending?: boolean;
	activeCount: number;
	totalCount: number;
	sections: NestedToggleSection[];
	onSelectAll?: (enable: boolean) => void;
	isBulkPending?: boolean;
	disabledMessage?: string;
};

export type NestedToggleAccordionListProps = {
	groups: NestedToggleGroup[];
	expandedIds: Set<string>;
	onToggleExpand: (id: string) => void;
	emptyMessage?: string;
	className?: string;
};

/* Os tons públicos deste bloco traduzidos para os tons semânticos do núcleo. */
const semanticTone: Record<NonNullable<OriginBadge["tone"]>, Tone> = {
	default: "neutral",
	info: "brand",
	warning: "warning",
};

function Switch({
	checked,
	onChange,
	pending,
}: {
	checked: boolean;
	onChange: () => void;
	pending?: boolean;
}) {
	return (
		<button
			type="button"
			role="switch"
			aria-checked={checked}
			disabled={pending}
			onClick={onChange}
			className={cn(
				"relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none",
				"disabled:cursor-not-allowed disabled:opacity-80",
				checked ? "bg-primary" : "bg-muted-foreground/30",
			)}
		>
			<span
				className={cn(
					"inline-block size-4 rounded-full bg-background shadow-sm transition-transform",
					checked ? "translate-x-6" : "translate-x-1",
				)}
			/>
		</button>
	);
}

function OriginBadges({ badges }: { badges?: OriginBadge[] }) {
	if (!badges || badges.length === 0) return null;
	return (
		<span className="ml-2 flex flex-wrap gap-1">
			{badges.map((badge, index) => (
				<span
					key={`${badge.label}-${index}`}
					className={cn(
						"rounded-full px-2 py-0.5 text-[10px] font-medium",
						toneClass(semanticTone[badge.tone ?? "default"], "surface"),
					)}
				>
					{badge.label}
				</span>
			))}
		</span>
	);
}

function SectionBlock({ section }: { section: NestedToggleSection }) {
	const allEnabled = section.items.length > 0 && section.items.every((item) => item.checked);

	return (
		<div className="rounded-xl border border-border bg-card p-4">
			<div className="mb-1 flex items-center gap-2">
				{section.icon && <section.icon className="size-4 text-primary" />}
				<h4 className="text-sm font-semibold text-foreground">{section.title}</h4>
				{section.onSelectAll && section.items.length > 0 && (
					<button
						type="button"
						disabled={section.isBulkPending}
						onClick={() => section.onSelectAll?.(!allEnabled)}
						className="ml-auto text-xs font-medium text-primary hover:underline disabled:cursor-not-allowed disabled:opacity-40"
					>
						{section.isBulkPending && <Loader2 className="mr-1 inline size-3 animate-spin" />}
						{allEnabled ? "Desmarcar todas" : "Marcar todas"}
					</button>
				)}
			</div>
			<div className="space-y-2">
				{section.items.map((item) => (
					<label
						key={item.id}
						className={cn(
							"flex items-center gap-3 rounded-lg px-2 py-1.5",
							item.disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-muted/30",
						)}
					>
						<input
							type="checkbox"
							checked={item.checked}
							disabled={item.disabled}
							onChange={item.onToggle}
							className="size-4 rounded border-border accent-primary disabled:opacity-50"
						/>
						<span className="text-sm font-medium text-foreground">{item.label}</span>
						<OriginBadges badges={item.originBadges} />
						{item.locked && (
							<Lock className={cn("ml-auto size-3.5 shrink-0", toneClass("warning", "text"))} />
						)}
					</label>
				))}
			</div>
		</div>
	);
}

/**
 * Lista de grupos com switch de nível superior + expand/collapse; ao
 * expandir, seções com checklist aninhado, badges de origem (herança) e
 * ações de marcar/desmarcar em lote por seção ou por grupo inteiro.
 */
export function NestedToggleAccordionList({
	groups,
	expandedIds,
	onToggleExpand,
	emptyMessage = "Nenhum item encontrado.",
	className,
}: NestedToggleAccordionListProps) {
	if (groups.length === 0) {
		return <p className="py-8 text-center text-sm text-muted-foreground">{emptyMessage}</p>;
	}

	return (
		<div
			className={cn("overflow-hidden rounded-xl border border-border bg-card shadow-sm", className)}
		>
			<div className="divide-y divide-border">
				{groups.map((group) => {
					const expanded = expandedIds.has(group.id);
					return (
						<div
							key={group.id}
							className={cn("transition", group.enabled ? "bg-card" : "bg-muted/20")}
						>
							<div className="flex items-center gap-3 p-3 transition hover:bg-muted/20">
								<Switch
									checked={group.enabled}
									pending={group.isTogglePending}
									onChange={group.onToggleEnabled}
								/>
								{group.icon}
								<div className="min-w-0 flex-1">
									<h3
										className={cn(
											"text-sm font-bold",
											group.enabled ? "text-foreground" : "text-muted-foreground",
										)}
									>
										{group.title}
									</h3>
									<p className="mt-0.5 text-[10px] text-muted-foreground">
										{group.enabled ? (
											<>
												<span className="font-semibold text-primary">{group.activeCount}</span>
												{" de "}
												<span className="font-semibold">{group.totalCount}</span> ativas
											</>
										) : (
											(group.disabledMessage ?? "Desabilitado")
										)}
									</p>
								</div>
								{group.enabled && group.totalCount > 0 && group.onSelectAll && (
									<button
										type="button"
										disabled={group.isBulkPending}
										onClick={() => group.onSelectAll?.(group.activeCount < group.totalCount)}
										className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
									>
										{group.isBulkPending && <Loader2 className="size-3.5 animate-spin" />}
										{group.activeCount < group.totalCount ? "Marcar todas" : "Desmarcar todas"}
									</button>
								)}
								{group.enabled && group.totalCount > 0 && (
									<button
										type="button"
										onClick={() => onToggleExpand(group.id)}
										className="rounded-lg p-2 hover:bg-muted"
									>
										{expanded ? (
											<ChevronDown className="size-5 text-muted-foreground" />
										) : (
											<ChevronRight className="size-5 text-muted-foreground" />
										)}
									</button>
								)}
							</div>

							{group.enabled && expanded && group.sections.length > 0 && (
								<div className="space-y-4 border-t border-border bg-muted/20 px-4 py-4 pl-16">
									{group.sections.map((section) => (
										<SectionBlock key={section.id} section={section} />
									))}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
