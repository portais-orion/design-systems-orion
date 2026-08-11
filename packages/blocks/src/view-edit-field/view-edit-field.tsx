import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

/*
 * Extraído de gestao-demandas/[id]: campo de detalhe que alterna entre
 * texto (view) e um controle de edição (Select/Input), controlado por um
 * único toggle "modo edição" na tela inteira — sem modal por campo.
 */
export type ViewEditFieldProps = {
	label: string;
	editing: boolean;
	/** Conteúdo exibido em modo leitura. */
	viewValue: React.ReactNode;
	/** Controle de edição (Input, Select, etc.) fornecido pelo consumidor. */
	children: React.ReactNode;
	className?: string;
};

/**
 * Campo de detalhe com alternância view/edit inline: mostra `viewValue`
 * normalmente e troca para `children` quando `editing` é true. Não gerencia
 * o estado de edição nem o valor — só decide o que renderizar.
 */
export function ViewEditField({
	label,
	editing,
	viewValue,
	children,
	className,
}: ViewEditFieldProps) {
	return (
		<div className={cn("space-y-1", className)}>
			<p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
				{label}
			</p>
			{editing ? children : <p className="font-semibold text-foreground">{viewValue}</p>}
		</div>
	);
}
