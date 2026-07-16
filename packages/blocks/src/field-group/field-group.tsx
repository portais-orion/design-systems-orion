import type * as React from "react";

import { cn } from "@portais-orion/ui";

/*
 * Grid responsivo de campos (1 coluna no mobile). Origem do padrão:
 * grid-cols-2/3 gap-4 dos forms dos dois portais.
 */
export type FieldGroupProps = {
	columns?: 1 | 2 | 3 | 4;
	children: React.ReactNode;
	className?: string;
};

const colsClass: Record<1 | 2 | 3 | 4, string> = {
	1: "",
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-2 lg:grid-cols-3",
	4: "sm:grid-cols-2 lg:grid-cols-4",
};

/**
 * Distribui campos de formulário em colunas, sempre empilhando em uma única
 * coluna no mobile. `columns` é o teto em telas largas, não um número fixo.
 */
export function FieldGroup({ columns = 2, children, className }: FieldGroupProps) {
	return (
		<div className={cn("grid grid-cols-1 items-start gap-4", colsClass[columns], className)}>
			{children}
		</div>
	);
}
