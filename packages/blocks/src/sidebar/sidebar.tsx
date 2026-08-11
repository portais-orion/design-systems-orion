"use client";

import { ChevronDown, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import * as React from "react";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
	cn,
} from "@design-systems-orion/ui";

import { useControllable } from "../_internal/use-controllable";
import {
	type NavigationItem,
	type RenderLink,
	containsActiveItem,
	filterNavigation,
} from "../navigation";
import type { SidebarModule, SidebarProps } from "./sidebar.types";

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
 *   meta.group — equivale ao type: "GROUP" do menu do Supertrans.
 * - activeModule é dado, não slot: o núcleo não sabe o que é um módulo (quem
 *   descobre é o portal, pela rota), mas a faixa é estrutura fixa do chrome e
 *   um ReactNode solto convidaria cada portal a desenhar a sua.
 * - Em collapsed, submenus não expandem: clicar no pai reabre a sidebar
 *   (versão conservadora; refinamento fica para a Sprint 8).
 * - Botão de colapso embutido (collapsible, padrão true). A decisão pós-Sprint 6
 *   o removera citando a referência visual do Supertrans, que na verdade o tem;
 *   reintroduzido para fechar com o portal real. Continua compondo com o modo
 *   controlado: o clique passa por onCollapsedChange como qualquer outro gesto.
 */

const defaultRenderLink: RenderLink = ({ href, children, className, ...props }) => (
	<a href={href} className={className} {...props}>
		{children}
	</a>
);

/*
 * Item ativo = barra de 3px na borda esquerda + fundo sutil, não fill sólido
 * (referência: admin/sidebar.tsx do Supertrans). O padding-left cai 3px junto
 * com a barra, senão o rótulo dança ao ficar ativo. A cor sai de brand-accent,
 * então cada marca pinta a sua (teal no Supertrans, laranja no Aurora).
 */
const itemBaseClass =
	"group/nav relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sidebar-ring";
const itemIdleClass =
	"text-sidebar-foreground/60 hover:bg-sidebar-foreground/5 hover:text-sidebar-foreground";
const itemActiveClass =
	"border-l-[3px] border-brand-accent bg-sidebar-foreground/10 pl-[9px] font-medium text-sidebar-foreground";
/*
 * Filho de submenu: recuado e menor. Ativo, o recuo desconta a barra (32px - 3px)
 * para o rótulo não sair do lugar. Divergência deliberada do admin/sidebar.tsx do
 * Supertrans, onde o pl-[9px] do estado ativo sobrescreve o pl-8 e o filho perde o
 * recuo justamente ao ficar ativo — não replicar.
 */
const childIdleClass = "pl-8 text-xs";
const childActiveClass = "pl-[29px] text-xs";

