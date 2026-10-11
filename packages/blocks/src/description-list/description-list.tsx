import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

/*
 * Extraído dos painéis de contato e de atendimento da Central de Atendimento
 * do portal-supertrans: pares rótulo/valor compactos.
 */
export type DescriptionListItem = {
	id?: string;
	label: React.ReactNode;
	value: React.ReactNode;
	/** Item omitido quando `true` — evita ternários no consumidor. */
	hidden?: boolean;
};

export type DescriptionListProps = {
	items: DescriptionListItem[];
	/**
	 * `inline`: rótulo à esquerda, valor à direita. `stacked`: rótulo acima do
	 * valor, para valores longos. Padrão: `inline`.
	 */
	layout?: "inline" | "stacked";
	className?: string;
};

/**
 * Lista de pares rótulo/valor em texto pequeno, para painéis laterais e
 * resumos. Renderiza uma `<dl>` semântica. Para campos editáveis use
 * `ViewEditField`; para formulários, `FormField`.
 */
export function DescriptionList({ items, layout = "inline", className }: DescriptionListProps) {
	const visible = items.filter((item) => !item.hidden);
	return (
		<dl className={cn("space-y-2 text-xs", className)}>
			{visible.map((item, index) => (
				<div
					key={item.id ?? (typeof item.label === "string" ? item.label : index)}
					className={cn(layout === "inline" && "flex justify-between gap-2")}
				>
					<dt className="text-muted-foreground">{item.label}</dt>
					<dd className={cn("font-medium text-foreground", layout === "inline" && "truncate")}>
						{item.value}
					</dd>
				</div>
			))}
		</dl>
	);
}
