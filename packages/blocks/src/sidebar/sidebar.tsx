"use client";

import { ChevronDown } from "lucide-react";
import * as React from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, cn } from "@portais-orion/ui";

import {
	type NavigationItem,
	type RenderLink,
	containsActiveItem,
	filterNavigation,
} from "../navigation";
import type { SidebarProps } from "./sidebar.types";

/*
 * Sidebar oficial do grupo — estrutura visual do Supertrans (tokens
 * sidebar-*, tooltip em collapsed, auto-open do submenu ativo) + UX de
 * colapso/submenu do Aurora. Navegação por dados; link e visibilidade
 * injetados (renderLink / canAccessItem).
 *
 * Decisões (documentadas em app-shell.md):
 * - SidebarItem/Group/Submenu/CollapseButton são INTERNOS — a API pública é
 *   dirigida por dados; exportar peças soltas incentivaria montagens
 *   divergentes entre portais.
 * - Grupo estático = item sem href com meta.group === true (label de seção,
 *   filhos sempre visíveis). Submenu expansível = item com children sem
 *   meta.group.
 * - Em collapsed, submenus não expandem: clicar no pai reabre a sidebar
 *   (versão conservadora; refinamento fica para a Sprint 8).
 * - SEM botão de colapso embutido (decisão pós-Sprint 6, referência visual
 *   Supertrans): colapso é controlado pelo portal via collapsed/onCollapsedChange.
 */

const defaultRenderLink: RenderLink = ({ href, children, className, ...props }) => (
	<a href={href} className={className} {...props}>
		{children}
	</a>
);

function useControllableCollapsed(
	collapsed: boolean | undefined,
	defaultCollapsed: boolean,
	onCollapsedChange?: (c: boolean) => void,
) {
	const [internal, setInternal] = React.useState(defaultCollapsed);
	const value = collapsed ?? internal;
	const set = React.useCallback(
		(next: boolean) => {
			if (collapsed === undefined) setInternal(next);
			onCollapsedChange?.(next);
		},
		[collapsed, onCollapsedChange],
	);
	return [value, set] as const;
}

const itemBaseClass =
	"group/nav relative flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sidebar-ring";
const itemIdleClass =
	"text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground";
const itemActiveClass =
	"bg-sidebar-primary text-sidebar-primary-foreground font-medium border border-sidebar-border shadow-sm";

function ItemContent({
	item,
	collapsed,
	trailing,
}: {
	item: NavigationItem;
	collapsed: boolean;
	trailing?: React.ReactNode;
}) {
	const Icon = item.icon;
	return (
		<>
			{Icon && <Icon className="size-4 shrink-0" />}
			{!collapsed && <span className="min-w-0 flex-1 truncate text-left">{item.label}</span>}
			{!collapsed && item.badge != null && <span className="shrink-0">{item.badge}</span>}
			{!collapsed && trailing}
			{collapsed && <span className="sr-only">{item.label}</span>}
		</>
	);
}

function MaybeTooltip({
	collapsed,
	label,
	children,
}: {
	collapsed: boolean;
	label: string;
	children: React.ReactElement;
}) {
	if (!collapsed) return children;
	return (
		<Tooltip>
			<TooltipTrigger render={children} />
			<TooltipContent side="right">{label}</TooltipContent>
		</Tooltip>
	);
}

