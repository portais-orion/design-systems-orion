"use client";

import { cn } from "@design-systems-orion/ui";

/*
 * Origem: portal-supertrans shared/table-primitives.tsx (TableToggle) —
 * reimplementado sem estilo inline e sem cor hardcoded (#00526b/#b3b3b3):
 * a cor ativa vem do token `primary`, a inativa de `input`. O `Switch` do
 * @design-systems-orion/ui é dimensionado para formulário (h-5 w-9); este é menor
 * (36×20) e sem label, pensado para caber numa célula de tabela.
 */
export type TableToggleProps = {
	checked: boolean;
	onToggle: () => void;
	disabled?: boolean;
	"aria-label"?: string;
	className?: string;
};

/**
 * Switch compacto (36×20) para alternar um valor booleano diretamente numa
 * célula de tabela, sem label ao lado. Para alternância em formulário, use o
 * `Switch` padrão do `@design-systems-orion/ui`.
 */
export function TableToggle({
	checked,
	onToggle,
	disabled = false,
	className,
	...props
}: TableToggleProps) {
	return (
		<button
			type="button"
			role="switch"
			aria-checked={checked}
			aria-label={props["aria-label"]}
			disabled={disabled}
			onClick={onToggle}
			className={cn(
				"relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
				checked ? "bg-primary" : "bg-input",
				className,
			)}
		>
			<span
				className={cn(
					"pointer-events-none block size-4 translate-x-0.5 rounded-full bg-background shadow transition-transform",
					checked && "translate-x-[18px]",
				)}
			/>
		</button>
	);
}
