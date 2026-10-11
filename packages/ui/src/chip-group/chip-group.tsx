"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "../utils/cn";

/*
 * Extraído dos filtros em chip da Central de Atendimento do portal-supertrans
 * (visões da caixa, abas de canal, seletores de destino): botões compactos de
 * escolha única, com ponto de cor e contador opcionais. Recriado sobre o
 * ToggleGroup do Base UI, que cuida de foco por setas e aria-pressed.
 */
const chipVariants = cva(
	"inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-[11px] font-medium text-muted-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40",
	{
		variants: {
			tone: {
				neutral:
					"data-[pressed]:border-foreground/30 data-[pressed]:bg-muted data-[pressed]:text-foreground",
				brand:
					"data-[pressed]:border-primary data-[pressed]:bg-primary/10 data-[pressed]:text-primary",
				info: "data-[pressed]:border-info data-[pressed]:bg-info-subtle data-[pressed]:text-info-subtle-foreground",
				success:
					"data-[pressed]:border-success data-[pressed]:bg-success-subtle data-[pressed]:text-success-subtle-foreground",
				warning:
					"data-[pressed]:border-warning data-[pressed]:bg-warning-subtle data-[pressed]:text-warning-subtle-foreground",
				danger:
					"data-[pressed]:border-destructive data-[pressed]:bg-destructive-subtle data-[pressed]:text-destructive-subtle-foreground",
			},
			size: {
				sm: "px-2 py-1 text-[11px]",
				md: "px-3 py-1.5 text-xs",
			},
		},
		defaultVariants: {
			tone: "brand",
			size: "sm",
		},
	},
);

const dotVariants = cva("size-1.5 flex-none rounded-full", {
	variants: {
		tone: {
			neutral: "bg-muted-foreground/50",
			brand: "bg-primary",
			info: "bg-info",
			success: "bg-success",
			warning: "bg-warning",
			danger: "bg-destructive",
		},
	},
	defaultVariants: { tone: "brand" },
});

export interface ChipGroupProps<Value extends string = string>
	extends Omit<
		React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive>,
		"value" | "defaultValue" | "onValueChange" | "multiple"
	> {
	/** Valor do chip selecionado. */
	value: Value;
	/** Disparado ao escolher outro chip. Clicar no chip já selecionado não dispara. */
	onValueChange: (value: Value) => void;
}

/**
 * Grupo de chips de escolha única: filtros rápidos, abas de canal, seletores
 * de destino. Sempre há um chip selecionado — clicar no atual não o desmarca.
 * Componha com `ChipGroupItem`. Para alternar painéis de conteúdo use `Tabs`.
 */
function ChipGroup<Value extends string = string>({
	value,
	onValueChange,
	className,
	...props
}: ChipGroupProps<Value>) {
	return (
		<ToggleGroupPrimitive
			value={[value]}
			onValueChange={(next) => {
				const picked = next.find((item) => item !== value);
				if (picked !== undefined) onValueChange(picked as Value);
			}}
			className={cn("flex flex-wrap gap-1", className)}
			{...props}
		/>
	);
}

export interface ChipGroupItemProps
	extends Omit<React.ComponentPropsWithoutRef<typeof TogglePrimitive>, "value" | "pressed">,
		VariantProps<typeof chipVariants> {
	value: string;
	/** Mostra um ponto na cor do `tone` antes do rótulo. */
	dot?: boolean;
	/** Contador à direita do rótulo; ocultado quando `0`, `null` ou ausente. */
	count?: number | null;
}

/** Um chip do `ChipGroup`. `tone` define a cor quando selecionado. */
const ChipGroupItem = React.forwardRef<HTMLButtonElement, ChipGroupItemProps>(
	({ className, tone, size, dot, count, children, ...props }, ref) => (
		<TogglePrimitive ref={ref} className={cn(chipVariants({ tone, size }), className)} {...props}>
			{dot && <span aria-hidden="true" className={dotVariants({ tone })} />}
			{children}
			{count ? <span className="ml-1 tabular-nums">{count}</span> : null}
		</TogglePrimitive>
	),
);
ChipGroupItem.displayName = "ChipGroupItem";

export { ChipGroup, ChipGroupItem, chipVariants };
