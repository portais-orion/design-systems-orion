import type * as React from "react";

import { cn } from "@portais-orion/ui";

/*
 * Barra de ações de formulário (salvar/cancelar/extra). Origem do padrão:
 * footers repetidos com justify-end nos forms dos dois portais.
 * Slots apenas — nunca cria botões nem textos.
 */
export type FormActionsProps = {
	primary?: React.ReactNode;
	secondary?: React.ReactNode;
	extra?: React.ReactNode;
	align?: "left" | "right" | "between";
	sticky?: boolean;
	className?: string;
};

const alignClass = {
	left: "justify-start",
	right: "justify-end",
	between: "justify-between",
} as const;

/**
 * Barra de ações no rodapé de um formulário. É só composição de slots: não cria
 * botões nem textos — passe os seus em `primary`, `secondary` e `extra`. Com
 * `sticky`, a barra gruda no rodapé em formulários longos.
 */
export function FormActions({
	primary,
	secondary,
	extra,
	align = "right",
	sticky = false,
	className,
}: FormActionsProps) {
	return (
		<div
			className={cn(
				"flex flex-wrap items-center gap-2 border-t border-border pt-4",
				alignClass[align],
				sticky && "sticky bottom-0 z-10 -mx-1 bg-background/95 px-1 pb-4 backdrop-blur-sm",
				className,
			)}
		>
			{align === "between" ? (
				<>
					<div className="flex items-center gap-2">{extra}</div>
					<div className="flex items-center gap-2">
						{secondary}
						{primary}
					</div>
				</>
			) : (
				<>
					{extra}
					{secondary}
					{primary}
				</>
			)}
		</div>
	);
}