function SidebarEntry({
	item,
	depth,
	collapsed,
	activeItemId,
	renderLink,
	onExpandSidebar,
	onNavigate,
}: {
	item: NavigationItem;
	depth: number;
	collapsed: boolean;
	activeItemId?: string;
	renderLink: RenderLink;
	onExpandSidebar: () => void;
	onNavigate?: () => void;
}) {
	const isGroup = !item.href && item.meta?.group === true && !!item.children?.length;
	const isSubmenu = !isGroup && !!item.children?.length;
	const hasActiveChild = containsActiveItem(item, activeItemId) && item.id !== activeItemId;
	const [open, setOpen] = React.useState(hasActiveChild);
	React.useEffect(() => {
		// auto-open (aditivo) quando um filho vira ativo — nunca fecha sozinho
		if (hasActiveChild) setOpen(true);
	}, [hasActiveChild]);

	const active = item.id === activeItemId;

	if (isGroup) {
		if (collapsed) {
			// em collapsed, grupos viram apenas separador visual + filhos
			return (
				<div className="space-y-1 border-t border-sidebar-border pt-1 first:border-t-0 first:pt-0">
					{item.children?.map((child) => (
						<SidebarEntry
							key={child.id}
							item={child}
							depth={depth}
							collapsed={collapsed}
							activeItemId={activeItemId}
							renderLink={renderLink}
							onExpandSidebar={onExpandSidebar}
							onNavigate={onNavigate}
						/>
					))}
				</div>
			);
		}
		return (
			<div className="space-y-1">
				<p className="px-2.5 pb-1 pt-3 text-[0.65rem] font-semibold uppercase tracking-wider text-sidebar-foreground/50 first:pt-0">
					{item.label}
				</p>
				{item.children?.map((child) => (
					<SidebarEntry
						key={child.id}
						item={child}
						depth={depth}
						collapsed={collapsed}
						activeItemId={activeItemId}
						renderLink={renderLink}
						onExpandSidebar={onExpandSidebar}
						onNavigate={onNavigate}
					/>
				))}
			</div>
		);
	}

	if (isSubmenu) {
		return (
			<div>
				<MaybeTooltip collapsed={collapsed} label={item.label}>
					<button
						type="button"
						disabled={item.disabled}
						aria-expanded={collapsed ? undefined : open}
						onClick={() => {
							if (collapsed) {
								onExpandSidebar();
								setOpen(true);
								return;
							}
							setOpen((o) => !o);
						}}
						className={cn(
							itemBaseClass,
							hasActiveChild && !open ? itemActiveClass : itemIdleClass,
							item.disabled && "pointer-events-none opacity-50",
							collapsed && "justify-center px-0",
						)}
					>
						<ItemContent
							item={item}
							collapsed={collapsed}
							trailing={
								<ChevronDown
									aria-hidden="true"
									className={cn("size-4 shrink-0 transition-transform", open && "rotate-180")}
								/>
							}
						/>
					</button>
				</MaybeTooltip>
				{!collapsed && open && (
					<div className="mt-1 ml-4 space-y-1 border-l border-sidebar-border pl-3">
						{item.children?.map((child) => (
							<SidebarEntry
								key={child.id}
								item={child}
								depth={depth + 1}
								collapsed={collapsed}
								activeItemId={activeItemId}
								renderLink={renderLink}
								onExpandSidebar={onExpandSidebar}
								onNavigate={onNavigate}
							/>
						))}
					</div>
				)}
			</div>
		);
	}

	const className = cn(
		itemBaseClass,
		active ? itemActiveClass : itemIdleClass,
		item.disabled && "pointer-events-none opacity-50",
		collapsed && "justify-center px-0",
	);

	if (!item.href || item.disabled) {
		return (
			<MaybeTooltip collapsed={collapsed} label={item.label}>
				<button
					type="button"
					disabled={item.disabled}
					aria-disabled={item.disabled}
					className={className}
				>
					<ItemContent item={item} collapsed={collapsed} />
				</button>
			</MaybeTooltip>
		);
	}

	return (
		<MaybeTooltip collapsed={collapsed} label={item.label}>
			<span
				className="block"
				onClickCapture={() => {
					onNavigate?.();
				}}
			>
				{renderLink({
					href: item.href,
					className,
					"aria-current": active ? "page" : undefined,
					children: <ItemContent item={item} collapsed={collapsed} />,
				})}
			</span>
		</MaybeTooltip>
	);
}

export function Sidebar({
	brand,
	navigation,
	activeItemId,
	collapsed: collapsedProp,
	defaultCollapsed = false,
	onCollapsedChange,
	canAccessItem,
	renderLink = defaultRenderLink,
	onNavigate,
	footer,
	className,
}: SidebarProps) {
	const [collapsed, setCollapsed] = useControllableCollapsed(
		collapsedProp,
		defaultCollapsed,
		onCollapsedChange,
	);
	const items = React.useMemo(
		() => filterNavigation(navigation, canAccessItem),
		[navigation, canAccessItem],
	);

	return (
		<TooltipProvider>
			<aside
				data-collapsed={collapsed || undefined}
				className={cn(
					"flex h-full shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200",
					collapsed ? "w-16" : "w-64",
					className,
				)}
			>
				{brand && (
					<div
						className={cn(
							"flex h-16 items-center justify-center border-b border-sidebar-border px-4",
							collapsed && "justify-center px-0",
						)}
					>
						{brand}
					</div>
				)}
				<nav aria-label="Navegação principal" className="flex-1 space-y-1 overflow-y-auto p-2">
					{items.map((item) => (
						<SidebarEntry
							key={item.id}
							item={item}
							depth={0}
							collapsed={collapsed}
							activeItemId={activeItemId}
							renderLink={renderLink}
							onExpandSidebar={() => setCollapsed(false)}
							onNavigate={onNavigate}
						/>
					))}
				</nav>
				{footer && (
					<div
						className={cn("border-t border-sidebar-border p-2", collapsed && "flex justify-center")}
					>
						{footer}
					</div>
				)}
			</aside>
		</TooltipProvider>
	);
}