function ItemContent({
	item,
	collapsed,
	trailing,
	iconClassName,
}: {
	item: NavigationItem;
	collapsed: boolean;
	trailing?: React.ReactNode;
	iconClassName?: string;
}) {
	const Icon = item.icon;
	return (
		<>
			{Icon && <Icon className={cn("size-4 shrink-0", iconClassName)} />}
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

/*
 * Faixa do módulo ativo: link de troca + nome do módulo em destaque. Colapsada,
 * sobra só o ícone de troca com tooltip — o nome do módulo não cabe e já está
 * no item ativo da navegação.
 */
function ModuleHeader({
	module,
	collapsed,
	renderLink,
	onNavigate,
}: {
	module: SidebarModule;
	collapsed: boolean;
	renderLink: RenderLink;
	onNavigate?: () => void;
}) {
	const { name, icon: Icon, switchHref, switchLabel = "Trocar módulo" } = module;

	const switchLink =
		switchHref &&
		renderLink({
			href: switchHref,
			className: cn(
				"flex w-full items-center rounded-lg text-sidebar-foreground/60 outline-none transition-colors hover:bg-sidebar-foreground/5 hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring",
				collapsed ? "justify-center px-3 py-2" : "gap-2 px-3 py-1.5 text-xs",
			),
			children: (
				<>
					<LayoutGrid className={collapsed ? "size-4" : "size-3.5"} />
					{collapsed ? <span className="sr-only">{switchLabel}</span> : switchLabel}
				</>
			),
		});

	return (
		<div className="border-b border-sidebar-border px-2 py-2">
			{switchLink && (
				<span className="block" onClickCapture={() => onNavigate?.()}>
					{collapsed ? (
						<Tooltip>
							<TooltipTrigger render={<span className="block">{switchLink}</span>} />
							<TooltipContent side="right">{switchLabel}</TooltipContent>
						</Tooltip>
					) : (
						switchLink
					)}
				</span>
			)}
			{!collapsed && (
				<div className={cn("flex items-center gap-2 px-3 py-1", switchHref && "mt-1")}>
					{Icon && <Icon className="size-4 shrink-0 text-brand-accent" />}
					<span className="truncate text-sm font-semibold text-sidebar-foreground">{name}</span>
				</div>
			)}
		</div>
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
							"font-semibold",
							// Só destaca o cabeçalho fechado: aberto, quem se destaca é o filho ativo.
							hasActiveChild && !open
								? itemActiveClass
								: hasActiveChild
									? "text-sidebar-foreground"
									: itemIdleClass,
							item.disabled && "pointer-events-none opacity-50",
							collapsed && "justify-center px-0",
						)}
					>
						<ItemContent
							item={item}
							collapsed={collapsed}
							iconClassName="text-brand-accent"
							trailing={
								<ChevronDown
									aria-hidden="true"
									className={cn(
										"size-3 shrink-0 text-sidebar-foreground/40 transition-transform",
										open && "rotate-180",
									)}
								/>
							}
						/>
					</button>
				</MaybeTooltip>
				{!collapsed && open && (
					<div className="mt-1 space-y-0.5">
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

	const isChild = depth > 0;
	const className = cn(
		itemBaseClass,
		active ? itemActiveClass : itemIdleClass,
		isChild && !collapsed && (active ? childActiveClass : childIdleClass),
		item.disabled && "pointer-events-none opacity-50",
		collapsed && "justify-center px-0",
	);
	const iconClassName = active ? undefined : "text-sidebar-foreground/50";

	if (!item.href || item.disabled) {
		return (
			<MaybeTooltip collapsed={collapsed} label={item.label}>
				<button
					type="button"
					disabled={item.disabled}
					aria-disabled={item.disabled}
					className={className}
				>
					<ItemContent item={item} collapsed={collapsed} iconClassName={iconClassName} />
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
					children: <ItemContent item={item} collapsed={collapsed} iconClassName={iconClassName} />,
				})}
			</span>
		</MaybeTooltip>
	);
}

/**
 * Navegação lateral do portal, dirigida por dados: a árvore vem em `navigation`
 * e as peças internas (item, grupo, submenu) não são exportadas, para que os
 * portais não montem variações divergentes. Colapsada, os rótulos viram
 * tooltips. Não conhece rota nem permissão — injete `renderLink` e
 * `canAccessItem`. Normalmente usada via `AppShell`.
 */
export function Sidebar({
	brand,
	activeModule,
	navigation,
	activeItemId,
	collapsed: collapsedProp,
	defaultCollapsed = false,
	onCollapsedChange,
	collapsible = true,
	canAccessItem,
	renderLink = defaultRenderLink,
	onNavigate,
	footer,
	className,
}: SidebarProps) {
	const [collapsed, setCollapsed] = useControllable(
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
				/*
				 * group/sidebar + data-collapsed deixam o conteúdo dos slots (brand,
				 * footer) reagir ao colapso sem receber a flag por prop — o portal não
				 * controla o estado quando ele é interno.
				 */
				className={cn(
					"group/sidebar relative flex h-full shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200",
					collapsed ? "w-16" : "w-64",
					className,
				)}
			>
				{collapsible && (
					<button
						type="button"
						onClick={() => setCollapsed(!collapsed)}
						aria-label={collapsed ? "Expandir navegação" : "Recolher navegação"}
						aria-expanded={!collapsed}
						className="absolute -right-3 top-5 z-10 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md outline-none transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-sidebar-ring"
					>
						{collapsed ? <ChevronRight className="size-3" /> : <ChevronLeft className="size-3" />}
					</button>
				)}
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
				{activeModule && (
					<ModuleHeader
						module={activeModule}
						collapsed={collapsed}
						renderLink={renderLink}
						onNavigate={onNavigate}
					/>
				)}
				<nav aria-label="Navegação principal" className="flex-1 space-y-2 overflow-y-auto p-2">
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
