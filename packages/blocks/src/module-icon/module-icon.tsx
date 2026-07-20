import {
	Activity,
	BarChart2,
	Bell,
	Briefcase,
	Calendar,
	CreditCard,
	Database,
	FileText,
	Grid3X3,
	Layers,
	MessageSquare,
	Package,
	Settings,
	Shield,
	ShoppingCart,
	Truck,
	Users,
	Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@portais-orion/ui";

/*
 * Origem: portal-supertrans configurador/modules/components/module-icon.tsx.
 * Mapeia uma chave string (persistida em banco) para um ícone lucide, com
 * fallback. Infra necessária em qualquer portal do grupo com módulos
 * configuráveis pelo usuário via um <select> de ícones.
 *
 * As 18 chaves abaixo já são valores persistidos em produção — não renomear.
 */
export const ICON_OPTIONS: { name: string; Icon: LucideIcon }[] = [
	{ name: "package", Icon: Package },
	{ name: "truck", Icon: Truck },
	{ name: "file-text", Icon: FileText },
	{ name: "users", Icon: Users },
	{ name: "bar-chart", Icon: BarChart2 },
	{ name: "settings", Icon: Settings },
	{ name: "shopping-cart", Icon: ShoppingCart },
	{ name: "credit-card", Icon: CreditCard },
	{ name: "briefcase", Icon: Briefcase },
	{ name: "calendar", Icon: Calendar },
	{ name: "message-square", Icon: MessageSquare },
	{ name: "bell", Icon: Bell },
	{ name: "shield", Icon: Shield },
	{ name: "grid-3x3", Icon: Grid3X3 },
	{ name: "layers", Icon: Layers },
	{ name: "wrench", Icon: Wrench },
	{ name: "database", Icon: Database },
	{ name: "activity", Icon: Activity },
];

export const ICON_MAP: Record<string, LucideIcon> = Object.fromEntries(
	ICON_OPTIONS.map(({ name, Icon }) => [name, Icon]),
);

/** Resolve uma chave do catálogo para o componente de ícone, com fallback para `Package`. */
export function resolveModuleIcon(icon?: string): LucideIcon {
	return (icon ? ICON_MAP[icon] : undefined) ?? Package;
}

export type ModuleIconProps = {
	/** Chave do catálogo (`ICON_MAP`); cai em `package` se ausente ou desconhecida. */
	icon?: string;
	size?: "sm" | "md";
	className?: string;
};

/**
 * Caixa tonalizada com o ícone de um módulo, resolvido a partir de uma chave
 * string persistida (ex.: vinda do banco). Use `ICON_OPTIONS` para montar um
 * seletor de ícones no formulário de cadastro do módulo.
 */
export function ModuleIcon({ icon, size = "md", className }: ModuleIconProps) {
	const Icon = resolveModuleIcon(icon);
	return (
		<div
			className={cn(
				"flex shrink-0 items-center justify-center rounded-lg bg-primary/10",
				size === "md" ? "size-10" : "size-8",
				className,
			)}
		>
			<Icon className={cn("text-primary", size === "md" ? "size-5" : "size-4")} />
		</div>
	);
}
