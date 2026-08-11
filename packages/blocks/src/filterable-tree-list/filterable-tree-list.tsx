"use client";

import { ChevronDown, ChevronRight, Info } from "lucide-react";
import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

/*
 * Extraído de components/cronograma/cronograma-tree.tsx (CronogramaTree):
 * árvore hierárquica com indentação por nível, ícone por tipo, badge de
 * status, expand/collapse e auto-expansão forçada por busca. O original
 * conhecia domínio (épico/história/subtarefa do Jira) — aqui a árvore é
 * genérica (`TreeNode` recursivo); quem decide o que combina com a busca e
 * calcula `forceOpenIds` é o consumidor (ver `itemMatches`/`collectMatchKeys`
 * originais como referência de como montar isso).
 */
export type TreeTone = "default" | "success" | "warning" | "danger" | "info" | "muted";

export type TreeNode = {
	id: string;
	title: React.ReactNode;
	icon?: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
	iconColorClassName?: string;
	badge?: React.ReactNode;
	/** Texto auxiliar à direita (ex.: "3 itens · 5 subtasks"). */
	meta?: React.ReactNode;
	children?: TreeNode[];
};

export type FilterableTreeListProps = {
	nodes: TreeNode[];
	/** Nós abertos por interação direta do usuário. */
	openIds: Set<string>;
	onToggle: (id: string) => void;
	/** Nós forçados a abrir porque a busca combinou em algum descendente. */
	forceOpenIds?: Set<string>;
	onSelectNode?: (node: TreeNode) => void;
	emptyMessage?: string;
	className?: string;
};

function TreeRow({
	node,
	depth,
	openIds,
	forceOpenIds,
	onToggle,
	onSelectNode,
}: {
	node: TreeNode;
	depth: number;
	openIds: Set<string>;
	forceOpenIds: Set<string>;
	onToggle: (id: string) => void;
	onSelectNode?: (node: TreeNode) => void;
}) {
	const hasChildren = Boolean(node.children && node.children.length > 0);
	const isOpen = openIds.has(node.id) || forceOpenIds.has(node.id);
	const Icon = node.icon;

	return (
		<div>
			<div
				className="flex items-center gap-2 border-t border-border/60 py-2 pr-3 transition-colors first:border-t-0 hover:bg-muted/40"
				style={{ paddingLeft: 12 + depth * 20 }}
				tabIndex={hasChildren ? 0 : undefined}
				role={hasChildren ? "button" : undefined}
				onClick={() => hasChildren && onToggle(node.id)}
				onKeyDown={(event) => {
					if (hasChildren && (event.key === "Enter" || event.key === " ")) {
						event.preventDefault();
						onToggle(node.id);
					}
				}}
			>
				{hasChildren ? (
					isOpen ? (
						<ChevronDown size={16} className="shrink-0 text-muted-foreground" />
					) : (
						<ChevronRight size={16} className="shrink-0 text-muted-foreground" />
					)
				) : (
					<span className="w-4 shrink-0" />
				)}
				{Icon && (
					<Icon size={16} className={cn("shrink-0", node.iconColorClassName ?? "text-primary")} />
				)}
				<span className="min-w-0 flex-1 truncate text-sm text-foreground">{node.title}</span>
				{node.meta && (
					<span className="shrink-0 text-xs whitespace-nowrap text-muted-foreground">
						{node.meta}
					</span>
				)}
				{node.badge}
				{onSelectNode && (
					<button
						type="button"
						onClick={(event) => {
							event.stopPropagation();
							onSelectNode(node);
						}}
						className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
						title="Ver detalhes"
					>
						<Info size={14} />
					</button>
				)}
			</div>

			{hasChildren && isOpen && (
				<div>
					{node.children?.map((child) => (
						<TreeRow
							key={child.id}
							node={child}
							depth={depth + 1}
							openIds={openIds}
							forceOpenIds={forceOpenIds}
							onToggle={onToggle}
							onSelectNode={onSelectNode}
						/>
					))}
				</div>
			)}
		</div>
	);
}

/**
 * Lista hierárquica com expand/collapse por nó e auto-expansão forçada
 * (`forceOpenIds`, tipicamente calculado pelo consumidor a partir de um termo
 * de busca). Não sabe filtrar nem buscar — recebe a árvore e o estado prontos.
 */
export function FilterableTreeList({
	nodes,
	openIds,
	onToggle,
	forceOpenIds,
	onSelectNode,
	emptyMessage = "Nenhum resultado encontrado.",
	className,
}: FilterableTreeListProps) {
	if (nodes.length === 0) {
		return (
			<div
				className={cn(
					"flex items-center justify-center rounded-lg border border-border bg-card py-16 text-sm text-muted-foreground",
					className,
				)}
			>
				{emptyMessage}
			</div>
		);
	}

	const resolvedForceOpenIds = forceOpenIds ?? new Set<string>();

	return (
		<div className={cn("overflow-x-auto rounded-lg border border-border bg-card", className)}>
			<div className="min-w-[560px]">
				{nodes.map((node) => (
					<TreeRow
						key={node.id}
						node={node}
						depth={0}
						openIds={openIds}
						forceOpenIds={resolvedForceOpenIds}
						onToggle={onToggle}
						onSelectNode={onSelectNode}
					/>
				))}
			</div>
		</div>
	);
}
